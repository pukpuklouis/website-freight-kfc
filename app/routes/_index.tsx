import { json } from "@remix-run/node";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { HeroSection } from "~/components/_index_hero_section";
import { FeatureSection } from "~/components/_index_feature_section";
import { BenefitSection } from "~/components/_index_benefit_section";
import { HowItWorks } from "~/components/_index_howitwork";
import { ServiceSection } from "~/components/_index_service_section";

interface Service {
  title: string;
  description: string;
  iconType: "truck" | "ship" | "plane";
  link: string;
}

// Add LoaderData type to properly type the loader return value
interface LoaderData {
  services: Service[];
}

export const meta: MetaFunction = () => {
  return [
    { title: "卡菲斯國際" },
    { name: "description", content: "卡菲斯國際專營中國日本菲律賓三地運輸!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const services: Service[] = [
    {
      title: "海運",
      description:
        "**卡菲斯**提供海運服務，然而目前已正式成為一獨立的全方位公司。我們與信譽的船公司密切合作，據以提升本身的服務品質，降低客戶的成本，同時提供客戶在激烈競爭的市場環境中成長",
      iconType: "ship",
      link: "/",
    },
    {
      title: "空運/快遞",
      description:
        "**台海絲路航空貨運承攬股份有限公司**提供之空運服務有戶對戶送貨服務。客戶可放心的交我們台海絲路，所運送的每一批貨進行更迅速的信息傳送和查詢。",
      iconType: "plane",
      link: "/",
    },
    {
      title: "倉儲配送",
      description:
        "**卡菲斯**在各地提供倉儲配送及物流作業與服務，如揀貨分類配送，轉倉處理，即時出貨處理，集散配送管理，中轉併貨處理及其它各項物流服務。",
      iconType: "truck",
      link: "/",
    },
  ];

  return json<LoaderData>({ services });
};

export default function Index() {
  const { services } = useLoaderData<LoaderData>();

  return (
    <main className="flex-1" data-oid="j7upu9j">
      <HeroSection data-oid="4e71t4:" />
      <FeatureSection data-oid="m._zhp6" />
      <BenefitSection data-oid=".5.11og" />
      <HowItWorks data-oid="sm030vl" />
      <ServiceSection services={services} data-oid="rb6s:rr" />
    </main>
  );
}
