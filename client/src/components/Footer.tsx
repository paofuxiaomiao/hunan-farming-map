/*
 * Footer - 极简页脚
 * 白色背景，轻量信息
 */

import { CATEGORY_CONFIG } from "@/lib/data";

export default function Footer() {
  const totalSites = Object.values(CATEGORY_CONFIG).reduce((sum, c) => sum + c.count, 0);

  return (
    <footer className="py-16 bg-[#faf9f6] relative">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#2D2A26]/10 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Brand */}
        <div className="mb-8">
          <div className="w-10 h-10 rounded-full bg-[#2D2A26] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-display text-sm">湘</span>
          </div>
          <h3 className="font-display text-xl text-[#2D2A26]/80 mb-2">
            湖南省农耕文化数字地图
          </h3>
          <p className="text-xs text-[#2D2A26]/25 font-body tracking-wider">
            Hunan Agricultural Heritage Digital Map
          </p>
        </div>

        {/* Stats summary */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="font-display text-2xl text-[#2D2A26]/70">{totalSites}</div>
            <div className="text-[10px] text-[#2D2A26]/25 font-body tracking-wider">文化点位</div>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl text-[#2D2A26]/70">14</div>
            <div className="text-[10px] text-[#2D2A26]/25 font-body tracking-wider">市州覆盖</div>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl text-[#2D2A26]/70">3</div>
            <div className="text-[10px] text-[#2D2A26]/25 font-body tracking-wider">主题线路</div>
          </div>
        </div>

        {/* Three color dots */}
        <div className="flex justify-center gap-3 mb-8">
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
              <span className="text-[10px] text-[#2D2A26]/25 font-body">{config.label}</span>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-[10px] text-[#2D2A26]/20 font-body tracking-wider space-y-1">
          <p>数据来源：湖南省文化和旅游厅、湖南省农业农村厅、各市州文旅局</p>
          <p>© 2026 湖南省农耕文化数字地图项目组</p>
        </div>
      </div>
    </footer>
  );
}
