/*
 * MapSection - 核心交互地图
 * 使用Google Maps展示湖南省农耕文化点位
 * 三色图标标注，悬停高亮，点击弹出详情
 */

import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapView } from "@/components/Map";
import { CATEGORY_CONFIG, type FarmingSite, type SiteCategory } from "@/lib/data";
import { Filter, Layers } from "lucide-react";

interface MapSectionProps {
  sites: FarmingSite[];
  activeCategory: SiteCategory | "all";
  onSiteSelect: (site: FarmingSite) => void;
  onCategoryChange: (cat: SiteCategory | "all") => void;
  selectedSite: FarmingSite | null;
}

const HUNAN_CENTER = { lat: 27.6, lng: 111.7 };
const HUNAN_ZOOM = 7.5;

function createMarkerContent(category: SiteCategory, isSelected: boolean): HTMLElement {
  const config = CATEGORY_CONFIG[category];
  const el = document.createElement("div");
  el.style.cssText = `
    width: ${isSelected ? "42px" : "30px"};
    height: ${isSelected ? "42px" : "30px"};
    border-radius: 50% 50% 50% 0;
    background: ${config.color};
    border: 2px solid white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3)${isSelected ? ", 0 0 20px " + config.color + "60" : ""};
    transform: rotate(-45deg);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `;

  // Pulse ring for selected
  if (isSelected) {
    const ring = document.createElement("div");
    ring.style.cssText = `
      position: absolute;
      inset: -6px;
      border-radius: 50% 50% 50% 0;
      border: 2px solid ${config.color};
      opacity: 0.4;
      animation: pulse 2s ease-in-out infinite;
    `;
    el.appendChild(ring);
  }

  const inner = document.createElement("span");
  inner.style.cssText = `
    transform: rotate(45deg);
    font-size: ${isSelected ? "16px" : "12px"};
    line-height: 1;
    position: relative;
    z-index: 1;
  `;
  inner.textContent = config.icon;
  el.appendChild(inner);

  // Hover effect
  el.addEventListener("mouseenter", () => {
    el.style.transform = "rotate(-45deg) scale(1.2)";
    el.style.boxShadow = `0 4px 16px rgba(0,0,0,0.35), 0 0 20px ${config.color}40`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "rotate(-45deg) scale(1)";
    el.style.boxShadow = isSelected
      ? `0 2px 10px rgba(0,0,0,0.3), 0 0 20px ${config.color}60`
      : "0 2px 10px rgba(0,0,0,0.3)";
  });

  return el;
}

export default function MapSection({ sites, activeCategory, onSiteSelect, onCategoryChange, selectedSite }: MapSectionProps) {
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [mapReady, setMapReady] = useState(false);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(m => (m.map = null));
    markersRef.current = [];
  }, []);

  const addMarkers = useCallback((map: google.maps.Map, sitesToMark: FarmingSite[]) => {
    clearMarkers();
    sitesToMark.forEach(site => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: site.lat, lng: site.lng },
        title: site.name,
        content: createMarkerContent(site.category, selectedSite?.id === site.id),
      });
      marker.addListener("gmp-click", () => {
        onSiteSelect(site);
        map.panTo({ lat: site.lat, lng: site.lng });
        map.setZoom(10);
      });
      markersRef.current.push(marker);
    });
  }, [clearMarkers, onSiteSelect, selectedSite?.id]);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapInstanceRef.current = map;
    setMapReady(true);
    addMarkers(map, sites);
  }, [addMarkers, sites]);

  // Update markers when sites change
  useEffect(() => {
    if (mapReady && mapInstanceRef.current) {
      addMarkers(mapInstanceRef.current, sites);
    }
  }, [mapReady, sites, addMarkers]);

  const handleCategoryClick = (cat: SiteCategory | "all") => {
    onCategoryChange(cat);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo(HUNAN_CENTER);
      mapInstanceRef.current.setZoom(HUNAN_ZOOM);
    }
  };

  const categories = ["all", "ancient", "modern", "red"] as const;

  return (
    <section className="relative py-16 bg-[#F5F0E3]" id="map-section">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-[1px] w-12 bg-[#8B6914]" />
            <span className="text-xs tracking-[0.3em] text-[#8B6914] font-body uppercase">
              Interactive Map
            </span>
            <div className="h-[1px] w-12 bg-[#8B6914]" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[#2D2A26] mb-3">
            湖湘农耕文明全景
          </h2>
          <p className="font-body text-[#5C3D1E]/60 max-w-2xl mx-auto">
            点击地图上的标记探索109处农耕文化地标，感受万年文明的时空脉动
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            const config = cat === "all" ? null : CATEGORY_CONFIG[cat];
            return (
              <motion.button
                key={cat}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(cat)}
                className={`
                  px-5 py-2.5 text-sm font-body tracking-wider transition-all duration-300 border relative overflow-hidden
                  ${isActive
                    ? "border-[#8B6914] bg-[#8B6914] text-[#F5F0E3] shadow-md"
                    : "border-[#8B6914]/30 text-[#5C3D1E]/70 hover:border-[#8B6914] hover:text-[#8B6914] hover:shadow-sm"
                  }
                `}
                style={isActive && config ? { backgroundColor: config.color, borderColor: config.color } : {}}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0"
                    style={{ backgroundColor: config ? config.color : "#8B6914" }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {cat === "all" ? (
                    <>
                      <Layers className="w-3.5 h-3.5" />
                      全部点位
                    </>
                  ) : (
                    <>
                      <span>{config!.icon}</span>
                      {config!.label}
                    </>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Active filter info */}
        <motion.div
          key={sites.length}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-[#5C3D1E]/50 font-body flex items-center justify-center gap-2"
        >
          <Filter className="w-3 h-3" />
          当前显示 <span className="text-[#8B6914] font-heading text-base">{sites.length}</span> 个点位
        </motion.div>
      </div>

      {/* Map Container */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden shadow-2xl border-2 border-[#8B6914]/20"
        >
          {/* Map border decoration - tricolor gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B6914] via-[#1B7A4E] to-[#C0392B] z-10" />

          <MapView
            className="w-full h-[500px] md:h-[650px]"
            initialCenter={HUNAN_CENTER}
            initialZoom={HUNAN_ZOOM}
            onMapReady={handleMapReady}
          />

          {/* Legend overlay */}
          <div className="absolute bottom-4 left-4 bg-[#F5F0E3]/95 backdrop-blur-sm p-4 shadow-lg border border-[#8B6914]/20 z-10">
            <div className="text-xs font-heading text-[#5C3D1E] mb-2 tracking-wider flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-[#8B6914]" />
              图例
            </div>
            <div className="flex flex-col gap-2">
              {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="text-xs text-[#5C3D1E]/80 font-body">
                    {config.label}
                  </span>
                  <span className="text-[10px] text-[#5C3D1E]/40 font-body ml-auto">
                    {config.count}处
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom border decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C0392B] via-[#1B7A4E] to-[#8B6914] z-10" />
        </motion.div>
      </div>
    </section>
  );
}
