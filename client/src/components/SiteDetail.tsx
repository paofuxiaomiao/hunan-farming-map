/*
 * SiteDetail - 极简右侧浮层详情面板
 * 白色背景，精致排版
 */

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Star, ExternalLink } from "lucide-react";
import { CATEGORY_CONFIG, type FarmingSite } from "@/lib/data";

interface SiteDetailProps {
  site: FarmingSite | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SiteDetail({ site, isOpen, onClose }: SiteDetailProps) {
  if (!site) return null;

  const config = CATEGORY_CONFIG[site.category];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl shadow-black/10 z-50 overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#2D2A26]/40 hover:text-[#2D2A26]/70 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Hero image */}
            <div className="relative h-64 overflow-hidden">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                src={site.image}
                alt={site.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

              {/* Category badge */}
              <div
                className="absolute bottom-4 left-5 px-2.5 py-1 text-[10px] text-white font-body tracking-wider rounded"
                style={{ backgroundColor: config.color }}
              >
                {config.icon} {config.label}
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-8">
              {/* Name */}
              <h2 className="font-display text-2xl text-[#2D2A26]/90 mb-1 -mt-2 relative z-10">
                {site.name}
              </h2>
              <p className="text-[10px] text-[#2D2A26]/25 font-body tracking-wider uppercase mb-5">
                {site.nameEn}
              </p>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-start gap-2 p-3 rounded-xl bg-[#2D2A26]/[0.02]">
                  <MapPin className="w-3.5 h-3.5 text-[#2D2A26]/25 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[9px] text-[#2D2A26]/25 font-body tracking-wider uppercase mb-0.5">位置</div>
                    <div className="text-xs text-[#2D2A26]/60 font-body">{site.city}</div>
                  </div>
                </div>
                {site.year && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-[#2D2A26]/[0.02]">
                    <Calendar className="w-3.5 h-3.5 text-[#2D2A26]/25 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[9px] text-[#2D2A26]/25 font-body tracking-wider uppercase mb-0.5">年代</div>
                      <div className="text-xs text-[#2D2A26]/60 font-body">{site.year}</div>
                    </div>
                  </div>
                )}
                <div className="col-span-2 flex items-start gap-2 p-3 rounded-xl bg-[#2D2A26]/[0.02]">
                  <Star className="w-3.5 h-3.5 text-[#2D2A26]/25 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[9px] text-[#2D2A26]/25 font-body tracking-wider uppercase mb-0.5">意义</div>
                    <div className="text-xs text-[#2D2A26]/60 font-body">{site.significance}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-[10px] text-[#2D2A26]/25 font-body tracking-wider uppercase mb-2">简介</h3>
                <p className="text-sm text-[#2D2A26]/50 font-body leading-relaxed">
                  {site.description}
                </p>
              </div>

              {/* Details */}
              <div className="mb-6">
                <h3 className="text-[10px] text-[#2D2A26]/25 font-body tracking-wider uppercase mb-2">详细介绍</h3>
                <p className="text-sm text-[#2D2A26]/50 font-body leading-relaxed">
                  {site.details}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {site.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[10px] font-body tracking-wider rounded-full border"
                    style={{
                      color: config.color,
                      borderColor: `${config.color}20`,
                      backgroundColor: `${config.color}08`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Coordinates */}
              <div className="pt-4 border-t border-[#2D2A26]/[0.05] mb-5">
                <div className="flex gap-4 text-[10px] text-[#2D2A26]/25 font-body">
                  <span>经度: {site.lng.toFixed(4)}°E</span>
                  <span>纬度: {site.lat.toFixed(4)}°N</span>
                </div>
              </div>

              {/* Map link */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-body tracking-wider transition-all duration-300 text-white hover:shadow-md"
                style={{ backgroundColor: config.color }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                在地图中查看
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
