/*
 * SiteDetail - 自适应详情面板
 * 桌面端：极简右侧浮层面板
 * 移动端：底部抽屉式弹出（支持上滑展开、下滑收起）
 * 白色光感极简风格
 */

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Star, ExternalLink, ShoppingBag, ChevronUp } from "lucide-react";
import { CATEGORY_CONFIG, SITES, type FarmingSite } from "@/lib/data";
import { useIsMobile } from "@/hooks/useMobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface SiteDetailProps {
  site: FarmingSite | null;
  isOpen: boolean;
  onClose: () => void;
}

// Check if site has associated shop product
const SHOP_SITES = ["nanxian_shrimp", "tea_culture", "ziquejie", "zhuzhou_yanling_yellow_peach_base", "huaihua_bingtang_orange_base", "xiangxi_kiwi_fruit_industrial_park"];

function getShopUrl(siteId: string): string | null {
  const shopMap: Record<string, string> = {
    nanxian_shrimp: "https://search.jd.com/Search?keyword=南县稻虾米",
    tea_culture: "https://search.jd.com/Search?keyword=安化黑茶",
    ziquejie: "https://search.jd.com/Search?keyword=紫鹊界贡米",
    zhuzhou_yanling_yellow_peach_base: "https://search.jd.com/Search?keyword=炎陵黄桃",
    huaihua_bingtang_orange_base: "https://search.jd.com/Search?keyword=麻阳冰糖橙",
    xiangxi_kiwi_fruit_industrial_park: "https://search.jd.com/Search?keyword=湘西猕猴桃",
  };
  return shopMap[siteId] || null;
}

function SiteContent({ site, onClose, isMobile }: { site: FarmingSite; onClose: () => void; isMobile: boolean }) {
  const config = CATEGORY_CONFIG[site.category];
  const shopUrl = getShopUrl(site.id);
  const hasShop = SHOP_SITES.includes(site.id);

  return (
    <div className={isMobile ? "" : ""}>
      {/* Hero image */}
      <div className={`relative overflow-hidden ${isMobile ? "h-40" : "h-64"}`}>
        <img
          src={site.image}
          alt={site.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

        {/* Category badge */}
        <div
          className="absolute bottom-3 left-4 md:bottom-4 md:left-5 px-2.5 py-1 text-[10px] text-white font-body tracking-wider rounded"
          style={{ backgroundColor: config.color }}
        >
          {config.icon} {config.label}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6 md:px-6 md:pb-8">
        {/* Name */}
        <h2 className="font-display text-xl md:text-2xl text-[#2D2A26]/90 mb-1 -mt-2 relative z-10">
          {site.name}
        </h2>
        <p className="text-[10px] text-[#2D2A26]/25 font-body tracking-wider uppercase mb-4 md:mb-5">
          {site.nameEn}
        </p>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="flex items-start gap-2 p-2.5 md:p-3 rounded-xl bg-[#2D2A26]/[0.02]">
            <MapPin className="w-3.5 h-3.5 text-[#2D2A26]/25 mt-0.5 shrink-0" />
            <div>
              <div className="text-[9px] text-[#2D2A26]/25 font-body tracking-wider uppercase mb-0.5">位置</div>
              <div className="text-xs text-[#2D2A26]/60 font-body">{site.city}</div>
            </div>
          </div>
          {site.year && (
            <div className="flex items-start gap-2 p-2.5 md:p-3 rounded-xl bg-[#2D2A26]/[0.02]">
              <Calendar className="w-3.5 h-3.5 text-[#2D2A26]/25 mt-0.5 shrink-0" />
              <div>
                <div className="text-[9px] text-[#2D2A26]/25 font-body tracking-wider uppercase mb-0.5">年代</div>
                <div className="text-xs text-[#2D2A26]/60 font-body">{site.year}</div>
              </div>
            </div>
          )}
          <div className="col-span-2 flex items-start gap-2 p-2.5 md:p-3 rounded-xl bg-[#2D2A26]/[0.02]">
            <Star className="w-3.5 h-3.5 text-[#2D2A26]/25 mt-0.5 shrink-0" />
            <div>
              <div className="text-[9px] text-[#2D2A26]/25 font-body tracking-wider uppercase mb-0.5">意义</div>
              <div className="text-xs text-[#2D2A26]/60 font-body">{site.significance}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 md:mb-6">
          <h3 className="text-[10px] text-[#2D2A26]/25 font-body tracking-wider uppercase mb-2">简介</h3>
          <p className="text-sm text-[#2D2A26]/50 font-body leading-relaxed">
            {site.description}
          </p>
        </div>

        {/* Details */}
        <div className="mb-4 md:mb-6">
          <h3 className="text-[10px] text-[#2D2A26]/25 font-body tracking-wider uppercase mb-2">详细介绍</h3>
          <p className="text-sm text-[#2D2A26]/50 font-body leading-relaxed">
            {site.details}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
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

        {/* Shop link for modern agriculture sites */}
        {hasShop && shopUrl && (
          <a
            href={shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 mb-3 rounded-xl bg-[#1B7A4E]/10 text-[#1B7A4E] text-sm font-body hover:bg-[#1B7A4E]/15 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            购买地标农产品
          </a>
        )}

        {/* Coordinates */}
        <div className="pt-3 border-t border-[#2D2A26]/[0.05] mb-4">
          <div className="flex gap-4 text-[10px] text-[#2D2A26]/25 font-body">
            <span>经度: {site.lng.toFixed(4)}°E</span>
            <span>纬度: {site.lat.toFixed(4)}°N</span>
          </div>
        </div>

        {/* Map link */}
        <a
          href={`https://www.amap.com/search?query=${encodeURIComponent(site.name)}&city=湖南`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-body tracking-wider transition-all duration-300 text-white hover:shadow-md"
          style={{ backgroundColor: config.color }}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          在高德地图中查看
        </a>
      </div>
    </div>
  );
}

export default function SiteDetail({ site, isOpen, onClose }: SiteDetailProps) {
  const isMobile = useIsMobile();

  if (!site) return null;

  // Mobile: bottom drawer
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
        <DrawerContent className="max-h-[85vh] bg-white">
          <DrawerHeader className="sr-only">
            <DrawerTitle>{site.name}</DrawerTitle>
            <DrawerDescription>{site.description}</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto flex-1">
            <SiteContent site={site} onClose={onClose} isMobile={true} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: right side panel
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

            <SiteContent site={site} onClose={onClose} isMobile={false} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
