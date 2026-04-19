/*
 * 湖南省农耕文化地图 - 主页面
 * 设计哲学：白色发光 + 极简 + 视觉层次
 * 新增：功能导航、农事日历、扫一扫购农遗、移动端底部抽屉
 */

import { useState, useCallback, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import ThemeRoutes from "@/components/ThemeRoutes";
import StatsBar from "@/components/StatsBar";
import SiteDetail from "@/components/SiteDetail";
import FloatingNav from "@/components/FloatingNav";
import TimelineSection from "@/components/TimelineSection";
import FeatureNav from "@/components/FeatureNav";
import FarmingCalendar from "@/components/FarmingCalendar";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";
import { SITES, type FarmingSite, type SiteCategory } from "@/lib/data";

export default function Home() {
  const [selectedSite, setSelectedSite] = useState<FarmingSite | null>(null);
  const [activeCategory, setActiveCategory] = useState<SiteCategory | "all">("all");
  const [showDetail, setShowDetail] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const routesRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

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

  const handleExploreRoute = useCallback((category: SiteCategory) => {
    setActiveCategory(category);
    setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  // Unified navigation handler for all feature sections
  const handleNavigate = useCallback((section: string) => {
    switch (section) {
      case "home":
        heroRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "map":
        mapRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "calendar":
        calendarRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "shop":
        shopRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "routes":
      case "study":
        routesRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  }, []);

  const filteredSites = activeCategory === "all"
    ? SITES
    : SITES.filter(s => s.category === activeCategory);

  return (
    <div ref={heroRef} className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Floating Navigation */}
      <FloatingNav
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onScrollToMap={scrollToMap}
        onNavigate={handleNavigate}
      />

      {/* Hero Section */}
      <HeroSection onExplore={scrollToMap} />

      {/* Stats Bar */}
      <StatsBar />

      {/* Feature Navigation Cards */}
      <FeatureNav onNavigate={handleNavigate} />

      {/* Map Section */}
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
      <div ref={routesRef}>
        <ThemeRoutes
          onSiteSelect={handleSiteSelect}
          onExploreRoute={handleExploreRoute}
        />
      </div>

      {/* Farming Calendar */}
      <div ref={calendarRef}>
        <FarmingCalendar onSiteSelect={handleSiteSelect} />
      </div>

      {/* Shop Section */}
      <div ref={shopRef}>
        <ShopSection onSiteSelect={handleSiteSelect} />
      </div>

      {/* Timeline Section */}
      <TimelineSection onSiteSelect={handleSiteSelect} />

      {/* Footer */}
      <Footer />

      {/* Site Detail Panel (responsive: right panel / bottom drawer) */}
      <SiteDetail
        site={selectedSite}
        isOpen={showDetail}
        onClose={handleCloseDetail}
      />

      {/* Mobile bottom nav spacer */}
      <div className="md:hidden h-16" />
    </div>
  );
}
