/*
 * SiteDetail - 右侧浮层详情面板
 * 模拟"宣纸展开"的滑入效果
 * 展示点位详细信息、图片、标签
 */

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Tag, Star, ExternalLink, ChevronRight } from "lucide-react";
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#F5F0E3] shadow-2xl z-50 overflow-y-auto"
          >
            {/* Top color bar with gradient */}
            <div className="h-1.5 relative overflow-hidden">
              <div className="absolute inset-0" style={{ backgroundColor: config.color }} />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-[#2D2A26]/10 hover:bg-[#2D2A26]/20 rounded-full transition-all duration-300 z-10 hover:rotate-90"
            >
              <X className="w-5 h-5 text-[#2D2A26]" />
            </button>

            {/* Image with parallax effect */}
            <div className="relative h-72 overflow-hidden">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                src={site.image}
                alt={site.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E3] via-[#F5F0E3]/20 to-transparent" />

              {/* Category badge */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-4 left-6 px-4 py-1.5 text-white text-xs font-body tracking-wider flex items-center gap-1.5"
                style={{ backgroundColor: config.color }}
              >
                <span className="text-sm">{config.icon}</span>
                {config.label}
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 -mt-2">
              {/* Name with animation */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-display text-3xl text-[#2D2A26] mb-1">
                  {site.name}
                </h3>
                <p className="text-sm text-[#5C3D1E]/50 font-body tracking-wider mb-4">
                  {site.nameEn}
                </p>
              </motion.div>

              {/* Decorative line with dot */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center gap-0 mb-6"
              >
                <div className="h-[2px] flex-1" style={{ backgroundColor: config.color }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
              </motion.div>

              {/* Info grid */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4 mb-6"
              >
                <div className="flex items-start gap-2 p-3 bg-white/40 rounded-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: config.color }} />
                  <div>
                    <div className="text-[10px] text-[#5C3D1E]/40 font-body uppercase tracking-wider">位置</div>
                    <div className="text-sm text-[#2D2A26] font-body">{site.city}</div>
                  </div>
                </div>
                {site.year && (
                  <div className="flex items-start gap-2 p-3 bg-white/40 rounded-sm">
                    <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: config.color }} />
                    <div>
                      <div className="text-[10px] text-[#5C3D1E]/40 font-body uppercase tracking-wider">年代</div>
                      <div className="text-sm text-[#2D2A26] font-body">{site.year}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2 col-span-2 p-3 bg-white/40 rounded-sm">
                  <Star className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: config.color }} />
                  <div>
                    <div className="text-[10px] text-[#5C3D1E]/40 font-body uppercase tracking-wider">重要意义</div>
                    <div className="text-sm text-[#2D2A26] font-body">{site.significance}</div>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <h4 className="font-heading text-sm mb-2 tracking-wider flex items-center gap-2" style={{ color: config.color }}>
                  <ChevronRight className="w-3 h-3" />
                  简介
                </h4>
                <p className="text-sm text-[#5C3D1E]/80 font-body leading-relaxed pl-5">
                  {site.description}
                </p>
              </motion.div>

              {/* Details */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <h4 className="font-heading text-sm mb-2 tracking-wider flex items-center gap-2" style={{ color: config.color }}>
                  <ChevronRight className="w-3 h-3" />
                  详细介绍
                </h4>
                <p className="text-sm text-[#5C3D1E]/70 font-body leading-relaxed pl-5">
                  {site.details}
                </p>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-3 h-3" style={{ color: config.color }} />
                  <span className="text-xs font-body tracking-wider" style={{ color: config.color }}>标签</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {site.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.05 }}
                      className="px-3 py-1 text-xs font-body border"
                      style={{
                        borderColor: config.color + "40",
                        color: config.color,
                        backgroundColor: config.colorBg,
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Coordinates */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-4 border-t border-[#8B6914]/10"
              >
                <div className="flex justify-between items-center text-xs text-[#5C3D1E]/40 font-body">
                  <div className="flex gap-4">
                    <span>经度: {site.lng.toFixed(4)}°E</span>
                    <span>纬度: {site.lat.toFixed(4)}°N</span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/@${site.lat},${site.lng},15z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-[#8B6914] transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>查看地图</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
