/*
 * TimelineSection - 极简时间轴叙事
 * 白色背景，大留白，精致排版
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
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl text-[#2D2A26]/90 mb-3">
            一粒稻的万年旅程
          </h2>
          <p className="font-body text-sm text-[#2D2A26]/30 max-w-md mx-auto">
            从远古的第一粒栽培稻到今天的智慧农田
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#8B6914]/20 via-[#C0392B]/20 to-[#1B7A4E]/20 hidden md:block" />
          {/* Left line - mobile */}
          <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#8B6914]/20 via-[#C0392B]/20 to-[#1B7A4E]/20 md:hidden" />

          {TIMELINE_EVENTS.map((event, index) => {
            const isLeft = index % 2 === 0;
            const site = SITES.find(s => s.id === event.siteId);

            return (
              <motion.div
                key={event.year + event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-start mb-16 md:mb-20 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10 border-2 border-white shadow-sm"
                  style={{ backgroundColor: event.color }}
                />

                {/* Content card */}
                <div className={`ml-12 md:ml-0 ${isLeft ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"} md:w-[44%] w-full`}>
                  <div
                    className="group bg-white rounded-2xl overflow-hidden border border-[#2D2A26]/[0.04] hover:shadow-lg transition-all duration-500 cursor-pointer"
                    onClick={() => site && onSiteSelect(site)}
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                      {/* Era badge */}
                      <div
                        className="absolute top-3 left-3 px-2 py-0.5 text-[10px] text-white font-body tracking-wider rounded"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.era}
                      </div>
                    </div>

                    <div className="p-5">
                      {/* Year */}
                      <div className="font-display text-2xl mb-1 font-light" style={{ color: event.color }}>
                        {event.year}
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-lg text-[#2D2A26]/80 mb-2">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#2D2A26]/40 font-body leading-relaxed">
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
