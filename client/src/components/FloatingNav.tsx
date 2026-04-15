/*
 * FloatingNav - 极简玻璃态导航
 * 白色半透明，滚动后显示
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
    <AnimatePresence>
      {scrolled && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="mx-auto max-w-5xl px-4 pt-3">
            <div className="glass rounded-full px-6 h-12 flex items-center justify-between shadow-lg shadow-black/[0.03]">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#2D2A26] flex items-center justify-center">
                  <span className="text-white font-display text-[10px]">湘</span>
                </div>
                <span className="hidden sm:block font-heading text-xs text-[#2D2A26]/70 tracking-wider">
                  农耕文化地图
                </span>
              </div>

              {/* Desktop category pills */}
              <div className="hidden md:flex items-center gap-1">
                {categories.map(cat => {
                  const isActive = activeCategory === cat;
                  const config = cat === "all" ? null : CATEGORY_CONFIG[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => onCategoryChange(cat)}
                      className={`
                        px-3 py-1 text-[11px] font-body tracking-wider rounded-full transition-all duration-300
                        ${isActive
                          ? "text-white shadow-sm"
                          : "text-[#2D2A26]/40 hover:text-[#2D2A26]/70 hover:bg-black/[0.03]"
                        }
                      `}
                      style={isActive ? {
                        backgroundColor: config ? config.color : "#2D2A26",
                      } : {}}
                    >
                      {config ? config.label : "全部"}
                    </button>
                  );
                })}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onScrollToMap}
                  className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-body tracking-wider text-[#2D2A26]/50 hover:text-[#2D2A26]/80 rounded-full hover:bg-black/[0.03] transition-all"
                >
                  <Map className="w-3 h-3" />
                  <span className="hidden sm:inline">地图</span>
                </button>

                {/* Mobile menu */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden w-7 h-7 flex items-center justify-center text-[#2D2A26]/50 rounded-full hover:bg-black/[0.03]"
                >
                  {menuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
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
                  className="overflow-hidden mt-2"
                >
                  <div className="glass rounded-2xl px-4 py-3 flex flex-wrap gap-2 shadow-lg shadow-black/[0.03]">
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
                            px-3 py-1.5 text-[11px] font-body tracking-wider rounded-full transition-all
                            ${isActive
                              ? "text-white"
                              : "text-[#2D2A26]/40 hover:text-[#2D2A26]/70 bg-black/[0.03]"
                            }
                          `}
                          style={isActive ? {
                            backgroundColor: config ? config.color : "#2D2A26",
                          } : {}}
                        >
                          {config ? config.label : "全部"}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
