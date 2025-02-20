import { Link } from "@remix-run/react";
import { ArrowRight } from "lucide-react";
import { Truck, Ship, Plane } from "lucide-react";
import { useTheme, themes } from "~/utils/theme";
import ReactMarkdown from "react-markdown";

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
}: ServiceSectionProps) => {
  const { theme } = useTheme();
  const { accent, gray } = themes[theme];

  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-[var(--accent-2)]"
      data-oid="oyn6om6"
    >
      <div className="container mx-auto px-4" data-oid="hrulyv.">
        <div className="text-center max-w-3xl mx-auto mb-12" data-oid="nig_4xr">
          <h2
            className={`text-3xl font-bold mb-4 ${
              theme === "dark"
                ? "text-[var(--accent-12)]"
                : "text-[var(--accent-12)]"
            }`}
            data-oid="ry_0tvu"
          >
            {title}
          </h2>
          <ReactMarkdown
            className={`${
              theme === "dark"
                ? "text-[var(--accent-11)]"
                : "text-[var(--accent-11)]"
            } prose prose-sm max-w-none prose-headings:text-[var(--accent-11)] prose-strong:text-[var(--accent-11)] prose-em:text-[var(--accent-11)]`}
            data-oid="g710grk"
          >
            {description}
          </ReactMarkdown>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          data-oid="9w9fbyf"
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
                data-oid="o8_i0nx"
              >
                <div
                  className="flex items-center justify-between mb-4"
                  data-oid="vaootfr"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      theme === "dark"
                        ? "bg-[var(--accent-4)]"
                        : "bg-[var(--accent-3)]"
                    }`}
                    data-oid="9qgg8ew"
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        theme === "dark"
                          ? "text-[var(--accent-11)]"
                          : "text-[var(--accent-11)]"
                      }`}
                      data-oid="imgbz::"
                    />
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 transition-colors ${
                      theme === "dark"
                        ? "text-[var(--accent-8)] group-hover:text-[var(--accent-11)]"
                        : "text-[var(--accent-8)] group-hover:text-[var(--accent-11)]"
                    }`}
                    data-oid="xh7-dyr"
                  />
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    theme === "dark"
                      ? "text-[var(--accent-12)]"
                      : "text-[var(--accent-12)]"
                  }`}
                  data-oid="ci.8rdl"
                >
                  {service.title}
                </h3>
                <ReactMarkdown
                  className={`${
                    theme === "dark"
                      ? "text-[var(--accent-11)]"
                      : "text-[var(--accent-11)]"
                  } prose prose-sm max-w-none prose-headings:text-[var(--accent-11)] prose-strong:text-[var(--accent-11)] prose-em:text-[var(--accent-11)]`}
                  data-oid="e8s59zb"
                >
                  {service.description}
                </ReactMarkdown>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
