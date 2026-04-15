/*
 * MapSection - 极简白色地图区域
 * 大留白 + 精致筛选器 + Google Maps
 */

import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapView } from "@/components/Map";
import { CATEGORY_CONFIG, type FarmingSite, type SiteCategory } from "@/lib/data";

const HUNAN_CENTER = { lat: 27.6, lng: 111.7 };
const HUNAN_ZOOM = 7.5;

function createMarkerContent(site: FarmingSite, isSelected: boolean): HTMLElement {
  const config = CATEGORY_CONFIG[site.category];
  const el = document.createElement("div");
  el.style.cssText = `
    width: ${isSelected ? "18px" : "10px"};
    height: ${isSelected ? "18px" : "10px"};
    border-radius: 50%;
    background: ${config.color};
    border: 2px solid white;
    box-shadow: 0 0 ${isSelected ? "16px" : "6px"} ${config.color}40, 0 1px 4px rgba(0,0,0,0.08);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
  `;
  if (isSelected) {
    const ring = document.createElement("div");
    ring.style.cssText = `
      position: absolute; inset: -6px; border-radius: 50%;
      border: 1px solid ${config.color}40;
      animation: pulse 1.5s cubic-bezier(0,0,0.2,1) infinite;
    `;
    el.appendChild(ring);
  }
  el.addEventListener("mouseenter", () => {
    if (!isSelected) {
      el.style.width = "14px";
      el.style.height = "14px";
      el.style.boxShadow = `0 0 16px ${config.color}50, 0 2px 8px rgba(0,0,0,0.12)`;
    }
  });
  el.addEventListener("mouseleave", () => {
    if (!isSelected) {
      el.style.width = "10px";
      el.style.height = "10px";
      el.style.boxShadow = `0 0 6px ${config.color}40, 0 1px 4px rgba(0,0,0,0.08)`;
    }
  });
  return el;
}

interface MapSectionProps {
  sites: FarmingSite[];
  activeCategory: SiteCategory | "all";
  onSiteSelect: (site: FarmingSite) => void;
  onCategoryChange: (cat: SiteCategory | "all") => void;
  selectedSite: FarmingSite | null;
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
        content: createMarkerContent(site, selectedSite?.id === site.id),
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
    // 柔和淡雅的地图样式
    map.setOptions({
      center: HUNAN_CENTER,
      zoom: HUNAN_ZOOM,
      mapTypeControl: true,
      mapTypeControlOptions: { position: google.maps.ControlPosition.TOP_LEFT },
      fullscreenControl: true,
      streetViewControl: true,
      zoomControl: true,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#f8f6f0" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#8a8578" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
        { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#e8e4da" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#f0ece4" }] },
        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#e8e4da" }] },
        { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeebe4" }] },
        { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#f5f2ec" }] },
        { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#ddd8ce" }] },
      ],
    });
    addMarkers(map, sites);
  }, [addMarkers, sites]);

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
    <section className="py-24 bg-white relative" id="map-section">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-[#2D2A26]/90 mb-3">
            湖湘农耕文明全景
          </h2>
          <p className="font-body text-sm text-[#2D2A26]/30 max-w-lg mx-auto">
            点击地图上的标记探索 109 处农耕文化地标
          </p>
        </motion.div>

        {/* Filter pills */}
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            const config = cat === "all" ? null : CATEGORY_CONFIG[cat];
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`
                  px-4 py-1.5 text-xs font-body tracking-wider rounded-full transition-all duration-300
                  ${isActive
                    ? "text-white shadow-md"
                    : "text-[#2D2A26]/40 bg-[#2D2A26]/[0.03] hover:bg-[#2D2A26]/[0.06] hover:text-[#2D2A26]/60"
                  }
                `}
                style={isActive ? { backgroundColor: config ? config.color : "#2D2A26" } : {}}
              >
                {config ? config.label : "全部点位"}
              </button>
            );
          })}
        </div>

        {/* Count */}
        <div className="text-center mb-8">
          <span className="text-[11px] text-[#2D2A26]/25 font-body tracking-wider">
            当前显示 {sites.length} 个点位
          </span>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-xl shadow-black/[0.06] border border-[#2D2A26]/[0.05]"
          style={{ height: "65vh", minHeight: "500px" }}
        >
          <MapView
            className="w-full h-full"
            initialCenter={HUNAN_CENTER}
            initialZoom={HUNAN_ZOOM}
            onMapReady={handleMapReady}
          />

          {/* Legend */}
          <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-3 shadow-lg z-10">
            <div className="text-[9px] text-[#2D2A26]/40 font-body tracking-wider mb-2 uppercase">图例</div>
            <div className="space-y-1.5">
              {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: config.color }} />
                  <span className="text-[10px] text-[#2D2A26]/50 font-body">
                    {config.label} · {config.count}处
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
