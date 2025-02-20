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
      title: "Q1：你們在台、中、菲、日四地的配送網絡有多深入？",
      answer:
        "我們在四國主要城市設有自有倉儲中心（如台北、上海、馬尼拉、東京），並透過與當地物流龍頭合作，延伸至二線城市及工業區。針對菲律賓島嶼地區與日本偏遠縣市，提供「經濟型專船+最後一哩陸運」整合方案，確保全覆蓋無盲區。",
    },
    {
      title: "Q2：跨境清關如何避免延誤？",
      answer: `採取「**雙軌預審制**」：
1. **預申報系統**：客戶寄件前可上傳文件，由駐點清關團隊預審（台灣/中國團隊精通中日雙語，菲律賓團隊熟悉BOC最新規範）。
2. **緊急通道服務**：針對高時效貨件，支付10%附加費即可使用「優先驗放通道」，例如中國→日本電子零件24小時內通關完成率達98%。
`,
    },
    {
      title: "Q3：運費是否包含隱藏成本？",
      answer: `堅持「**三透明報價**」：
1. **全包價顯示**：報價單明確拆分「基本運費+燃油附加費+關稅預付金」
2. **超重預警系統**：貨件入倉後自動測量材積，若實際重量超過預估10%將即時通知
3. **退件保證**：若因我方因素產生海關罰金，最高賠償200%運費`,
    },
    {
      title: "Q4：如何確保日本線的時效精準度？",
      answer: `1. **全包價顯示**：報價單明確拆分「基本運費+燃油附加費+關稅預付金」
2. **超重預警系統**：貨件入倉後自動測量材積，若實際重量超過預估10%將即時通知
3. **退件保證**：若因我方因素產生海關罰金，最高賠償200%運費`,
    },
    {
      title: "Q5：有無中小企業的彈性方案？",
      answer: `### 亞洲跨境電商套餐
-  **拼櫃優惠**:每月5/15/25日固定併櫃班次1CBM起收
-  **代收代付**:協助中國供應商代收菲律賓/日本客戶貨款
-  **返向物流**:日本退貨可經台灣倉重新貼標轉寄中國`,
    },
    {
      title: "Q6：如何追蹤貨件？",
      answer: `提供「貨況預測」增值服務：
1. 即時GPS定位（台灣/中國段使用北斗衛星系統）
2. 自動推送海關審查進度（如日本稅關審查完成前2小時預警）
3. 氣象監測：遇颱風/暴雨主動建議改道方案`,
    },
    {
      title: "Q7：環保措施是否符合國際規範？",
      answer: `- **船舶減碳**：台灣-菲律賓航線使用LNG燃料船
- **循環包材**：日本線提供可折疊回收的FSC認證木箱
- **碳權折抵**：選擇電子文件可累積點數兌換碳中和憑證`,
    },
    {
      title: "Q8：緊急狀況如何聯繫？",
      answer: `提供「在地母語支援」：
- 24小時專屬窗口（中文/日語/塔加洛語/英語）
- 重大事故啟動「三方通話」：客戶+當地海關+我方律師同步處理
- 菲律賓地區可派員至BOC海關現場即時回傳影像`,
    },
  ];

  return json({ missionFeatures, faqQuestions });
};

export default function AboutUs() {
  const { missionFeatures, faqQuestions } = useLoaderData<typeof loader>();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen" data-oid="_6-_q3v">
      <PurposeSection data-oid="5t6ps6v" />
      <MissionSection features={missionFeatures} data-oid="sl.914y" />
      <FAQSection
        questions={faqQuestions}
        heading="常見問題"
        description="✨ 物流疑問全攻略！從時效到價格，最關心的問題一次解答"
        footerHeading="還有更多問題嗎?"
        footerDescription="🚀 24小時護航｜AI助理+真人助手雙重服務 輸入你的需求＞＞秒速回覆專屬方案"
        data-oid="6_36ur9"
      />
    </div>
  );
}
