/*
 * HeroSection - 全屏沉浸式入口
 * 手绘水墨风格的湖南农耕全景，稻穗微动画
 * 暖色调：稻穗金 + 大地赭
 */

import { motion } from "framer-motion";
import { IMAGES, CATEGORY_CONFIG } from "@/lib/data";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onExplore: () => void;
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with parallax */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.heroBanner}
          alt="湖南农耕文化全景"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0E3]/60 via-transparent to-[#F5F0E3]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D2A26]/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-16 lg:px-24">
        {/* Top decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="h-[2px] bg-[#8B6914] mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-body text-sm md:text-base tracking-[0.3em] text-[#5C3D1E] mb-4 uppercase"
        >
          Hunan Agricultural Heritage Digital Map
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-[#2D2A26] leading-tight mb-6"
        >
          <span className="block">湖南省</span>
          <span className="block text-[#8B6914]">农耕文化地图</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-heading text-lg md:text-xl text-[#5C3D1E]/80 max-w-lg mb-12 leading-relaxed"
        >
          万年稻源 · 当代粮仓 · 红色农魂
          <br />
          <span className="text-base text-[#5C3D1E]/60">
            一粒稻的万年旅程，湖湘农耕文明的时空对话
          </span>
        </motion.p>

        {/* Explore Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExplore}
          className="group relative px-10 py-4 border-2 border-[#8B6914] text-[#8B6914] font-heading text-lg tracking-wider hover:bg-[#8B6914] hover:text-[#F5F0E3] transition-all duration-500"
        >
          <span className="relative z-10">探索地图</span>
          <div className="absolute inset-0 bg-[#8B6914] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          <span className="relative z-10 group-hover:text-[#F5F0E3] transition-colors duration-500">
          </span>
        </motion.button>

        {/* Three color indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex gap-6 mt-12"
        >
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <span className="text-xs text-[#5C3D1E]/70 font-body">
                {config.label} {config.count}处
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={onExplore}
      >
        <span className="text-xs tracking-[0.2em] text-[#5C3D1E]/50 font-body">
          向下探索
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-[#8B6914]/60" />
        </motion.div>
      </motion.div>

      {/* Decorative rice stalk SVG in corner */}
      <div className="absolute top-8 right-8 opacity-20">
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
          <path d="M30 120V20" stroke="#8B6914" strokeWidth="1.5" />
          <ellipse cx="30" cy="15" rx="8" ry="15" fill="#8B6914" opacity="0.3" className="animate-rice-wave" style={{ transformOrigin: "30px 30px" }} />
          <ellipse cx="20" cy="30" rx="6" ry="12" fill="#8B6914" opacity="0.25" className="animate-rice-wave" style={{ transformOrigin: "20px 42px", animationDelay: "0.5s" }} />
          <ellipse cx="40" cy="35" rx="6" ry="12" fill="#8B6914" opacity="0.25" className="animate-rice-wave" style={{ transformOrigin: "40px 47px", animationDelay: "1s" }} />
        </svg>
      </div>
    </section>
  );
}
