/*
 * MapSection - 极简白色地图区域
 * 使用Leaflet DivIcon实现大点击区域标记 + 内嵌详情面板
 */

import { useRef, useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CATEGORY_CONFIG, type FarmingSite, type SiteCategory } from "@/lib/data";
import { X, MapPin, Calendar, Star, ChevronRight } from "lucide-react";

const HUNAN_CENTER: [number, number] = [27.6, 111.7];
const HUNAN_ZOOM = 7.5;

/* Create colored dot icon */
function createDotIcon(color: string, isSelected: boolean) {
  const size = isSelected ? 28 : 18;
  const innerSize = isSelected ? 14 : 10;
  const pulseRing = isSelected
    ? `<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:${size + 12}px;height:${size + 12}px;border-radius:50%;border:2px solid ${color};opacity:0.3;animation:pulse-ring 1.5s ease-out infinite;"></div>`
    : "";
  return L.divIcon({
    className: "",
    iconSize: [size + 14, size + 14],
    iconAnchor: [(size + 14) / 2, (size + 14) / 2],
    html: `
      <div style="width:${size + 14}px;height:${size + 14}px;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;">
        ${pulseRing}
        <div style="
          width:${size}px;height:${size}px;border-radius:50%;
          background:${color};
          border:${isSelected ? "3px" : "2.5px"} solid white;
          box-shadow:0 2px 8px rgba(0,0,0,0.25);
          display:flex;align-items:center;justify-content:center;
          transition:all 0.2s ease;
        ">
          <div style="width:${innerSize * 0.4}px;height:${innerSize * 0.4}px;border-radius:50%;background:white;opacity:${isSelected ? "0.9" : "0.6"};"></div>
        </div>
      </div>
    `,
  });
}

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

/* Inject pulse animation CSS */
function PulseStyle() {
  useEffect(() => {
    const styleId = "leaflet-pulse-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes pulse-ring {
          0% { transform: translate(-50%,-50%) scale(0.8); opacity: 0.4; }
          100% { transform: translate(-50%,-50%) scale(1.4); opacity: 0; }
        }
        .leaflet-marker-icon:hover > div > div:last-child {
          transform: scale(1.2);
          box-shadow: 0 3px 12px rgba(0,0,0,0.35) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  return null;
}

/* Inline detail panel inside map */
function InlineDetail({
  site,
  onClose,
}: {
  site: FarmingSite;
  onClose: () => void;
}) {
  const config = CATEGORY_CONFIG[site.category];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ type: "spring", damping: 28, stiffness: 320 }}
      className="absolute top-3 left-3 bottom-3 w-[340px] max-w-[45%] bg-white/95 backdrop-blur-md rounded-xl shadow-2xl shadow-black/10 z-[1000] overflow-hidden flex flex-col"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2.5 right-2.5 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-[#2D2A26]/50 hover:text-[#2D2A26]/80 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Compact hero image */}
        <div className="relative h-36 overflow-hidden shrink-0">
          <img
            src={site.image}
            alt={site.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
          <div
            className="absolute bottom-2 left-3 px-2 py-0.5 text-[9px] text-white font-body tracking-wider rounded"
            style={{ backgroundColor: config.color }}
          >
            {config.icon} {config.label}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-4 -mt-1">
          <h3 className="font-display text-lg text-[#2D2A26]/90 mb-0.5 relative z-10">
            {site.name}
          </h3>
          <p className="text-[9px] text-[#2D2A26]/20 font-body tracking-wider uppercase mb-3">
            {site.nameEn}
          </p>

          {/* Info row */}
          <div className="flex gap-2 mb-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#2D2A26]/[0.03] flex-1">
              <MapPin className="w-3 h-3 text-[#2D2A26]/25 shrink-0" />
              <span className="text-[11px] text-[#2D2A26]/50 font-body truncate">{site.city}</span>
            </div>
            {site.year && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#2D2A26]/[0.03] flex-1">
                <Calendar className="w-3 h-3 text-[#2D2A26]/25 shrink-0" />
                <span className="text-[11px] text-[#2D2A26]/50 font-body truncate">{site.year}</span>
              </div>
            )}
          </div>

          {/* Significance */}
          <div className="flex items-start gap-1.5 mb-3 p-2.5 rounded-lg bg-[#2D2A26]/[0.02]">
            <Star className="w-3 h-3 text-[#2D2A26]/20 mt-0.5 shrink-0" />
            <p className="text-[11px] text-[#2D2A26]/50 font-body leading-relaxed">
              {site.significance}
            </p>
          </div>

          {/* Description */}
          <p className="text-[11px] text-[#2D2A26]/40 font-body leading-relaxed mb-3">
            {site.description}
          </p>

          {/* Details (collapsible) */}
          {site.details && (
            <details className="group mb-3">
              <summary className="flex items-center gap-1 text-[10px] text-[#2D2A26]/30 font-body tracking-wider cursor-pointer hover:text-[#2D2A26]/50 transition-colors">
                <ChevronRight className="w-3 h-3 group-open:rotate-90 transition-transform" />
                详细介绍
              </summary>
              <p className="text-[11px] text-[#2D2A26]/40 font-body leading-relaxed mt-2 pl-4">
                {site.details}
              </p>
            </details>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {site.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[9px] font-body tracking-wider rounded-full"
                style={{
                  color: config.color,
                  backgroundColor: `${config.color}10`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Coordinates */}
          <div className="pt-2 border-t border-[#2D2A26]/[0.04]">
            <div className="flex gap-3 text-[9px] text-[#2D2A26]/20 font-body">
              <span>{site.lat.toFixed(4)}°N</span>
              <span>{site.lng.toFixed(4)}°E</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
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
  const [inlineSite, setInlineSite] = useState<FarmingSite | null>(null);

  const handleCategoryClick = (cat: SiteCategory | "all") => {
    onCategoryChange(cat);
    setMapCenter(HUNAN_CENTER);
    setMapZoom(HUNAN_ZOOM);
    setInlineSite(null);
  };

  const handleMarkerClick = useCallback(
    (site: FarmingSite) => {
      setInlineSite(site);
      setMapCenter([site.lat, site.lng]);
      setMapZoom(10);
    },
    []
  );

  const handleCloseInline = useCallback(() => {
    setInlineSite(null);
    setMapCenter(HUNAN_CENTER);
    setMapZoom(HUNAN_ZOOM);
  }, []);

  // Also sync from external selectedSite (e.g. from ThemeRoutes)
  useEffect(() => {
    if (selectedSite && selectedSite.id !== inlineSite?.id) {
      setInlineSite(selectedSite);
      setMapCenter([selectedSite.lat, selectedSite.lng]);
      setMapZoom(10);
    }
  }, [selectedSite]);

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

        {/* Map with inline detail */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-xl shadow-black/[0.06] border border-[#2D2A26]/[0.05]"
          style={{ height: "70vh", minHeight: "550px" }}
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
            <PulseStyle />

            {/* 高德地图中文底图 */}
            <TileLayer
              attribution='&copy; <a href="https://amap.com/">高德地图</a>'
              url="https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
              subdomains={['1','2','3','4']}
            />

            {/* Markers with DivIcon for larger click area */}
            {sites.map((site) => {
              const config = CATEGORY_CONFIG[site.category];
              const isSelected = inlineSite?.id === site.id;
              return (
                <Marker
                  key={site.id}
                  position={[site.lat, site.lng]}
                  icon={createDotIcon(config.color, isSelected)}
                  eventHandlers={{
                    click: () => handleMarkerClick(site),
                  }}
                >
                  <Tooltip
                    direction="top"
                    offset={[0, -14]}
                    className="custom-tooltip"
                  >
                    <div style={{
                      padding: "4px 10px",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#2D2A26",
                      whiteSpace: "nowrap",
                    }}>
                      {site.name}
                    </div>
                  </Tooltip>
                </Marker>
              );
            })}
          </MapContainer>

          {/* Inline detail panel (inside map) */}
          <AnimatePresence>
            {inlineSite && (
              <InlineDetail site={inlineSite} onClose={handleCloseInline} />
            )}
          </AnimatePresence>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg z-[1000]">
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
