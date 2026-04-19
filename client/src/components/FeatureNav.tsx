/*
 * FeatureNav - 功能导航模块
 * 白色光感极简风格 · 卡片式功能入口
 * 参考设计：图片背景+暗角渐变+白色文字+图标
 */

import { motion } from "framer-motion";
import { Map, BookOpen, CalendarDays, ShoppingBag, Route } from "lucide-react";
import { IMAGES } from "@/lib/data";

interface FeatureNavProps {
  onNavigate: (section: string) => void;
}

const FEATURES = [
  {
    id: "map",
    title: "农耕文化一览",
    subtitle: "109处文化地标 · 三色图层",
    icon: Map,
    image: IMAGES.hunanMapArtistic,
    span: "full", // full width
    gradient: "from-[#2D2A26]/70 via-[#2D2A26]/30 to-transparent",
  },
  {
    id: "routes",
    title: "体验路线推荐",
    subtitle: "三条主题路线",
    icon: Route,
    image: IMAGES.ziquejie,
    span: "half",
    gradient: "from-[#1B7A4E]/60 via-[#1B7A4E]/20 to-transparent",
  },
  {
    id: "study",
    title: "研学路线推荐",
    subtitle: "农耕文明探源",
    icon: BookOpen,
    image: IMAGES.chengtoushan,
    span: "half",
    gradient: "from-[#8B6914]/60 via-[#8B6914]/20 to-transparent",
  },
  {
    id: "calendar",
    title: "农事日历",
    subtitle: "红色农事时间轴",
    icon: CalendarDays,
    image: IMAGES.shaoshan,
    span: "half",
    gradient: "from-[#C0392B]/60 via-[#C0392B]/20 to-transparent",
  },
  {
    id: "shop",
    title: "扫一扫购农遗",
    subtitle: "地标农产品直购",
    icon: ShoppingBag,
    image: IMAGES.nanxianShrimp,
    span: "half",
    gradient: "from-[#1B7A4E]/60 via-[#1B7A4E]/20 to-transparent",
  },
];

export default function FeatureNav({ onNavigate }: FeatureNavProps) {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white via-[#FDFBF7] to-white">
      <div className="container max-w-5xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-[10px] text-[#2D2A26]/25 font-body tracking-[0.3em] uppercase mb-3">
            FEATURE NAVIGATION
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-[#2D2A26]/85 mb-3">
            功能导航
          </h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#8B6914]/30 to-transparent mx-auto mb-3" />
          <p className="text-sm text-[#2D2A26]/40 font-body max-w-md mx-auto">
            探索湖南农耕文化的多种方式
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {FEATURES.map((feature, index) => (
            <motion.button
              key={feature.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(feature.id)}
              className={`relative overflow-hidden rounded-xl md:rounded-2xl group text-left ${
                feature.span === "full" ? "col-span-2 h-44 md:h-56" : "col-span-1 h-36 md:h-44"
              }`}
            >
              {/* Background image */}
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient}`} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <feature.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                  </div>
                </div>
                <h3 className="font-display text-base md:text-lg text-white font-medium leading-tight mb-0.5">
                  {feature.title}
                </h3>
                <p className="text-[11px] md:text-xs text-white/60 font-body">
                  {feature.subtitle}
                </p>
              </div>

              {/* Hover arrow indicator */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
