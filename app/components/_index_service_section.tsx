import { Link } from "@remix-run/react";
import { ArrowRight } from "lucide-react";
import { Truck, Ship, Plane } from "lucide-react";
import { useTheme, themes } from "~/utils/theme";
import ReactMarkdown from "react-markdown";
import { ServiceLink } from "~/models/service.server";

interface Service {
  title: string;
  description: string;
  iconType: "truck" | "ship" | "plane";
  link: string;
}

interface ServiceSectionProps {
  title?: string;
  description?: string;
  services: Service[];
  serviceLinks: ServiceLink[];
}

const IconMap = {
  truck: Truck,
  ship: Ship,
  plane: Plane,
} as const;

export const ServiceSection = ({
  title = "我們的服務",
  description = "我們提供全方位的物流解決方案，滿足您的所有運輸需求。",
  services,
  serviceLinks,
}: ServiceSectionProps) => {
  const { theme } = useTheme();
  const { accent, gray } = themes[theme];

  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-[var(--accent-2)]"
      data-oid="422jmw9"
    >
      <div className="container mx-auto px-4" data-oid="bdiu-qf">
        <div className="text-center max-w-3xl mx-auto mb-12" data-oid="4lvnpu.">
          <h2
            className={`text-3xl font-bold mb-4 ${
              theme === "dark"
                ? "text-[var(--accent-12)]"
                : "text-[var(--accent-12)]"
            }`}
            data-oid="jk2nb65"
          >
            {title}
          </h2>
          <ReactMarkdown
            className={`${
              theme === "dark"
                ? "text-[var(--accent-11)]"
                : "text-[var(--accent-11)]"
            } prose prose-sm max-w-none prose-headings:text-[var(--accent-11)] prose-strong:text-[var(--accent-11)] prose-em:text-[var(--accent-11)]`}
            data-oid="h:-pme0"
          >
            {description}
          </ReactMarkdown>
        </div>

        {/* Main Services Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          data-oid="2l8g8.r"
        >
          {services.map((service) => {
            const Icon = IconMap[service.iconType];
            return (
              <Link
                key={service.title}
                to={service.link}
                className={`group rounded-lg p-6 transition-all ${
                  theme === "dark"
                    ? "bg-[var(--accent-3)] hover:bg-[var(--accent-4)] shadow-lg shadow-accent-12/5"
                    : "bg-[var(--accent-2)] hover:bg-[var(--accent-3)] shadow-md hover:shadow-lg"
                }`}
                data-oid="z1mb3m:"
              >
                <div
                  className="flex items-center justify-between mb-4"
                  data-oid="yqufhw8"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      theme === "dark"
                        ? "bg-[var(--accent-4)]"
                        : "bg-[var(--accent-3)]"
                    }`}
                    data-oid="1l4q5h2"
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        theme === "dark"
                          ? "text-[var(--accent-11)]"
                          : "text-[var(--accent-11)]"
                      }`}
                      data-oid="2h67nto"
                    />
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 transition-colors ${
                      theme === "dark"
                        ? "text-[var(--accent-8)] group-hover:text-[var(--accent-11)]"
                        : "text-[var(--accent-8)] group-hover:text-[var(--accent-11)]"
                    }`}
                    data-oid=":q-o0oh"
                  />
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    theme === "dark"
                      ? "text-[var(--accent-12)]"
                      : "text-[var(--accent-12)]"
                  }`}
                  data-oid="x3n.m6v"
                >
                  {service.title}
                </h3>
                <ReactMarkdown
                  className={`${
                    theme === "dark"
                      ? "text-[var(--accent-11)]"
                      : "text-[var(--accent-11)]"
                  } prose prose-sm max-w-none prose-headings:text-[var(--accent-11)] prose-strong:text-[var(--accent-11)] prose-em:text-[var(--accent-11)]`}
                  data-oid="fu1otf9"
                >
                  {service.description}
                </ReactMarkdown>
              </Link>
            );
          })}
        </div>

        {/* Service Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceLinks.map((link) => (
            <Link
              key={link.url}
              to={link.url}
              className={`p-4 rounded-lg transition-all ${
                theme === "dark"
                  ? "bg-[var(--accent-3)] hover:bg-[var(--accent-4)]"
                  : "bg-[var(--accent-2)] hover:bg-[var(--accent-3)]"
              }`}
            >
              <h4
                className={`text-lg font-medium ${
                  theme === "dark"
                    ? "text-[var(--accent-12)]"
                    : "text-[var(--accent-12)]"
                }`}
              >
                {link.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
