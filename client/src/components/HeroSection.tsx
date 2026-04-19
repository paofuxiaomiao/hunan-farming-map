/*
 * HeroSection - 极简光感入口
 * 支持背景切换：Three.js 3D稻田 / 水墨画Banner / 自定义图片
 * 右下角浮动切换按钮，方便对比效果
 */

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORY_CONFIG, IMAGES } from "@/lib/data";
import { ChevronDown, Image, Layers, Upload, Check, X } from "lucide-react";
import { lazy, Suspense } from "react";

const RiceField3D = lazy(() => import("@/components/RiceField3D"));

type BgMode = "3d" | "banner" | "custom";

interface BgOption {
  id: BgMode;
  label: string;
  icon: typeof Layers;
  description: string;
}

const BG_OPTIONS: BgOption[] = [
  { id: "3d", label: "3D稻田", icon: Layers, description: "Three.js 金色稻穗动态摇曳" },
  { id: "banner", label: "水墨画", icon: Image, description: "水墨风农耕文化长卷" },
  { id: "custom", label: "自定义", icon: Upload, description: "上传自定义背景图片" },
];

// Pre-defined banner image (user-uploaded watercolor)
const BANNER_IMAGE = IMAGES.heroBanner;

interface HeroSectionProps {
  onExplore: () => void;
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  const [bgMode, setBgMode] = useState<BgMode>("3d");
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [showSwitcher, setShowSwitcher] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCustomImage(ev.target?.result as string);
        setBgMode("custom");
        setShowSwitcher(false);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSelectMode = useCallback((mode: BgMode) => {
    if (mode === "custom" && !customImage) {
      fileInputRef.current?.click();
      return;
    }
    setBgMode(mode);
    setShowSwitcher(false);
  }, [customImage]);

  // Determine if background is dark (for text contrast)
  const isDarkBg = bgMode === "banner" || bgMode === "custom";
  const textColor = isDarkBg ? "text-white" : "text-[#2D2A26]";
  const textOpacity90 = isDarkBg ? "text-white/90" : "text-[#2D2A26]/90";
  const textOpacity70 = isDarkBg ? "text-white/70" : "text-[#b8960c]/70";
  const textOpacity40 = isDarkBg ? "text-white/50" : "text-[#2D2A26]/40";
  const textOpacity30 = isDarkBg ? "text-white/40" : "text-[#2D2A26]/30";
  const textOpacity25 = isDarkBg ? "text-white/35" : "text-[#2D2A26]/25";
  const textOpacity20 = isDarkBg ? "text-white/30" : "text-[#2D2A26]/20";
  const lineColor = isDarkBg ? "via-white/40" : "via-[#b8960c]/40";
  const btnBg = isDarkBg ? "bg-white/90 text-[#2D2A26]/90 hover:bg-white" : "bg-[#2D2A26]/90 text-white hover:bg-[#2D2A26]";
  const btnGlow = isDarkBg ? "from-white/20" : "from-[#b8960c]/20";

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* Background layer */}
      <AnimatePresence mode="wait">
        {bgMode === "3d" && (
          <motion.div
            key="3d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Suspense
              fallback={
                <div className="w-full h-full" style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #fefcf5 40%, #faf5e8 80%, #f5edd5 100%)"
                }} />
              }
            >
              <RiceField3D className="w-full h-full" />
            </Suspense>
          </motion.div>
        )}

        {bgMode === "banner" && (
          <motion.div
            key="banner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={BANNER_IMAGE}
              alt="水墨农耕长卷"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {bgMode === "custom" && customImage && (
          <motion.div
            key="custom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={customImage}
              alt="自定义背景"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for image backgrounds */}
      {isDarkBg && (
        <div className="absolute inset-0 bg-black/30 z-[1]" />
      )}

      {/* 顶部渐隐 */}
      <div className={`absolute inset-x-0 top-0 h-48 z-[2] ${
        isDarkBg
          ? "bg-gradient-to-b from-black/40 via-black/10 to-transparent"
          : "bg-gradient-to-b from-white via-white/80 to-transparent"
      }`} />

      {/* 底部渐隐 */}
      <div className={`absolute inset-x-0 bottom-0 h-64 z-[2] ${
        isDarkBg
          ? "bg-gradient-to-t from-black/50 via-black/10 to-transparent"
          : "bg-gradient-to-t from-white via-white/60 to-transparent"
      }`} />

      {/* 内容层 */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        {/* 英文副标题 */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`font-body text-[10px] md:text-xs tracking-[0.5em] ${textOpacity30} mb-8 uppercase`}
        >
          Hunan Agricultural Heritage Digital Map
        </motion.p>

        {/* 主标题 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display leading-none mb-6"
        >
          <span className={`block text-6xl md:text-8xl lg:text-[10rem] font-bold ${textOpacity90} tracking-tight ${isDarkBg ? "drop-shadow-lg" : ""}`}>
            农耕文化
          </span>
          <span className={`block text-4xl md:text-5xl lg:text-7xl ${textOpacity70} mt-2 tracking-[0.15em] ${isDarkBg ? "drop-shadow-md" : ""}`}>
            数字地图
          </span>
        </motion.h1>

        {/* 分隔线 */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 1, delay: 1 }}
          className={`h-[1px] bg-gradient-to-r from-transparent ${lineColor} to-transparent mb-6`}
        />

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className={`font-heading text-base md:text-lg ${textOpacity40} tracking-[0.2em] mb-4`}
        >
          万年稻源 · 当代粮仓 · 红色农魂
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className={`font-body text-sm ${textOpacity25} max-w-md leading-relaxed mb-12`}
        >
          湖南省 109 处农耕文化地标的时空对话
        </motion.p>

        {/* 探索按钮 */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onExplore}
          className={`group relative px-12 py-4 ${btnBg} font-body text-sm tracking-[0.3em] uppercase transition-all duration-500 overflow-hidden`}
        >
          <span className="relative z-10">探索地图</span>
          <div className={`absolute inset-0 bg-gradient-to-r ${btnGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        </motion.button>

        {/* 三色指示器 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex gap-8 mt-16"
        >
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <span className={`text-[10px] ${textOpacity30} font-body tracking-wider`}>
                {config.label} {config.count}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 向下滚动指示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={onExplore}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className={`w-4 h-4 ${textOpacity20}`} />
        </motion.div>
      </motion.div>

      {/* ═══ 背景切换器 ═══ */}
      <div className="absolute bottom-24 right-4 md:bottom-8 md:right-8 z-20">
        {/* Toggle button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSwitcher(!showSwitcher)}
          className={`w-10 h-10 md:w-11 md:h-11 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            showSwitcher
              ? "bg-[#2D2A26] text-white"
              : isDarkBg
                ? "bg-white/80 backdrop-blur-md text-[#2D2A26]/70 hover:bg-white"
                : "bg-[#2D2A26]/10 backdrop-blur-md text-[#2D2A26]/50 hover:bg-[#2D2A26]/15"
          }`}
          title="切换背景"
        >
          {showSwitcher ? <X className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
        </motion.button>

        {/* Switcher panel */}
        <AnimatePresence>
          {showSwitcher && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-14 right-0 w-56 md:w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/15 border border-[#2D2A26]/[0.06] overflow-hidden"
            >
              <div className="px-3 py-2.5 border-b border-[#2D2A26]/[0.05]">
                <p className="text-[10px] text-[#2D2A26]/40 font-body tracking-wider uppercase">
                  切换背景
                </p>
              </div>

              <div className="p-2">
                {BG_OPTIONS.map((option) => {
                  const isActive = bgMode === option.id;
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectMode(option.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                        isActive
                          ? "bg-[#8B6914]/10"
                          : "hover:bg-[#2D2A26]/[0.03]"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-[#8B6914]/20 text-[#8B6914]"
                          : "bg-[#2D2A26]/[0.04] text-[#2D2A26]/30"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[12px] font-body font-medium ${
                            isActive ? "text-[#8B6914]" : "text-[#2D2A26]/60"
                          }`}>
                            {option.label}
                          </span>
                          {isActive && (
                            <Check className="w-3 h-3 text-[#8B6914]" />
                          )}
                        </div>
                        <span className="text-[10px] text-[#2D2A26]/30 font-body line-clamp-1">
                          {option.description}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* Upload custom image button */}
                {customImage && bgMode !== "custom" && (
                  <button
                    onClick={() => { setBgMode("custom"); setShowSwitcher(false); }}
                    className="w-full mt-1 flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-[#2D2A26]/[0.03] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                      <img src={customImage} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] text-[#2D2A26]/40 font-body">使用已上传图片</span>
                  </button>
                )}

                {/* Re-upload */}
                {customImage && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full mt-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] text-[#2D2A26]/30 font-body hover:bg-[#2D2A26]/[0.03] transition-all"
                  >
                    <Upload className="w-3 h-3" />
                    重新上传图片
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </section>
  );
}
