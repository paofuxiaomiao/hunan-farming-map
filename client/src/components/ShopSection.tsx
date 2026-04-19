/*
 * ShopSection - 扫一扫购农遗
 * 白色光感极简风格 · 现代农耕地标植入电商链接
 * 实现"地图导流—场景消费—品牌增值"闭环
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ExternalLink, QrCode, MapPin, Star, X } from "lucide-react";
import { SITES, IMAGES, type FarmingSite } from "@/lib/data";

interface ShopSectionProps {
  onSiteSelect: (site: FarmingSite) => void;
}

interface ShopProduct {
  id: string;
  name: string;
  subtitle: string;
  siteId: string;
  image: string;
  price: string;
  origin: string;
  certification: string[];
  shopUrl: string;
  shopName: string;
  description: string;
}

const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "prod1",
    name: "南县稻虾米",
    subtitle: "国家地理标志产品",
    siteId: "nanxian_shrimp",
    image: IMAGES.nanxianShrimp,
    price: "¥39.9/5kg",
    origin: "益阳南县",
    certification: ["地理标志", "绿色食品", "有机认证"],
    shopUrl: "https://search.jd.com/Search?keyword=南县稻虾米",
    shopName: "京东商城",
    description: "一水两用、一田双收，稻虾共生的生态好米。颗粒饱满，口感软糯，自然稻香。",
  },
  {
    id: "prod2",
    name: "安化黑茶",
    subtitle: "千年贡茶 · 国家级非遗",
    siteId: "tea_culture",
    image: IMAGES.teaGarden,
    price: "¥128/500g",
    origin: "益阳安化",
    certification: ["国家级非遗", "地理标志", "中国十大名茶"],
    shopUrl: "https://search.jd.com/Search?keyword=安化黑茶",
    shopName: "京东商城",
    description: "安化千两茶制作技艺入选国家级非物质文化遗产，茶汤橙黄明亮，滋味醇厚回甘。",
  },
  {
    id: "prod3",
    name: "紫鹊界贡米",
    subtitle: "世界灌溉工程遗产产区",
    siteId: "ziquejie",
    image: IMAGES.ziquejie,
    price: "¥58/5kg",
    origin: "娄底新化",
    certification: ["世界遗产产区", "绿色食品"],
    shopUrl: "https://search.jd.com/Search?keyword=紫鹊界贡米",
    shopName: "京东商城",
    description: "源自两千年梯田的高山好米，自流灌溉、无污染，米粒晶莹剔透，饭香浓郁。",
  },
  {
    id: "prod4",
    name: "炎陵黄桃",
    subtitle: "高山黄桃 · 甜蜜炎陵",
    siteId: "zhuzhou_yanling_yellow_peach_base",
    image: IMAGES.harvestFestival,
    price: "¥69.9/5斤",
    origin: "株洲炎陵",
    certification: ["地理标志", "绿色食品"],
    shopUrl: "https://search.jd.com/Search?keyword=炎陵黄桃",
    shopName: "京东商城",
    description: "海拔300-1200米高山种植，果肉金黄、香气浓郁、甜度高，是湖南最具代表性的水果品牌之一。",
  },
  {
    id: "prod5",
    name: "怀化冰糖橙",
    subtitle: "中国冰糖橙之乡",
    siteId: "huaihua_bingtang_orange_base",
    image: IMAGES.beautifulVillage,
    price: "¥49.9/10斤",
    origin: "怀化麻阳",
    certification: ["地理标志", "中国驰名商标"],
    shopUrl: "https://search.jd.com/Search?keyword=麻阳冰糖橙",
    shopName: "京东商城",
    description: "麻阳冰糖橙皮薄肉嫩、无核多汁、甜如冰糖，被誉为'橙中之王'。",
  },
  {
    id: "prod6",
    name: "湘西猕猴桃",
    subtitle: "精准扶贫明星产品",
    siteId: "xiangxi_kiwi_fruit_industrial_park",
    image: IMAGES.xiangxiTerrace,
    price: "¥59.9/5斤",
    origin: "湘西花垣",
    certification: ["地理标志", "有机认证"],
    shopUrl: "https://search.jd.com/Search?keyword=湘西猕猴桃",
    shopName: "京东商城",
    description: "十八洞村精准扶贫明星产品，富含维C，果肉翠绿细腻，酸甜可口。",
  },
];

export default function ShopSection({ onSiteSelect }: ShopSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [showQR, setShowQR] = useState(false);

  const handleSiteClick = (siteId: string) => {
    const site = SITES.find(s => s.id === siteId);
    if (site) onSiteSelect(site);
  };

  return (
    <section id="shop-section" className="py-16 md:py-24 bg-gradient-to-b from-white via-[#F5FFF5] to-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-[#1B7A4E]/[0.02] blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 rounded-full bg-[#D4A76A]/[0.03] blur-3xl" />

      <div className="container max-w-5xl mx-auto px-4 md:px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] text-[#1B7A4E]/40 font-body tracking-[0.3em] uppercase mb-3">
            SHOP LOCAL HERITAGE
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-[#2D2A26]/85 mb-3">
            扫一扫购农遗
          </h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#1B7A4E]/30 to-transparent mx-auto mb-3" />
          <p className="text-sm text-[#2D2A26]/40 font-body max-w-lg mx-auto leading-relaxed">
            从地图到餐桌，一键直达湖南地标农产品
            <br className="hidden md:block" />
            地图导流 · 场景消费 · 品牌增值
          </p>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {SHOP_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div
                className="bg-white rounded-xl border border-[#2D2A26]/[0.05] overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Product image */}
                <div className="relative h-32 md:h-40 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Price badge */}
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm">
                    <span className="text-[11px] font-body font-medium text-[#C0392B]">
                      {product.price}
                    </span>
                  </div>

                  {/* Origin badge */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/30 backdrop-blur-sm">
                    <MapPin className="w-2.5 h-2.5 text-white/80" />
                    <span className="text-[10px] text-white/90 font-body">{product.origin}</span>
                  </div>
                </div>

                {/* Product info */}
                <div className="p-3 md:p-4 flex-1 flex flex-col">
                  <h3 className="font-display text-sm md:text-base text-[#2D2A26]/80 mb-0.5">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-[#2D2A26]/30 font-body mb-2">
                    {product.subtitle}
                  </p>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {product.certification.slice(0, 2).map(cert => (
                      <span
                        key={cert}
                        className="px-1.5 py-0.5 text-[9px] font-body rounded bg-[#1B7A4E]/[0.06] text-[#1B7A4E]/60"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product detail modal */}
        <AnimatePresence>
          {selectedProduct && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                onClick={() => { setSelectedProduct(null); setShowQR(false); }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-[10vh] md:top-[15vh] md:w-[420px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[80vh] overflow-y-auto"
              >
                {/* Close button */}
                <button
                  onClick={() => { setSelectedProduct(null); setShowQR(false); }}
                  className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#2D2A26]/40 hover:text-[#2D2A26]/70 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Product hero */}
                <div className="relative h-48">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="px-5 pb-5 -mt-4 relative">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-xl text-[#2D2A26]/85 mb-0.5">
                        {selectedProduct.name}
                      </h3>
                      <p className="text-[11px] text-[#2D2A26]/30 font-body">
                        {selectedProduct.subtitle}
                      </p>
                    </div>
                    <span className="text-lg font-display text-[#C0392B]/80">
                      {selectedProduct.price}
                    </span>
                  </div>

                  <p className="text-[12px] text-[#2D2A26]/45 font-body leading-relaxed mb-4">
                    {selectedProduct.description}
                  </p>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selectedProduct.certification.map(cert => (
                      <span
                        key={cert}
                        className="flex items-center gap-1 px-2 py-1 text-[10px] font-body rounded-md bg-[#1B7A4E]/[0.06] text-[#1B7A4E]/60"
                      >
                        <Star className="w-2.5 h-2.5" />
                        {cert}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <a
                      href={selectedProduct.shopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1B7A4E] text-white text-sm font-body hover:bg-[#1B7A4E]/90 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      去{selectedProduct.shopName}购买
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowQR(!showQR);
                      }}
                      className="w-10 h-10 rounded-xl border border-[#2D2A26]/[0.08] flex items-center justify-center text-[#2D2A26]/40 hover:text-[#2D2A26]/60 hover:bg-[#2D2A26]/[0.03] transition-colors"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>

                  {/* QR Code area */}
                  <AnimatePresence>
                    {showQR && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-4 rounded-xl bg-[#2D2A26]/[0.02] border border-[#2D2A26]/[0.05] text-center">
                          {/* QR code placeholder using API */}
                          <div className="w-32 h-32 mx-auto mb-2 rounded-lg overflow-hidden bg-white p-2 shadow-sm">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(selectedProduct.shopUrl)}`}
                              alt="扫码购买"
                              className="w-full h-full"
                            />
                          </div>
                          <p className="text-[11px] text-[#2D2A26]/35 font-body">
                            扫描二维码，手机端直接购买
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Link to map site */}
                  <button
                    onClick={() => {
                      handleSiteClick(selectedProduct.siteId);
                      setSelectedProduct(null);
                      setShowQR(false);
                    }}
                    className="w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-xl bg-[#2D2A26]/[0.03] text-[#2D2A26]/40 text-[12px] font-body hover:bg-[#2D2A26]/[0.06] transition-colors"
                  >
                    <MapPin className="w-3 h-3" />
                    在地图上查看产地
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
