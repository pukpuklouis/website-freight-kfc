import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { MissionSection } from "~/components/mission-section";
import { FAQSection } from "~/components/faq-section";
import { PurposeSection } from "~/components/purpose-section";
import { useTheme, themes } from "~/utils/theme";

export const meta: MetaFunction = () => {
  return [
    { title: "特色-卡菲斯國際" },
    {
      name: "description",
      content:
        "了解卡菲斯國際貨運服務，我們的優勢、價值觀以及對卓越貨運解決方案的承諾。",
    },
  ];
};

export const loader = async () => {
  const missionFeatures = [
    {
      number: "01",
      tagline: "跨境包裹還沒下單就開始焦慮？",
      heading: "極限時效 跑贏每一秒",
      description:
        "我們用72小時極速圈破解時間差困局：智能預報關系統+24小時彈性清關窗口+在地化末端派送部隊，比您預期的更早完成「收件→報關→清關→派送」全鏈條賽跑。",
    },
    {
      number: "02",
      tagline: "在東亞黃金航線上高效流轉",
      heading: "專業是精準到秒的系統",
      description:
        "120天的專業人員訓練「各地關稅」｜深諳港口脈動，3國稅則藍圖｜比海關更早半拍的佈局規劃，訓練外語基因｜熟稔在地報關文化。",
    },
    {
      number: "03",
      tagline: "安全，是我們對托運的承諾",
      heading: "看得見的安全感",
      description:
        "√ 動態監控黑科技艙位 √ 全鏈可視化追蹤 √ 智能風險預警系統。為每件貨物搭配專屬保鑣，讓安全感先於貨物抵達。",
    },
    {
      number: "04",
      tagline: "最貼心的物流商",
      heading: "服務不是口號是DNA",
      description:
        "用Z世代的創新腦洞，搭配多年實戰經驗，為傳統運輸注入高效新解法。透過智能追蹤系統與客製化包裝方案，讓每個環節都成為信任的基石。",
    },
  ];

  const faqQuestions = [
    {
      title: "Q1：(日本/菲律賓/中國)材積計算方式:",
      answer: `貨件外包裝呎吋的 ⻑(cm)寬(cm)高(cm)÷6000`,
    },
    {
      title: "Q2：(日本)是否包含關稅費用？",
      answer: `關稅採實支實付、會在貨物送達時一併跟您收取。
`,
    },
    {
      title: "Q3：你們在台、中、菲、日四地的配送有多深入？",
      answer: `我們在四國都設有倉儲中心(如 台北、深圳、馬尼拉、東京)，並透過與當地物流龍頭合作，延伸至二線城市及工業 區`,
    },
  ];

  return json({ missionFeatures, faqQuestions });
};

export default function AboutUs() {
  const { missionFeatures, faqQuestions } = useLoaderData<typeof loader>();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen" data-oid="3b_4-sp">
      <PurposeSection data-oid="x1yfoie" />
      {/* <MissionSection features={missionFeatures} data-oid="nj6gzny" /> */}
      <FAQSection
        questions={faqQuestions}
        heading="常見問題"
        description="✨ 物流疑問全攻略！從時效到價格，最關心的問題一次解答"
        footerHeading="還有更多問題嗎?"
        footerDescription="🚀 24小時護航｜AI助理+真人助手雙重服務 輸入你的需求＞＞秒速回覆專屬方案"
        data-oid="un3l3cf"
      />
    </div>
  );
}
