/*
 * StatsBar - 极简数据概览
 * 白色背景，大数字，轻量排版
 */

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const STATS_DATA = [
  { value: 109, suffix: "", label: "文化点位", color: "#2D2A26" },
  { value: 43, suffix: "", label: "古代遗址", color: "#8B6914" },
  { value: 55, suffix: "", label: "现代地标", color: "#1B7A4E" },
  { value: 11, suffix: "", label: "红色旧址", color: "#C0392B" },
  { value: 14000, suffix: "+", label: "年历史跨度", color: "#b8960c" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
            else setCurrent(target);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const display = target >= 10000
    ? (current / 10000).toFixed(current === target ? 1 : 1)
    : current.toString();
  const unit = target >= 10000 ? "万" : "";

  return (
    <span ref={ref} className="tabular-nums">
      {display}{unit}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="relative py-20 bg-white">
      {/* 顶部极细分隔线 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#2D2A26]/10 to-transparent" />

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {STATS_DATA.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center group"
            >
              <div
                className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-2 transition-all duration-500 group-hover:scale-105"
                style={{ color: stat.color }}
              >
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[11px] text-[#2D2A26]/30 font-body tracking-[0.2em] uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 底部极细分隔线 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#2D2A26]/10 to-transparent" />
    </section>
  );
}
