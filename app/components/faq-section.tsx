import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, themes } from "~/utils/theme";
import ReactMarkdown from "react-markdown";

interface FAQItem {
  title: string;
  answer: string;
}

interface FAQSectionProps {
  heading?: string;
  description?: string;
  questions: FAQItem[];
  footerHeading?: string;
  footerDescription?: string;
}

export function FAQSection({
  heading = "Frequently Asked Questions",
  description = "Find answers to common questions about our freight services.",
  questions,
  footerHeading = "Still have questions?",
  footerDescription = "Contact our team for more information about our services.",
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index],
    );
  };

  return (
    <section className="px-[5%] py-24 bg-[var(--accent-2)]" data-oid="gat0ech">
      <div className="container mx-auto max-w-4xl" data-oid="c8_w8kc">
        <div className="text-center mb-16" data-oid=":iqt3_8">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--gray-12)]"
            data-oid="04v2b_x"
          >
            {heading}
          </h2>
          <p
            className="text-lg text-[var(--gray-11)] max-w-2xl mx-auto"
            data-oid="dm22a72"
          >
            {description}
          </p>
        </div>

        <div className="space-y-4" data-oid="3t4.bed">
          {questions.map((question, index) => (
            <div
              key={index}
              className="border border-[var(--accent-8)]  rounded-lg overflow-hidden"
              data-oid="s.u4sax"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex justify-between items-center bg-[var(--accent-1)] hover:bg-[var(--accent-2)] transition-colors"
                data-oid="a8:.7wa"
              >
                <span
                  className="text-lg font-semibold text-[var(--gray-12)]"
                  data-oid="7yx_9ja"
                >
                  {question.title}
                </span>
                <motion.span
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  className="text-[var(--accent-11)]"
                  data-oid=".lgcu3b"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-oid=".113y_z"
                  >
                    <path
                      d="M19 9L12 16L5 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-oid="oz_6_lk"
                    />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence data-oid="zhnd8-b">
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    data-oid="f7n:-o:"
                  >
                    <div
                      className="px-6 py-4 bg-[var(--accent-a2)] transition-colors duration-300 prose prose-gray dark:prose-invert max-w-none"
                      data-oid="d8eq1-k"
                    >
                      <ReactMarkdown
                        className="text-[var(--gray-11)]"
                        data-oid="1d1outz"
                      >
                        {question.answer}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center" data-oid="flwiyp5">
          <h3
            className="text-2xl font-bold text-[var(--gray-12)] mb-4"
            data-oid="z0zk0sp"
          >
            {footerHeading}
          </h3>
          <p className="text-[var(--gray-11)] mb-8" data-oid="iti5k8h">
            {footerDescription}
          </p>
          <a
            href="/contact-us"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--accent-8)] hover:bg-[var(--accent-9)] transition-colors"
            data-oid="rehpjhf"
          >
            🤙 貨發出去賺大錢！
          </a>
        </div>
      </div>
    </section>
  );
}
