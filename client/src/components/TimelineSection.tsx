/*
 * TimelineSection - 时间轴叙事
 * "一粒稻的万年旅程" 时间线
 * 从史前到现代的农耕文明演进
 */

import { motion } from "framer-motion";
import { SITES, IMAGES, type FarmingSite } from "@/lib/data";

interface TimelineSectionProps {
  onSiteSelect: (site: FarmingSite) => void;
}

const TIMELINE_EVENTS = [
  {
    era: "史前时代",
    year: "1.4万年前",
    title: "稻作起源",
    description: "玉蟾岩遗址发现世界最早人工栽培稻，湖湘大地成为人类稻作文明的摇篮",
    siteId: "yuchanyan",
    image: IMAGES.yuchanyan,
    color: "#8B6914",
  },
  {
    era: "新石器时代",
    year: "9000年前",
    title: "农耕萌芽",
    description: "彭头山遗址出土大量稻谷遗存，稻作农业在长江中游初步形成",
    siteId: "pengtoushan",
    image: IMAGES.ancientFarming,
    color: "#8B6914",
  },
  {
    era: "新石器时代",
    year: "6000年前",
    title: "古城稻田",
    description: "城头山建起中国最早的古城，城内水稻田遗迹见证了农业文明的飞跃",
    siteId: "chengtoushan",
    image: IMAGES.chengtoushan,
    color: "#8B6914",
  },
  {
    era: "秦汉时期",
    year: "2000年前",
    title: "梯田奇迹",
    description: "紫鹊界梯田开垦始于秦汉，独创无坝引水自流灌溉系统",
    siteId: "ziquejie",
    image: IMAGES.ziquejie,
    color: "#8B6914",
  },
  {
    era: "近代革命",
    year: "1927年",
    title: "红色农魂",
    description: "毛泽东回乡考察农民运动，写下《湖南农民运动考察报告》",
    siteId: "shaoshan",
    image: IMAGES.shaoshan,
    color: "#C0392B",
  },
  {
    era: "现代科技",
    year: "1964年",
    title: "杂交水稻",
    description: "袁隆平在安江农校发现天然雄性不育株，开启杂交水稻研究",
    siteId: "anjiang",
    image: IMAGES.anjiangRice,
    color: "#1B7A4E",
  },
  {
    era: "新时代",
    year: "2013年",
    title: "精准扶贫",
    description: "十八洞村成为精准扶贫首倡地，开创乡村振兴新篇章",
    siteId: "beautiful_village",
    image: IMAGES.beautifulVillage,
    color: "#C0392B",
  },
  {
    era: "智慧时代",
    year: "2020年代",
    title: "智慧农业",
    description: "无人机、物联网、AI赋能现代农业，湖南引领农业数字化转型",
    siteId: "dongting_modern",
    image: IMAGES.modernAgriculture,
    color: "#1B7A4E",
  },
];

export default function TimelineSection({ onSiteSelect }: TimelineSectionProps) {
  return (
    <section className="py-20 bg-[#F5F0E3] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-[1px] w-12 bg-[#8B6914]" />
            <span className="text-xs tracking-[0.3em] text-[#8B6914] font-body uppercase">
              Timeline
            </span>
            <div className="h-[1px] w-12 bg-[#8B6914]" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[#2D2A26] mb-3">
            一粒稻的万年旅程
          </h2>
          <p className="font-body text-[#5C3D1E]/60 max-w-2xl mx-auto">
            从远古的第一粒栽培稻到今天的智慧农田，追溯湖湘农耕文明的时空演进
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#8B6914] via-[#C0392B] to-[#1B7A4E] hidden md:block" />
          {/* Mobile left line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#8B6914] via-[#C0392B] to-[#1B7A4E] md:hidden" />

          {TIMELINE_EVENTS.map((event, index) => {
            const isLeft = index % 2 === 0;
            const site = SITES.find(s => s.id === event.siteId);

            return (
              <motion.div
                key={event.year + event.title}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-start mb-12 md:mb-16 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-2 border-[#F5F0E3] -translate-x-1/2 z-10 shadow-md"
                  style={{ backgroundColor: event.color }}
                />

                {/* Content card */}
                <div className={`ml-14 md:ml-0 ${isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"} md:w-[45%] w-full`}>
                  <div
                    className="group bg-white/60 backdrop-blur-sm border border-[#8B6914]/10 p-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    onClick={() => site && onSiteSelect(site)}
                  >
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                      {/* Era badge */}
                      <div className="absolute top-3 left-3 px-2 py-0.5 text-[10px] text-white font-body tracking-wider" style={{ backgroundColor: event.color }}>
                        {event.era}
                      </div>
                    </div>

                    <div className="p-5">
                      {/* Year */}
                      <div className="font-display text-2xl mb-1" style={{ color: event.color }}>
                        {event.year}
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-lg text-[#2D2A26] mb-2">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#5C3D1E]/70 font-body leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
