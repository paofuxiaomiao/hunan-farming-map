/*
 * 「稻浪长歌」湖南省农耕文化地图 - 主页面
 * 设计哲学：沉浸式叙事漫游，全屏地图为中心，UI极度克制
 * 色彩：稻穗金+大地赭暖色宇宙，三色图层体系
 * 字体：LXGW WenKai(大标题) + Noto Serif SC(副标题) + Noto Sans SC(正文)
 */

import { useState, useCallback, useRef, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import ThemeRoutes from "@/components/ThemeRoutes";
import StatsBar from "@/components/StatsBar";
import SiteDetail from "@/components/SiteDetail";
import FloatingNav from "@/components/FloatingNav";
import TimelineSection from "@/components/TimelineSection";
import Footer from "@/components/Footer";
import { SITES, type FarmingSite, type SiteCategory } from "@/lib/data";

export default function Home() {
  const [selectedSite, setSelectedSite] = useState<FarmingSite | null>(null);
  const [activeCategory, setActiveCategory] = useState<SiteCategory | "all">("all");
  const [showDetail, setShowDetail] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleSiteSelect = useCallback((site: FarmingSite) => {
    setSelectedSite(site);
    setShowDetail(true);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setShowDetail(false);
    setTimeout(() => setSelectedSite(null), 300);
  }, []);

  const handleCategoryChange = useCallback((cat: SiteCategory | "all") => {
    setActiveCategory(cat);
  }, []);

  const scrollToMap = useCallback(() => {
    mapRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const filteredSites = activeCategory === "all"
    ? SITES
    : SITES.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-parchment relative overflow-x-hidden">
      {/* Floating Navigation */}
      <FloatingNav
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onScrollToMap={scrollToMap}
      />

      {/* Hero Section - 全屏沉浸式入口 */}
      <HeroSection onExplore={scrollToMap} />

      {/* Stats Bar - 数据概览 */}
      <StatsBar />

      {/* Map Section - 核心交互地图 */}
      <div ref={mapRef}>
        <MapSection
          sites={filteredSites}
          activeCategory={activeCategory}
          onSiteSelect={handleSiteSelect}
          onCategoryChange={handleCategoryChange}
          selectedSite={selectedSite}
        />
      </div>

      {/* Theme Routes - 三条主题线路 */}
      <ThemeRoutes onSiteSelect={handleSiteSelect} />

      {/* Timeline Section - 时间轴 */}
      <TimelineSection onSiteSelect={handleSiteSelect} />

      {/* Footer */}
      <Footer />

      {/* Site Detail Panel - 右侧浮层 */}
      <SiteDetail
        site={selectedSite}
        isOpen={showDetail}
        onClose={handleCloseDetail}
      />
    </div>
  );
}
