/*
 * 湖南省农耕文化地图 - 主页面
 * 设计哲学：白色发光 + 极简 + 视觉层次
 * 交互：地图内嵌详情面板，不遮挡页面
 */

import { useState, useCallback, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import ThemeRoutes from "@/components/ThemeRoutes";
import StatsBar from "@/components/StatsBar";
import FloatingNav from "@/components/FloatingNav";
import TimelineSection from "@/components/TimelineSection";
import Footer from "@/components/Footer";
import { SITES, type FarmingSite, type SiteCategory } from "@/lib/data";

export default function Home() {
  const [selectedSite, setSelectedSite] = useState<FarmingSite | null>(null);
  const [activeCategory, setActiveCategory] = useState<SiteCategory | "all">("all");
  const mapRef = useRef<HTMLDivElement>(null);

  const handleSiteSelect = useCallback((site: FarmingSite) => {
    setSelectedSite(site);
  }, []);

  const handleCategoryChange = useCallback((cat: SiteCategory | "all") => {
    setActiveCategory(cat);
  }, []);

  const scrollToMap = useCallback(() => {
    mapRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleExploreRoute = useCallback((category: SiteCategory) => {
    setActiveCategory(category);
    setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const filteredSites = activeCategory === "all"
    ? SITES
    : SITES.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Floating Navigation */}
      <FloatingNav
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onScrollToMap={scrollToMap}
      />

      {/* Hero Section */}
      <HeroSection onExplore={scrollToMap} />

      {/* Stats Bar */}
      <StatsBar />

      {/* Map Section - detail panel is now embedded inside */}
      <div ref={mapRef}>
        <MapSection
          sites={filteredSites}
          activeCategory={activeCategory}
          onSiteSelect={handleSiteSelect}
          onCategoryChange={handleCategoryChange}
          selectedSite={selectedSite}
        />
      </div>

      {/* Theme Routes */}
      <ThemeRoutes
        onSiteSelect={handleSiteSelect}
        onExploreRoute={handleExploreRoute}
      />

      {/* Timeline Section */}
      <TimelineSection onSiteSelect={handleSiteSelect} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
