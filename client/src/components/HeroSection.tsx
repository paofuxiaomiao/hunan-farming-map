/*
 * HeroSection - 极简光感入口
 * 白色发光背景 + Three.js 3D稻田摇曳
 * 大留白、强对比、视觉冲击
 */

import { motion } from "framer-motion";
import { CATEGORY_CONFIG } from "@/lib/data";
import { ChevronDown } from "lucide-react";
import { lazy, Suspense } from "react";

const RiceField3D = lazy(() => import("@/components/RiceField3D"));

interface HeroSectionProps {
  onExplore: () => void;
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* Three.js 3D 稻田背景 */}
      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="w-full h-full" style={{
              background: "linear-gradient(180deg, #ffffff 0%, #fefcf5 40%, #faf5e8 80%, #f5edd5 100%)"
            }} />
          }
        >
          <RiceField3D className="w-full h-full" />
        </Suspense>
      </div>

      {/* 顶部白色渐隐 - 增强发光感 */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white via-white/80 to-transparent z-[1]" />

      {/* 底部白色渐隐 */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/60 to-transparent z-[1]" />

      {/* 内容层 */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        {/* 英文副标题 */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-body text-[10px] md:text-xs tracking-[0.5em] text-[#2D2A26]/30 mb-8 uppercase"
        >
          Hunan Agricultural Heritage Digital Map
        </motion.p>

        {/* 主标题 - 极大字号，视觉冲击 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display leading-none mb-6"
        >
          <span className="block text-6xl md:text-8xl lg:text-[10rem] font-bold text-[#2D2A26]/90 tracking-tight">
            农耕文化
          </span>
          <span className="block text-4xl md:text-5xl lg:text-7xl text-[#b8960c]/70 mt-2 tracking-[0.15em]">
            数字地图
          </span>
        </motion.h1>

        {/* 分隔线 */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 1, delay: 1 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#b8960c]/40 to-transparent mb-6"
        />

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-heading text-base md:text-lg text-[#2D2A26]/40 tracking-[0.2em] mb-4"
        >
          万年稻源 · 当代粮仓 · 红色农魂
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="font-body text-sm text-[#2D2A26]/25 max-w-md leading-relaxed mb-12"
        >
          湖南省 109 处农耕文化地标的时空对话
        </motion.p>

        {/* 探索按钮 - 极简 */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onExplore}
          className="group relative px-12 py-4 bg-[#2D2A26]/90 text-white font-body text-sm tracking-[0.3em] uppercase hover:bg-[#2D2A26] transition-all duration-500 overflow-hidden"
        >
          <span className="relative z-10">探索地图</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#b8960c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
              <span className="text-[10px] text-[#2D2A26]/30 font-body tracking-wider">
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
          <ChevronDown className="w-4 h-4 text-[#2D2A26]/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
