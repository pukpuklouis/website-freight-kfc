
import { Link } from "@remix-run/react";
import { FaFacebookF, FaLine, FaWeixin, FaQq } from "react-icons/fa";
import { useTheme, themes } from "~/utils/theme";
import * as React from "react";
import KfcLogo from "~/components/icons/KfcLogo";

type Theme = "light" | "dark";

interface SocialLink {
  name: string;
  id: string;
  url: string;
  icon: React.ReactNode;
}

interface NavLink {
  name: string;
  to: string;
}
interface LinkItem {
  name: string;
  url: string;
}

interface DownloadItem {
  name: string;
  url: string;
}
interface ContactInfo {
  label: string;
  value: string;
}
interface CompanyInfo {
  name: string;
  slogan: string;
  legalName: string;
  contacts: ContactInfo[];
}
interface FooterSection {
  title: string;
  children: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    name: "Line",
    url: "https://line.me/ti/p/~0932194674",
    id: "0932194674",
    icon: <FaLine className="w-5 h-5 text-green-500" data-oid="l_8nnid" />,
  },
  {
    name: "Line",
    url: "https://line.me/ti/p/~12unisky",
    id: "12unisky",
    icon: <FaLine className="w-5 h-5 text-green-500" data-oid="rpejc5g" />,
  },
  {
    name: "Line",
    url: "https://line.me/ti/p/~@217iielg",
    id: "@217iielg",
    icon: <FaLine className="w-5 h-5 text-green-500" data-oid="s29ukta" />,
  },
  {
    name: "WeChat",
    url: "weixin://dl/chat?a0932194674",
    id: "a0932194674",
    icon: <FaWeixin className="w-5 h-5 text-green-500" data-oid="2v-:n7m" />,
  },
  // {
  //   name: "QQ",
  //   url: "#",
  //   id: "1794331657",
  //   icon: <FaQq className="w-5 h-5 text-gray-600" data-oid="adghegh" />,
  // },
];

const followLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=100057394310703",
    icon: <FaFacebookF className="w-4 h-4" data-oid="hrx3egi" />,
  },
];

const quickLinks: NavLink[] = [
  { name: "首頁", to: "/" },
  { name: "關於我們", to: "/about-us" },
  { name: "服務項目", to: "/services" },
  // { name: "未來營運", to: "/vision-roadmap" },
  { name: "聯絡我們", to: "/contact-us" },
];

const downloadLinks: DownloadItem[] = [
  { name: "個案委任書", url: "~/docs/106_09_19_個案委任書(新).docx" },
  { name: "INVOICE", url: "~/docs/Invoice-範本.xls" },
  { name: "PACKING LIST", url: "~/docs/Packing範本.xls" },
  { name: "報關檢核表", url: "~/docs/檢核表.doc" },
  { name: "洋貨具結書", url: "~/docs/新具結書.doc" },
  { name: "易碎品切結書", url: "~/docs/易碎品切結書.docx" },
  { name: "海運詢問表(出口中國)", url: "~/docs/海運詢問表-出口中國.xlsx" },
];

const linkItems: LinkItem[] = [
  { name: "財政部關務署", url: "https://web.customs.gov.tw/" },
  {
    name: "關稅查詢",
    url: "https://portal.sw.nat.gov.tw/APGQ/LoginFree?request_locale=zh_TW&breadCrumbs=JTdCJTIyYnJlYWRDcnVtYnMlMjIlM0ElNUIlN0IlMjJuYW1lJTIyJTNBJTIyJUU1JTg1JThEJUU4JUFEJTg5JUU2JTlGJUE1JUU4JUE5JUEyJUU2JTlDJThEJUU1JThCJTk5JTIyJTJDJTIydXJsJTIyJTNBJTIyJTIyJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMiVFNyVBOCU4NSVFNSU4OSU4NyVFNyVBOCU4NSVFNyU4RSU4NyVFNiU5RiVBNSVFOCVBOSVBMiUyMiUyQyUyMnVybCUyMiUzQSUyMmNoYW5nZU1lbnVVcmwyKCclRTclQTglODUlRTUlODklODclRTclQTglODUlRTclOEUlODclRTYlOUYlQTUlRTglQTklQTInJTJDJ0FQR1FfNycpJTIyJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMihHQzQxMSklRTclQTglODUlRTUlODklODclRTclQTglODUlRTclOEUlODclRTclQjYlOUMlRTUlOTAlODglRTYlOUYlQTUlRTglQTklQTIlRTQlQkQlOUMlRTYlQTUlQUQlMjIlMkMlMjJ1cmwlMjIlM0ElMjJvcGVuTWVudSgnJTJGQVBHUSUyRkdDNDExJyklMjIlN0QlMkMlN0IlN0QlMkMlN0IlN0QlNUQlMkMlMjJwYXRoVXJsJTIyJTNBJTIyJTIzTUVOVV9BUEdRJTJDJTIzTUVOVV9BUEdRXzclMkMlMkZBUEdRJTJGR0M0MTElMjIlN0Q=",
  },
  { name: "台灣銀行匯率", url: "https://rate.bot.com.tw/xrt?Lang=zh-TW" },
  { name: "快遞100", url: "https://www.kuaidi100.com/" },
  {
    name: "易利委IOS下載",
    url: "https://apps.apple.com/tw/app/ez-way-%E6%98%93%E5%88%A9%E5%A7%94/id1127781971",
  },
  {
    name: "易利委ANDROID下載",
    url: "https://play.google.com/store/apps/details?id=com.tradevan.android.forms&hl=zh_TW&gl=US",
  },
];

const defaultCompanyInfo: CompanyInfo = {
  name: "卡菲斯國際",
  slogan: "專業的物流服務",
  legalName: "卡菲斯國際物流有限公司",
  contacts: [
    { label: "電話", value: "+886-2-2345-6789" },
    { label: "地址", value: "台北市中山區中山北路二段" },
    { label: "Email", value: "service@kfc-freight.com" },
  ],
};

const ContactItem = ({ label, value }: ContactInfo) => (
  <p data-oid="aqkp_30">
    <span className="font-semibold" data-oid="367yl2x">
      {label}:
    </span>{" "}
    <span className="" data-oid="szeyfx6">
      {value}
    </span>
  </p>
);

const FooterSection = ({ title, children }: FooterSection) => (
  <div data-oid="c.n.t7:">
    <h4 className="font-semibold mb-4" data-oid=":-s32v9">
      {title}
    </h4>
    {children}
  </div>
);

const QuickLinksSection = () => (
  <nav aria-label="Footer navigation" data-oid="vh.796i">
    <FooterSection title="快速連結" data-oid="v2t-zsf">
      <ul className="space-y-2" data-oid="0oq:2mh">
        {quickLinks.map(({ name, to }) => (
          <li key={name} data-oid="iwxhn8u">
            <Link
              to={to}
              className="hover:text-[var(--accent-1)] transition-colors"
              prefetch="intent"
              data-oid="22cdw-5"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </FooterSection>
  </nav>
);

const SocialLinksSection = () => (
  <FooterSection title="聯絡方式" data-oid="jzf7al2">
    <ul className="space-y-2 text-sm" data-oid="l6ozo_z">
      {socialLinks.map((link) => (
        <li key={link.name + link.id} data-oid="x8g_uoe">
          <a
            href={link.url}
            className="hover:text-[var(--accent-1)] transition-colors flex items-center gap-2"
            data-oid="-f8ja_s"
          >
            {link.icon}
            <span className="font-semibold" data-oid="-1b3yom">
              {link.name}:
            </span>{" "}
            {link.id}
          </a>
        </li>
      ))}
    </ul>
  </FooterSection>
);

const FollowSection = () => (
  <FooterSection title="追蹤我們" data-oid="pq24mgz">
    <div className="flex gap-4" data-oid="jcl6k:m">
      {followLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          className="hover:text-[var(--accent-1)] transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${link.name}`}
          data-oid="1.c2gi8"
        >
          {link.icon}
        </a>
      ))}
    </div>
  </FooterSection>
);

const DownloadLinksSection = () => (
  <FooterSection title="下載專區" data-oid="d2k9mf3">
    <ul className="space-y-1" data-oid="p7x3n2q">
      {downloadLinks.map((link) => (
        <li key={link.name} data-oid="r5t8m1v">
          <a
            href={link.url}
            download
            className="inline-flex items-center gap-1 hover:text-[var(--accent-1)] transition-colors group"
            data-oid="y9h6k4l"
          >
            {link.name}
            <svg
              className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 13h10M8 3v7m0 0l3-3m-3 3L5 7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  </FooterSection>
);

const LinkItemsSection = () => (
  <FooterSection title="相關連結" data-oid="f8g7j2h">
    <ul className="space-y-1" data-oid="c3v1b5n">
      {linkItems.map((item) => (
        <li key={item.name} data-oid="w4s9m6x">
          <a
            href={item.url}
            className="inline-flex items-center gap-1 hover:text-[var(--accent-1)] transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
            data-oid="z7l2k8j"
          >
            {item.name}
            <svg
              className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 11.5L11.5 4.5M11.5 4.5H6.5M11.5 4.5V9.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  </FooterSection>
);

function CompanySection() {
  const companyInfo = React.useMemo(() => defaultCompanyInfo, []);

  return (
    <div className="flex flex-col items-left gap-4" data-oid="eqyqh50">
      <div className="flex flex-row items-center" data-oid=":pn.f2e">
        <KfcLogo
          className="w-11 h-6 fill-[var(--accent-11)] mr-2"
          data-oid="pof-6w6"
        />

        <h3 className="font-bold text-lg" data-oid="ikq:n3w">
          {companyInfo.name}
        </h3>
      </div>
      <div className="space-y-2" data-oid="e4oec80">
        <p className="text-sm" data-oid="lgrpwfu">
          {companyInfo.slogan}
        </p>
        <p className="text-sm" data-oid="k138obb">
          {companyInfo.legalName}
        </p>
        <div className="space-y-1" data-oid="dgzhlof">
          {companyInfo.contacts.map((contact) => (
            <ContactItem key={contact.label} {...contact} data-oid="j-wlcgv" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  // Specify the type of themeValue
  let themeValue: Theme = "light"; // Default theme
  try {
    const { theme } = useTheme();
    // Ensure theme is of type Theme
    themeValue = theme as Theme;
  } catch (error) {
    console.error("Theme error:", error);
  }

  // Memoize all theme-dependent values together
  const themeStyles = React.useMemo(
    () => ({
      footer:
        themeValue === "dark"
          ? "bg-[var(--accent-2)] text-[var(--accent-12)]"
          : "bg-[var(--accent-6)] text-[var(--accent-12)]",
      border: `border-t ${
        themeValue === "dark"
          ? "border-[var(--accent-7)]"
          : "border-[var(--accent-11)]"
      }`,
    }),
    [themeValue]
  );

  // Memoize year calculation
  const currentYear = React.useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      className={themeStyles.footer}
      role="contentinfo"
      data-oid="60slxky"
    >
      <div className="container mx-auto px-4 py-12" data-oid="0kcpsnr">
        <div
          className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-4 lg:grid-cols-7 lg:gap-4"
          data-oid="9zry7rj"
        >
          <div className="lg:col-span-2 md:col-span-1">
            <CompanySection data-oid="dfq0y79" />
          </div>
          <QuickLinksSection data-oid="ctmixx7" />
          <LinkItemsSection />
          <DownloadLinksSection />
          <SocialLinksSection data-oid="b3deg-4" />
          <FollowSection data-oid="9zhukdk" />
        </div>

        <div
          className={`${themeStyles.border} mt-8 pt-8 text-sm text-center`}
          data-oid="0crhitr"
        >
          <p className="mb-2" data-oid="hwn22hk">
            &copy; {currentYear} 卡菲斯國際. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mb-4" data-oid="2:0rh4h">
            <Link
              to="/terms"
              className="hover:text-[var(--accent-1)] transition-colors"
              prefetch="intent"
              data-oid="hw51p19"
            >
              服務條款
            </Link>
            <span data-oid="l5zzn1e">•</span>
            <Link
              to="/privacy"
              className="hover:text-[var(--accent-1)] transition-colors"
              prefetch="intent"
              data-oid="z:fntq5"
            >
              隱私政策
            </Link>
          </div>
          <p className="" data-oid="-:xn3nh">
            Design by{" "}
            <a
              href="https://anlstudio.framer.website"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-1)] transition-colors"
              data-oid="z-ra:hf"
            >
              A&LStudio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
