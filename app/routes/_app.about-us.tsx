import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { MissionSection } from "~/components/mission-section";
import { FAQSection } from "~/components/faq-section";

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
      tagline: "Our Purpose",
      heading: "Connecting Global Trade",
      description:
        "We bridge businesses across continents with reliable and efficient freight solutions.",
    },
    {
      number: "02",
      tagline: "Our Commitment",
      heading: "Excellence in Service",
      description:
        "Delivering outstanding customer service and maintaining the highest standards in freight management.",
    },
    {
      number: "03",
      tagline: "Our Vision",
      heading: "Future of Freight",
      description:
        "Leading innovation in the freight industry while maintaining sustainable and efficient practices.",
    },
    {
      number: "04",
      tagline: "Our Expertise",
      heading: "Global Network",
      description:
        "Leveraging our extensive international partnerships to provide seamless logistics solutions worldwide.",
    },
    {
      number: "05",
      tagline: "Our Responsibility",
      heading: "Sustainable Logistics",
      description:
        "Committed to reducing our environmental impact through eco-friendly practices and green transportation solutions.",
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
