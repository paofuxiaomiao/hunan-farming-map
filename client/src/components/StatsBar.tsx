/*
 * StatsBar - 数据概览横条
 * 展示核心统计数据，使用滚动计数动画
 * 稻穗金装饰线条
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { STATS } from "@/lib/data";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (progress >= 1) {
        setDisplay(value);
      } else {
        setDisplay(Math.floor(eased * value));
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

export default function StatsBar() {
  const stats = [
    { label: "文化点位", value: STATS.totalSites, suffix: "处", icon: "📍", color: "#D4A76A" },
    { label: "古代遗址", value: STATS.ancientSites, suffix: "处", icon: "🏛️", color: "#8B6914" },
    { label: "现代地标", value: STATS.modernSites, suffix: "处", icon: "🌾", color: "#1B7A4E" },
    { label: "红色旧址", value: STATS.redSites, suffix: "处", icon: "🚩", color: "#C0392B" },
    { label: "历史跨度", value: 14000, suffix: "年+", icon: "⏳", color: "#D4A76A" },
  ];

  return (
    <section className="relative py-10 bg-[#2D2A26] overflow-hidden">
      {/* Decorative top border - tricolor */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8B6914] via-[#1B7A4E] to-[#C0392B]" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #D4A76A 0, #D4A76A 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px"
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center relative group"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg"
                style={{ backgroundColor: stat.color }}
              />

              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="font-display text-3xl md:text-4xl mb-1" style={{ color: stat.color }}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-[#D4A76A]/50 tracking-wider font-body">
                {stat.label}
              </div>

              {/* Separator line (not on last item) */}
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-[#D4A76A]/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A76A]/30 to-transparent" />
    </section>
  );
}
