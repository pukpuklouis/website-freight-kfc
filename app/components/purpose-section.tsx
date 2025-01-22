import "./purpose-section.css";
import type { FC } from "react";

export const PurposeSection: FC = () => {
  return (
    <section className="py-32 pb-8 px-4 md:px-8 lg:px-16 bg-white PurposeSection_section1">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
           全球直送{" "}
          <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
           使命必達
          </span>
        </h1>
        <div className="space-y-8 text-lg text-gray-700">
          <p className="text-center max-w-3xl mx-auto">
          
          不論是空運急件還是菲律賓專線海運，我們提供「
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent font-semibold">
          到府直送一條龍服務
          </span>{" "}
          」從台灣到世界，從倉庫到客戶手中，極速出貨+智能追蹤系統，跨境物流從未如此輕鬆。我們{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent font-semibold">
              更懂您的需求
            </span>{" "}
            不是單純運貨，是為您創造價值——專業團隊量身規劃最佳路線，報關文件、稅務諮詢、風險預警全程守護，讓每一分錢都花在刀口上！
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  為什麼選擇我們？
                </span>
              </h3>
              <p>
              ✔️ 台灣在地12年口碑團隊｜服務超3000+企業客戶<br/>
              ✔️ 空運72小時極速達標｜海運菲律賓專線業界最快<br/>
              ✔️ 全程E化智能管理｜隨時查件不焦慮<br/>
              ✔️ 客製化報價方案｜省去複雜流程透明收費
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  卡菲斯承諾
                </span>
              </h3>
              <p>
              ▸ 絕不說「應該明天到」→ 精確到小時的物流時效<br/>
              ▸ 沒有隱藏費用→ 報價單=最終收費<br/>
              ▸ 7x12小時客服→ 不再與機器人對話
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
