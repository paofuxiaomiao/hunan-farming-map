/*
 * ThemeRoutes - 三条主题线路
 * 农耕文明探源 / 数字农旅体验 / 红色农事教育
 * 卡片式布局，每条线路配有代表性图片
 */

import { motion } from "framer-motion";
import { THEME_ROUTES, SITES, type FarmingSite } from "@/lib/data";
import { ArrowRight, MapPin } from "lucide-react";

interface ThemeRoutesProps {
  onSiteSelect: (site: FarmingSite) => void;
}

export default function ThemeRoutes({ onSiteSelect }: ThemeRoutesProps) {
  return (
    <section className="py-20 bg-[#2D2A26] relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #8B6914 1px, transparent 1px),
                           radial-gradient(circle at 80% 20%, #8B6914 1px, transparent 1px)`,
          backgroundSize: "100px 100px"
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-[1px] w-12 bg-[#D4A76A]" />
            <span className="text-xs tracking-[0.3em] text-[#D4A76A] font-body uppercase">
              Theme Routes
            </span>
            <div className="h-[1px] w-12 bg-[#D4A76A]" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[#F5F0E3] mb-3">
            三条主题线路
          </h2>
          <p className="font-body text-[#D4A76A]/60 max-w-2xl mx-auto">
            沿着三条精心策划的文化线路，系统性地探索湖湘农耕文明的不同维度
          </p>
        </motion.div>

        {/* Route Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {THEME_ROUTES.map((route, index) => {
            const routeSites = route.sites
              .map(id => SITES.find(s => s.id === id))
              .filter(Boolean) as FarmingSite[];

            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative overflow-hidden bg-[#1a1a1a] border border-[#333] hover:border-[#555] transition-colors duration-500">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={route.image}
                      alt={route.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent" />

                    {/* Route number badge */}
                    <div
                      className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center text-white font-display text-lg"
                      style={{ backgroundColor: route.color }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Site count badge */}
                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-sm text-[10px] text-white/80 font-body">
                      {routeSites.length} 个点位
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Color line */}
                    <div className="h-[2px] w-12 mb-4 transition-all duration-500 group-hover:w-20" style={{ backgroundColor: route.color }} />

                    <h3 className="font-heading text-xl text-[#F5F0E3] mb-1">
                      {route.name}
                    </h3>
                    <p className="text-xs text-[#D4A76A]/50 font-body mb-3 tracking-wider">
                      {route.nameEn}
                    </p>
                    <p className="text-sm text-[#D4A76A]/70 font-body mb-5 leading-relaxed">
                      {route.description}
                    </p>

                    {/* Site list */}
                    <div className="space-y-1.5 mb-6">
                      {routeSites.slice(0, 5).map((site, si) => (
                        <button
                          key={site.id}
                          onClick={() => onSiteSelect(site)}
                          className="flex items-center gap-3 w-full text-left group/item hover:bg-white/5 p-2 -mx-2 transition-colors"
                        >
                          <span className="text-xs text-[#D4A76A]/40 font-body w-5">
                            {String(si + 1).padStart(2, "0")}
                          </span>
                          <MapPin className="w-3 h-3 text-[#D4A76A]/30" />
                          <span className="text-sm text-[#F5F0E3]/80 font-body group-hover/item:text-[#D4A76A] transition-colors truncate">
                            {site.name}
                          </span>
                          <span className="text-xs text-[#D4A76A]/30 ml-auto flex-shrink-0">
                            {site.city}
                          </span>
                        </button>
                      ))}
                      {routeSites.length > 5 && (
                        <p className="text-xs text-[#D4A76A]/40 pl-8 font-body">
                          还有 {routeSites.length - 5} 个点位...
                        </p>
                      )}
                    </div>

                    {/* CTA */}
                    <div
                      className="flex items-center gap-2 text-sm font-body tracking-wider group-hover:gap-4 transition-all"
                      style={{ color: route.color }}
                    >
                      <span>探索线路</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
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
