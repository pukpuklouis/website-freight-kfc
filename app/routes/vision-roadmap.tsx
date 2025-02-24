import type { MetaFunction } from "@remix-run/node";
import { Ship, CheckCircle, Scale, Globe } from "lucide-react";

import { useTheme } from "~/utils/theme";
import { FeatureVision } from "~/components/feature-vision";
import { StrategicFocus } from "~/components/strategic-focus";

interface FeatureItem {
  path: string;
  text: string;
}

interface Strategy {
  title: string;
  points: string[];
  icon: {
    color: string;
    component: React.ReactNode;
  };
}

export const meta: MetaFunction = () => {
  return [
    { title: "未來營運-卡菲斯國際" },
    {
      name: "description",
      content: "探索我們對貨運服務未來的願景，以及我們的成長和創新策略路線圖。",
    },
  ];
};

export default function VisionRoadmap() {
  const { theme } = useTheme();
  const accentColor = `var(--accent-${theme === "light" ? "9" : "3"})`;

  const strategies: Strategy[] = [
    {
      title: "深耕大中華經濟圈",
      points: [
        "強化「兩岸三地」黃金物流走廊",
        "對接香港/澳門回歸，鞏固東亞經貿樞紐地位",
        "持續擴增高成長性航線，滿足台商密集需求",
      ],

      icon: {
        color: accentColor,
        component: (
          <CheckCircle
            className={`h-6 w-6 text-[${accentColor}]`}
            data-oid="8rk7q9c"
          />
        ),
      },
    },
    {
      title: "完善亞太服務網絡",
      points: [
        "台灣全島重點城市直營據點佈建完成",
        "階段性推進中國內陸城市服務覆蓋",
        "東南亞營運據點持續增設中",
      ],

      icon: {
        color: accentColor,
        component: (
          <Scale
            className={`h-6 w-6 text-[${accentColor}]`}
            data-oid="hxyg6dm"
          />
        ),
      },
    },
    {
      title: "極致化專業服務",
      points: [
        "24小時快速應變機制支援供應鏈波動",
        "航空貨運全流程系統化管控",
        "兩岸三地專屬客服團隊即時對接",
      ],

      icon: {
        color: accentColor,
        component: (
          <Globe
            className={`h-6 w-6 text-[${accentColor}]`}
            data-oid="ce41ztu"
          />
        ),
      },
    },
  ];

  return (
    <div
      className="mx-auto px-4 sm:px-6 lg:px-8 py-40 bg-[var(--accent-2)]"
      data-oid="nqnwqp:"
    >
      <FeatureVision
        heading="卡菲斯國際願景藍圖"
        description="台海絲路貨運隸屬卡菲斯國際物流集團，多年來攜手專業團隊，以「正派永續」為核心，穩紮穩打佈局全球物流網絡。透過先進技術和全球網絡，為客戶創造更大的價值。"
        features={[
          {
            path: "M13 10V3L4 14h7v7l9-11h-7z",
            text: "運用先進技術提升營運效率，確保服務品質",
          },
          {
            path: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            text: "雙核戰略：台灣x菲律賓雙總部深度運營，打造全球物流網絡",
          },
          {
            path: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            text: "連結大中華區：台北/馬尼拉/日本/中國 4大運控中心",
          },
        ]}
        image={{
          src: "https://images.unsplash.com/photo-1605732562742-3023a888e56e?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "Vision",
        }}
        data-oid="t2h1_hp"
      />

      <StrategicFocus
        heading="未來策略重點規劃"
        strategies={strategies}
        data-oid="q6jldr8"
      />
    </div>
  );
}
