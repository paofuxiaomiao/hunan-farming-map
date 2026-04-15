/*
 * Footer - 页脚
 * 包含项目信息、数据来源说明
 * 稻穗纹样装饰
 */

import { IMAGES, CATEGORY_CONFIG } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative bg-[#2D2A26] text-[#D4A76A]/60 overflow-hidden">
      {/* Artistic map background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <img
          src={IMAGES.hunanMapArtistic}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top border */}
      <div className="h-[2px] bg-gradient-to-r from-[#8B6914] via-[#1B7A4E] to-[#C0392B]" />

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#8B6914] flex items-center justify-center">
                <span className="text-[#F5F0E3] font-display text-lg">湘</span>
              </div>
              <div>
                <div className="font-heading text-lg text-[#F5F0E3]">湖南省农耕文化地图</div>
                <div className="text-xs text-[#D4A76A]/40 tracking-wider font-body">
                  HUNAN FARMING HERITAGE MAP
                </div>
              </div>
            </div>
            <p className="text-sm font-body leading-relaxed text-[#D4A76A]/50">
              融合历史、现代与红色基因，全国首张省级农耕文化数字地图。
              通过数字孪生技术，实现"万年稻源—当代粮仓—红色农魂"的时空对话。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-sm text-[#D4A76A] mb-4 tracking-wider">
              主题线路
            </h4>
            <div className="space-y-3">
              {[
                { name: "农耕文明探源", key: "ancient" as const, suffix: "处遗址" },
                { name: "数字农旅体验", key: "modern" as const, suffix: "处地标" },
                { name: "红色农事教育", key: "red" as const, suffix: "处旧址" },
              ].map(route => {
                const config = CATEGORY_CONFIG[route.key];
                return (
                  <div key={route.name} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
                    <span className="text-sm font-body">{route.name}</span>
                    <span className="text-xs text-[#D4A76A]/30 ml-auto">{config.count}{route.suffix}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-heading text-sm text-[#D4A76A] mb-4 tracking-wider">
              数据说明
            </h4>
            <p className="text-xs font-body leading-relaxed text-[#D4A76A]/40">
              本地图数据基于《湖南省农耕文化地图》总体方案讨论稿（2025年7月）整理。
              共整合109处点位经纬度坐标，涵盖14个市州。
              支持中英双语，服务国家文化战略。
            </p>
            <div className="mt-4 flex gap-4">
              <div className="text-center">
                <div className="font-display text-2xl text-[#D4A76A]">109</div>
                <div className="text-[10px] text-[#D4A76A]/40">文化点位</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl text-[#D4A76A]">14</div>
                <div className="text-[10px] text-[#D4A76A]/40">市州覆盖</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl text-[#D4A76A]">3</div>
                <div className="text-[10px] text-[#D4A76A]/40">世界遗产</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[#D4A76A]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-body text-[#D4A76A]/30">
            湖南省农耕文化地图 · 万年稻源 · 当代粮仓 · 红色农魂
          </p>
          <p className="text-xs font-body text-[#D4A76A]/20">
            设计规划基于《湖南省农耕文化地图》总体方案讨论稿
          </p>
        </div>
      </div>
    </footer>
  );
}
