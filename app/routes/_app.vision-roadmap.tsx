import type { MetaFunction } from "@remix-run/node";
import { FeatureVision } from "~/components/feature-vision";
import { StrategicFocus } from "~/components/strategic-focus";

export const meta: MetaFunction = () => {
  return [
    { title: "Vision & Roadmap - KFC Freight Services" },
    {
      name: "description",
      content:
        "Discover our vision for the future of freight services and our strategic roadmap for growth and innovation.",
    },
  ];
};

export default function VisionRoadmap() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
      <FeatureVision
        heading="卡菲斯國際願景藍圖"
        description="台海絲路貨運隸屬卡菲斯國際物流集團，多年來攜手專業團隊，以「正派永續」為核心，穩紮穩打佈局全球物流網絡。透過先進技術和全球網絡，為客戶創造更大的價值。"
        features={[
          {
            icon: "/icons/innovation.svg",
            text: "運用先進技術提升營運效率，確保服務品質",
          },
          {
            icon: "/icons/global.svg",
            text: "雙核戰略：台灣x菲律賓雙總部深度運營，打造全球物流網絡",
          },
          {
            icon: "/icons/global.svg",
            text: "連結大中華區：台北/馬尼拉/日本/中國 4大運控中心",
          },
        ]}
        image={{
          src: "https://placehold.co/600x400?text=Vision+Placeholder",
          alt: "Vision Placeholder",
        }}
      />

      <StrategicFocus
        heading="未來策略重點規劃"
        strategies={[
          {
            title: "深耕大中華經濟圈",
            points: [
              "強化「兩岸三地」黃金物流走廊",
              "對接香港/澳門回歸效應，鞏固東亞經貿樞紐地位",
              "持續擴增高成長性航線，滿足台商密集投資需求"
            ],
            icon: {
              color: "black",
              path: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            }
          },
          {
            title: "完善亞太服務網絡",
            points: [
              "台灣全島重點城市直營據點佈建完成",
              "階段性推進中國內陸城市服務覆蓋",
              "東南亞營運據點持續增設中"
            ],
            icon: {
              color: "black",
              path: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
            }
          },
          {
            title: "極致化專業服務",
            points: [
              "24小時快速應變機制支援供應鏈波動",
              "航空貨運全流程系統化管控",
              "兩岸三地專屬客服團隊即時對接"
            ],
            icon: {
              color: "black",
              path: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            }
          }
        ]}
      />
    </div>
  );
}
