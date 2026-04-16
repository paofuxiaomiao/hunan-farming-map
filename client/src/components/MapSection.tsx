/*
 * MapSection - 极简白色地图区域
 * 大留白 + 精致筛选器 + Leaflet/OpenStreetMap（无需API key）
 */

import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CATEGORY_CONFIG, type FarmingSite, type SiteCategory } from "@/lib/data";

const HUNAN_CENTER: [number, number] = [27.6, 111.7];
const HUNAN_ZOOM = 7.5;

/* Helper: fly map to position */
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  const prevRef = useRef({ center, zoom });
  useEffect(() => {
    if (
      prevRef.current.center[0] !== center[0] ||
      prevRef.current.center[1] !== center[1] ||
      prevRef.current.zoom !== zoom
    ) {
      map.flyTo(center, zoom, { duration: 1.2 });
      prevRef.current = { center, zoom };
    }
  }, [map, center, zoom]);
  return null;
}

interface MapSectionProps {
  sites: FarmingSite[];
  activeCategory: SiteCategory | "all";
  onSiteSelect: (site: FarmingSite) => void;
  onCategoryChange: (cat: SiteCategory | "all") => void;
  selectedSite: FarmingSite | null;
}

export default function MapSection({
  sites,
  activeCategory,
  onSiteSelect,
  onCategoryChange,
  selectedSite,
}: MapSectionProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>(HUNAN_CENTER);
  const [mapZoom, setMapZoom] = useState(HUNAN_ZOOM);

  const handleCategoryClick = (cat: SiteCategory | "all") => {
    onCategoryChange(cat);
    setMapCenter(HUNAN_CENTER);
    setMapZoom(HUNAN_ZOOM);
  };

  const handleMarkerClick = useCallback(
    (site: FarmingSite) => {
      onSiteSelect(site);
      setMapCenter([site.lat, site.lng]);
      setMapZoom(10);
    },
    [onSiteSelect]
  );

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
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const config = cat === "all" ? null : CATEGORY_CONFIG[cat];
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`
                  px-4 py-1.5 text-xs font-body tracking-wider rounded-full transition-all duration-300
                  ${
                    isActive
                      ? "text-white shadow-md"
                      : "text-[#2D2A26]/40 bg-[#2D2A26]/[0.03] hover:bg-[#2D2A26]/[0.06] hover:text-[#2D2A26]/60"
                  }
                `}
                style={
                  isActive
                    ? { backgroundColor: config ? config.color : "#2D2A26" }
                    : {}
                }
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
          <MapContainer
            center={HUNAN_CENTER}
            zoom={HUNAN_ZOOM}
            scrollWheelZoom={true}
            zoomControl={true}
            className="w-full h-full"
            style={{ background: "#f8f6f0" }}
          >
            <MapController center={mapCenter} zoom={mapZoom} />

            {/* 高德地图中文底图 */}
            <TileLayer
              attribution='&copy; <a href="https://amap.com/">高德地图</a>'
              url="https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
              subdomains={['1','2','3','4']}
            />

            {/* Markers */}
            {sites.map((site) => {
              const config = CATEGORY_CONFIG[site.category];
              const isSelected = selectedSite?.id === site.id;
              return (
                <CircleMarker
                  key={site.id}
                  center={[site.lat, site.lng]}
                  radius={isSelected ? 10 : 6}
                  pathOptions={{
                    color: "white",
                    weight: 2,
                    fillColor: config.color,
                    fillOpacity: isSelected ? 1 : 0.8,
                  }}
                  eventHandlers={{
                    click: () => handleMarkerClick(site),
                  }}
                >
                  <Popup>
                    <div className="text-center p-1">
                      <div className="font-bold text-sm mb-1">{site.name}</div>
                      <div className="text-xs text-gray-500">{site.city}</div>
                      <div
                        className="text-[10px] mt-1 px-2 py-0.5 rounded-full text-white inline-block"
                        style={{ backgroundColor: config.color }}
                      >
                        {config.label}
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-3 shadow-lg z-[1000]">
            <div className="text-[9px] text-[#2D2A26]/40 font-body tracking-wider mb-2 uppercase">
              图例
            </div>
            <div className="space-y-1.5">
              {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
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
