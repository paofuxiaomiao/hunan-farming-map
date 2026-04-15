/*
 * FloatingNav - 悬浮导航栏
 * 顶部固定，极简设计，滚动时显示
 * 包含Logo、分类筛选、地图跳转
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Menu, X } from "lucide-react";
import { CATEGORY_CONFIG, type SiteCategory } from "@/lib/data";

interface FloatingNavProps {
  activeCategory: SiteCategory | "all";
  onCategoryChange: (cat: SiteCategory | "all") => void;
  onScrollToMap: () => void;
}

export default function FloatingNav({ activeCategory, onCategoryChange, onScrollToMap }: FloatingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = ["all", "ancient", "modern", "red"] as const;

  return (
    <>
      {/* Main floating nav - appears on scroll */}
      <AnimatePresence>
        {scrolled && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-30 bg-[#2D2A26]/95 backdrop-blur-md border-b border-[#8B6914]/20"
          >
            <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#8B6914] flex items-center justify-center">
                  <span className="text-[#F5F0E3] font-display text-sm">湘</span>
                </div>
                <div className="hidden sm:block">
                  <div className="font-heading text-sm text-[#F5F0E3]">湖南省农耕文化地图</div>
                  <div className="text-[9px] text-[#D4A76A]/40 tracking-wider font-body">
                    HUNAN FARMING HERITAGE MAP
                  </div>
                </div>
              </div>

              {/* Desktop category pills */}
              <div className="hidden md:flex items-center gap-2">
                {categories.map(cat => {
                  const isActive = activeCategory === cat;
                  const config = cat === "all" ? null : CATEGORY_CONFIG[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => onCategoryChange(cat)}
                      className={`
                        px-3 py-1.5 text-xs font-body tracking-wider transition-all duration-300 border
                        ${isActive
                          ? "text-[#F5F0E3] border-transparent"
                          : "text-[#D4A76A]/60 border-transparent hover:text-[#D4A76A]"
                        }
                      `}
                      style={isActive ? {
                        backgroundColor: config ? config.color : "#8B6914",
                      } : {}}
                    >
                      {config ? `${config.icon} ${config.label}` : "全部"}
                    </button>
                  );
                })}
              </div>

              {/* Map button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onScrollToMap}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-body tracking-wider text-[#D4A76A] border border-[#D4A76A]/30 hover:bg-[#D4A76A]/10 transition-all"
                >
                  <Map className="w-3 h-3" />
                  地图
                </button>

                {/* Mobile menu toggle */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden w-8 h-8 flex items-center justify-center text-[#D4A76A]"
                >
                  {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="md:hidden overflow-hidden border-t border-[#8B6914]/10"
                >
                  <div className="px-4 py-3 flex flex-wrap gap-2">
                    {categories.map(cat => {
                      const isActive = activeCategory === cat;
                      const config = cat === "all" ? null : CATEGORY_CONFIG[cat];
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            onCategoryChange(cat);
                            setMenuOpen(false);
                          }}
                          className={`
                            px-3 py-1.5 text-xs font-body tracking-wider transition-all border
                            ${isActive
                              ? "text-[#F5F0E3] border-transparent"
                              : "text-[#D4A76A]/60 border-[#D4A76A]/20 hover:text-[#D4A76A]"
                            }
                          `}
                          style={isActive ? {
                            backgroundColor: config ? config.color : "#8B6914",
                          } : {}}
                        >
                          {config ? `${config.icon} ${config.label}` : "全部"}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Initial top overlay - before scroll */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-start">
              <span className="text-xs tracking-[0.3em] text-[#5C3D1E]/40 font-body pointer-events-auto">
                MENU
              </span>
              <button
                onClick={onScrollToMap}
                className="flex items-center gap-1.5 text-xs tracking-[0.2em] text-[#5C3D1E]/50 font-body pointer-events-auto hover:text-[#8B6914] transition-colors"
              >
                <Map className="w-3 h-3" />
                CARTE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
