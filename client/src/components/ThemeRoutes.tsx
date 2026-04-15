/*
 * ThemeRoutes - 三条主题线路
 * 极简白色卡片，精致排版
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { THEME_ROUTES, SITES, type FarmingSite, type SiteCategory } from "@/lib/data";
import { ArrowRight, ChevronDown } from "lucide-react";

interface ThemeRoutesProps {
  onSiteSelect: (site: FarmingSite) => void;
  onExploreRoute?: (category: SiteCategory) => void;
}

export default function ThemeRoutes({ onSiteSelect, onExploreRoute }: ThemeRoutesProps) {
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);

  return (
    <section id="theme-routes" className="py-24 bg-[#faf9f6] relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-[#2D2A26]/90 mb-3">
            三条主题线路
          </h2>
          <p className="font-body text-sm text-[#2D2A26]/30 max-w-lg mx-auto">
            沿着精心策划的文化线路，系统性地探索湖湘农耕文明
          </p>
        </motion.div>

        {/* Route Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {THEME_ROUTES.map((route, index) => {
            const routeSites = route.sites
              .map(id => SITES.find(s => s.id === id))
              .filter(Boolean) as FarmingSite[];
            const isExpanded = expandedRoute === route.id;
            const displaySites = isExpanded ? routeSites : routeSites.slice(0, 5);

            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 border border-[#2D2A26]/[0.04]">
                  {/* Header with image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={route.image}
                      alt={route.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />

                    {/* Route number */}
                    <div
                      className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center text-white text-xs font-display rounded-lg"
                      style={{ backgroundColor: route.color }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Site count */}
                    <div className="absolute top-4 right-4 px-2 py-0.5 bg-white/80 backdrop-blur-sm text-[10px] text-[#2D2A26]/60 font-body rounded-full">
                      {routeSites.length} 个点位
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 pt-5 pb-4">
                    {/* Color dot */}
                    <div
                      className="w-2 h-2 rounded-full mb-3"
                      style={{ backgroundColor: route.color }}
                    />

                    <h3 className="font-heading text-xl text-[#2D2A26]/85 mb-1">
                      {route.name}
                    </h3>
                    <p className="text-[10px] text-[#2D2A26]/25 font-body tracking-wider uppercase mb-3">
                      {route.nameEn}
                    </p>
                    <p className="text-sm text-[#2D2A26]/40 font-body leading-relaxed mb-4">
                      {route.description}
                    </p>

                    {/* Sites list */}
                    <div className="space-y-0">
                      {displaySites.map((site, sIdx) => (
                        <button
                          key={site.id}
                          onClick={() => onSiteSelect(site)}
                          className="w-full flex items-center gap-3 py-2.5 border-t border-[#2D2A26]/[0.04] hover:bg-[#2D2A26]/[0.02] transition-colors text-left group/item"
                        >
                          <span className="text-[10px] text-[#2D2A26]/20 font-body w-5 shrink-0 tabular-nums">
                            {String(sIdx + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm text-[#2D2A26]/60 font-body truncate group-hover/item:text-[#2D2A26]/80 transition-colors">
                            {site.name}
                          </span>
                          <span className="text-[10px] text-[#2D2A26]/20 font-body ml-auto shrink-0">
                            {site.city}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Expand/Collapse */}
                    {routeSites.length > 5 && (
                      <button
                        onClick={() => setExpandedRoute(isExpanded ? null : route.id)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 mt-1 text-[11px] text-[#2D2A26]/30 hover:text-[#2D2A26]/50 font-body tracking-wider transition-colors border-t border-[#2D2A26]/[0.04]"
                      >
                        {isExpanded ? "收起" : `展开全部 ${routeSites.length} 个点位`}
                        <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>

                  {/* Explore button */}
                  <div className="px-6 pb-6">
                    <button
                      onClick={() => onExploreRoute?.(route.category)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-body tracking-wider transition-all duration-300 text-white hover:shadow-md hover:gap-3"
                      style={{ backgroundColor: route.color }}
                    >
                      探索线路
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
