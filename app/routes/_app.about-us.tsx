import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { MissionSection } from "~/components/mission-section";
import { FAQSection } from "~/components/faq-section";
import { PurposeSection } from "~/components/purpose-section";

export const meta: MetaFunction = () => {
  return [
    { title: "About Us - KFC Freight Services" },
    {
      name: "description",
      content:
        "Learn about KFC Freight Services, our history, values, and commitment to excellence in freight solutions.",
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
      title: "What services does KFC Freight offer?",
      answer: "We offer comprehensive freight solutions including air freight, sea freight, land transportation, customs clearance, and specialized logistics services tailored to your needs.",
    },
    {
      title: "How do you ensure cargo safety?",
      answer: "We implement strict security protocols, use advanced tracking systems, and partner with trusted carriers to ensure your cargo is safe throughout its journey.",
    },
    {
      title: "What areas do you service?",
      answer: "We operate globally with a strong presence in Asia Pacific, Europe, and the Americas, supported by our extensive network of partners worldwide.",
    },
    {
      title: "How can I track my shipment?",
      answer: "We provide real-time tracking through our online portal and mobile app. Each shipment is assigned a unique tracking number for easy monitoring.",
    },
    {
      title: "What makes KFC Freight different?",
      answer: "Our combination of industry expertise, cutting-edge technology, and commitment to customer service sets us apart. We provide personalized solutions while maintaining competitive rates.",
    },
  ];

  return json({ missionFeatures, faqQuestions });
};

export default function AboutUs() {
  const { missionFeatures, faqQuestions } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50">
      <PurposeSection />
      <MissionSection features={missionFeatures} />
      <FAQSection
        questions={faqQuestions}
        heading="常見問題"
        description="✨ 物流疑問全攻略！從時效到價格，最關心的問題一次解答"
        footerHeading="還有更多問題嗎?"
        footerDescription="🚀 24小時護航｜AI助理+真人助手雙重服務 輸入你的需求＞＞秒速回覆專屬方案"
      />
    </div>
  );
}
