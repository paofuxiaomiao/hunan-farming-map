/*
 * FarmingCalendar - 农事日历
 * 白色光感极简风格 · 红色农事点位关联历史农事时间节点
 * 增强历史代入感，标注关键农运事件
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, ChevronDown, Sprout } from "lucide-react";
import { SITES, CATEGORY_CONFIG, type FarmingSite } from "@/lib/data";

interface FarmingCalendarProps {
  onSiteSelect: (site: FarmingSite) => void;
}

interface CalendarEvent {
  id: string;
  date: string;
  lunarDate?: string;
  title: string;
  description: string;
  siteId: string;
  season: "spring" | "summer" | "autumn" | "winter";
  farmingActivity?: string;
  historicalNote?: string;
}

const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "evt1",
    date: "1927年1月4日",
    lunarDate: "丁卯年腊月初一",
    title: "毛泽东考察湖南农民运动",
    description: "毛泽东从长沙出发，历时32天，考察了湘潭、湘乡、衡山、醴陵、长沙五县农民运动，写下了著名的《湖南农民运动考察报告》。",
    siteId: "shaoshan",
    season: "winter",
    farmingActivity: "冬季备耕 · 翻土蓄肥",
    historicalNote: "考察期间正值冬耕备春之际，毛泽东深入田间地头，与农民同吃同住，亲眼目睹农民运动的磅礴力量。",
  },
  {
    id: "evt2",
    date: "1927年3月",
    lunarDate: "丁卯年二月",
    title: "醴陵先农坛农民大会",
    description: "左权等共产党人在醴陵先农坛组织农民协会，召开万人农民大会，开展减租减息斗争。",
    siteId: "liling_xiannongtan_relic",
    season: "spring",
    farmingActivity: "春耕播种 · 浸种催芽",
    historicalNote: "先农坛原为祭祀先农之所，大革命时期成为醴陵农运策源地，农民在此宣誓'耕者有其田'。",
  },
  {
    id: "evt3",
    date: "1927年9月9日",
    lunarDate: "丁卯年八月十四",
    title: "秋收起义打响第一枪",
    description: "毛泽东领导的秋收起义在湘赣边界打响，起义以农民为主体，打出了工农革命军的旗帜。",
    siteId: "qiusc",
    season: "autumn",
    farmingActivity: "秋收时节 · 稻谷归仓",
    historicalNote: "起义选在秋收时节，寓意深远——正是农民最能感受丰收与剥削矛盾的时刻，'秋收'二字既是季节，也是革命的号角。",
  },
  {
    id: "evt4",
    date: "1928年1月",
    lunarDate: "戊辰年腊月",
    title: "湘南暴动 · 农民武装起义",
    description: "朱德、陈毅领导湘南暴动，在宜章打响第一枪，组织农民协会、分配土地、建立红色政权。",
    siteId: "southern_hunan_uprising_hq",
    season: "winter",
    farmingActivity: "冬闲整地 · 修缮农具",
    historicalNote: "暴动期间，农民将自家粮食送给起义军，'打土豪、分田地'的口号响彻湘南大地。",
  },
  {
    id: "evt5",
    date: "1934年11月",
    lunarDate: "甲戌年十月",
    title: "红军长征过通道 · 侗乡送粮",
    description: "中央红军长征途经通道，侗族群众冒着生命危险为红军筹粮送粮，军民鱼水情深。",
    siteId: "tongdao",
    season: "autumn",
    farmingActivity: "晚稻收割 · 冬储备粮",
    historicalNote: "通道转兵会议在此召开，改变了红军的命运。侗族农民将刚收获的稻谷和腊肉送给红军，留下了'红军粮'的动人故事。",
  },
  {
    id: "evt6",
    date: "1935年11月19日",
    lunarDate: "乙亥年十月廿四",
    title: "红二方面军从桑植出发长征",
    description: "红二、六军团从桑植刘家坪出发开始长征，当地百姓节衣缩食，将自家粮食送入军粮仓。",
    siteId: "sangzhi_granary",
    season: "winter",
    farmingActivity: "冬季储粮 · 备战备荒",
    historicalNote: "桑植百姓倾其所有支援红军，'最后一碗米送去做军粮，最后一尺布送去做军装'的精神在此传唱。",
  },
  {
    id: "evt7",
    date: "1961年4月",
    lunarDate: "辛丑年三月",
    title: "刘少奇回乡调查44天",
    description: "刘少奇回到花明楼故乡，深入农村调查44天，了解大跃进后农村真实情况，为纠正错误提供重要依据。",
    siteId: "huaminglou",
    season: "spring",
    farmingActivity: "春耕大忙 · 插秧育苗",
    historicalNote: "调查期间正值春耕，刘少奇与农民一起下田插秧，亲眼看到了浮夸风带来的严重后果，写下了大量调查笔记。",
  },
  {
    id: "evt8",
    date: "1934年11月",
    lunarDate: "甲戌年十月",
    title: "半条被子的温暖 · 沙洲村",
    description: "三位女红军在汝城沙洲村借宿，临走时将仅有的一条被子剪下一半留给村民徐解秀。",
    siteId: "shazhou_half_quilt_story",
    season: "autumn",
    farmingActivity: "秋收冬藏 · 晒谷入仓",
    historicalNote: "'什么是共产党？共产党就是自己有一条被子，也要剪下半条给老百姓的人。'这个故事成为军民鱼水情的永恒象征。",
  },
];

const SEASON_CONFIG = {
  spring: { label: "春", color: "#4ECDC4", bg: "rgba(78, 205, 196, 0.08)", icon: "🌱" },
  summer: { label: "夏", color: "#E8A838", bg: "rgba(232, 168, 56, 0.08)", icon: "☀️" },
  autumn: { label: "秋", color: "#D4A76A", bg: "rgba(212, 167, 106, 0.08)", icon: "🌾" },
  winter: { label: "冬", color: "#7B8FA1", bg: "rgba(123, 143, 161, 0.08)", icon: "❄️" },
};

export default function FarmingCalendar({ onSiteSelect }: FarmingCalendarProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSiteClick = (siteId: string) => {
    const site = SITES.find(s => s.id === siteId);
    if (site) onSiteSelect(site);
  };

  return (
    <section id="calendar-section" className="py-16 md:py-24 bg-gradient-to-b from-white via-[#FFF9F5] to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#C0392B]/[0.02] to-transparent" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#C0392B]/[0.02] blur-3xl" />

      <div className="container max-w-4xl mx-auto px-4 md:px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] text-[#C0392B]/40 font-body tracking-[0.3em] uppercase mb-3">
            RED FARMING CALENDAR
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-[#2D2A26]/85 mb-3">
            农事日历
          </h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C0392B]/30 to-transparent mx-auto mb-3" />
          <p className="text-sm text-[#2D2A26]/40 font-body max-w-lg mx-auto leading-relaxed">
            红色农事与农耕时令交织，每一个革命事件都发生在特定的农事节气中，
            <br className="hidden md:block" />
            革命的火种在田间地头燃起
          </p>
        </motion.div>

        {/* Season legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 md:gap-6 mb-10"
        >
          {Object.entries(SEASON_CONFIG).map(([key, config]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="text-sm">{config.icon}</span>
              <span className="text-[11px] font-body text-[#2D2A26]/40">{config.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#C0392B]/10 via-[#C0392B]/20 to-[#C0392B]/10 md:-translate-x-[0.5px]" />

          {CALENDAR_EVENTS.map((event, index) => {
            const season = SEASON_CONFIG[event.season];
            const isExpanded = expandedId === event.id;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={`relative mb-6 md:mb-8 pl-12 md:pl-0 ${
                  isLeft ? "md:pr-[52%]" : "md:pl-[52%]"
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-5 md:left-1/2 top-4 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm md:-translate-x-1/2 z-10`}
                  style={{ backgroundColor: season.color }}
                />

                {/* Season indicator on opposite side (desktop) */}
                <div className={`hidden md:flex absolute top-3 items-center gap-1.5 ${
                  isLeft ? "left-[52%] pl-6" : "right-[52%] pr-6 flex-row-reverse"
                }`}>
                  <span className="text-xs">{season.icon}</span>
                  <span className="text-[10px] font-body text-[#2D2A26]/25 tracking-wider">
                    {event.farmingActivity}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="bg-white rounded-xl border border-[#2D2A26]/[0.05] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : event.id)}
                >
                  {/* Card header */}
                  <div className="p-4 md:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        {/* Date badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="px-2 py-0.5 text-[10px] font-body rounded-md"
                            style={{ color: season.color, backgroundColor: season.bg }}
                          >
                            {event.date}
                          </span>
                          {event.lunarDate && (
                            <span className="text-[10px] text-[#2D2A26]/20 font-body">
                              {event.lunarDate}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-sm md:text-base text-[#2D2A26]/80 mb-1.5 leading-snug">
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[12px] text-[#2D2A26]/40 font-body leading-relaxed line-clamp-2">
                          {event.description}
                        </p>

                        {/* Farming activity tag (mobile) */}
                        <div className="md:hidden flex items-center gap-1.5 mt-2">
                          <Sprout className="w-3 h-3 text-[#2D2A26]/20" />
                          <span className="text-[10px] font-body text-[#2D2A26]/25">
                            {event.farmingActivity}
                          </span>
                        </div>
                      </div>

                      {/* Expand indicator */}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-6 h-6 rounded-full bg-[#2D2A26]/[0.03] flex items-center justify-center shrink-0 mt-1"
                      >
                        <ChevronDown className="w-3.5 h-3.5 text-[#2D2A26]/25" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 md:px-5 md:pb-5 border-t border-[#2D2A26]/[0.04] pt-4">
                          {/* Historical note */}
                          {event.historicalNote && (
                            <div className="mb-4 p-3 rounded-lg bg-[#C0392B]/[0.03] border border-[#C0392B]/[0.06]">
                              <p className="text-[10px] text-[#C0392B]/40 font-body tracking-wider uppercase mb-1.5">
                                历史细节
                              </p>
                              <p className="text-[12px] text-[#2D2A26]/50 font-body leading-relaxed">
                                {event.historicalNote}
                              </p>
                            </div>
                          )}

                          {/* Link to site */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSiteClick(event.siteId);
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#C0392B]/[0.05] hover:bg-[#C0392B]/[0.10] transition-colors text-[#C0392B]/70 text-[12px] font-body group"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>查看关联点位</span>
                            <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
