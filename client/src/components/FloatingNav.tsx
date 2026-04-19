/*
 * FloatingNav - 极简玻璃态导航
 * 桌面端：顶部浮动导航（分类筛选 + 功能快捷入口）
 * 移动端：底部固定导航栏（5个核心功能入口）
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Menu, X, CalendarDays, ShoppingBag, Route, Home } from "lucide-react";
import { CATEGORY_CONFIG, type SiteCategory } from "@/lib/data";
import { useIsMobile } from "@/hooks/useMobile";

interface FloatingNavProps {
  activeCategory: SiteCategory | "all";
  onCategoryChange: (cat: SiteCategory | "all") => void;
  onScrollToMap: () => void;
  onNavigate?: (section: string) => void;
}

export default function FloatingNav({ activeCategory, onCategoryChange, onScrollToMap, onNavigate }: FloatingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = ["all", "ancient", "modern", "red"] as const;

  const handleNav = (section: string) => {
    onNavigate?.(section);
    setMenuOpen(false);
  };

  // Mobile bottom navigation bar
  if (isMobile) {
    return (
      <AnimatePresence>
        {scrolled && (
          <>
            {/* Top compact nav */}
            <motion.nav
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 right-0 z-50"
            >
              <div className="mx-3 mt-2">
                <div className="glass rounded-full px-4 h-10 flex items-center justify-between shadow-lg shadow-black/[0.03]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#2D2A26] flex items-center justify-center">
                      <span className="text-white font-display text-[8px]">湘</span>
                    </div>
                    <span className="font-heading text-[11px] text-[#2D2A26]/70 tracking-wider">
                      农耕文化地图
                    </span>
                  </div>

                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-7 h-7 flex items-center justify-center text-[#2D2A26]/50 rounded-full hover:bg-black/[0.03]"
                  >
                    {menuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Mobile dropdown for categories */}
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-2"
                    >
                      <div className="glass rounded-2xl px-3 py-3 shadow-lg shadow-black/[0.03]">
                        <div className="flex flex-wrap gap-1.5 mb-3">
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
                                {config ? `${config.icon} ${config.label}` : "全部"}
                              </button>
                            );
                          })}
                        </div>
                        <div className="border-t border-[#2D2A26]/[0.05] pt-2 grid grid-cols-4 gap-1">
                          {[
                            { id: "map", label: "地图", icon: Map },
                            { id: "routes", label: "路线", icon: Route },
                            { id: "calendar", label: "日历", icon: CalendarDays },
                            { id: "shop", label: "购农遗", icon: ShoppingBag },
                          ].map(item => (
                            <button
                              key={item.id}
                              onClick={() => handleNav(item.id)}
                              className="flex flex-col items-center gap-1 py-2 rounded-lg text-[#2D2A26]/40 hover:text-[#2D2A26]/60 hover:bg-black/[0.02] transition-all"
                            >
                              <item.icon className="w-4 h-4" />
                              <span className="text-[9px] font-body">{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.nav>

            {/* Bottom tab bar */}
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              className="fixed bottom-0 left-0 right-0 z-50 pb-safe"
            >
              <div className="bg-white/90 backdrop-blur-xl border-t border-[#2D2A26]/[0.06] px-2 pt-1.5 pb-2">
                <div className="flex justify-around items-center">
                  {[
                    { id: "home", label: "首页", icon: Home },
                    { id: "map", label: "地图", icon: Map },
                    { id: "calendar", label: "农事日历", icon: CalendarDays },
                    { id: "routes", label: "路线", icon: Route },
                    { id: "shop", label: "购农遗", icon: ShoppingBag },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[#2D2A26]/40 active:text-[#8B6914] active:bg-[#8B6914]/[0.05] transition-colors"
                    >
                      <item.icon className="w-[18px] h-[18px]" />
                      <span className="text-[9px] font-body leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop floating nav
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

              {/* Right actions with feature shortcuts */}
              <div className="flex items-center gap-1">
                <button
                  onClick={onScrollToMap}
                  className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-body tracking-wider text-[#2D2A26]/50 hover:text-[#2D2A26]/80 rounded-full hover:bg-black/[0.03] transition-all"
                >
                  <Map className="w-3 h-3" />
                  <span>地图</span>
                </button>
                <button
                  onClick={() => handleNav("calendar")}
                  className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-body tracking-wider text-[#2D2A26]/50 hover:text-[#C0392B]/70 rounded-full hover:bg-[#C0392B]/[0.03] transition-all"
                >
                  <CalendarDays className="w-3 h-3" />
                  <span>日历</span>
                </button>
                <button
                  onClick={() => handleNav("shop")}
                  className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-body tracking-wider text-[#2D2A26]/50 hover:text-[#1B7A4E]/70 rounded-full hover:bg-[#1B7A4E]/[0.03] transition-all"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>购农遗</span>
                </button>
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
