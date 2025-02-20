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
    <section className="px-[5%] py-24 bg-[var(--accent-2)]" data-oid="qwntl.p">
      <div className="container mx-auto max-w-4xl" data-oid="wo7y9i7">
        <div className="text-center mb-16" data-oid="g28nzbv">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--gray-12)]"
            data-oid="4c.29pz"
          >
            {heading}
          </h2>
          <p
            className="text-lg text-[var(--gray-11)] max-w-2xl mx-auto"
            data-oid="lbnxyvq"
          >
            {description}
          </p>
        </div>

        <div className="space-y-4" data-oid="ejulmpm">
          {questions.map((question, index) => (
            <div
              key={index}
              className="border border-[var(--accent-8)]  rounded-lg overflow-hidden"
              data-oid="4lq95l9"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex justify-between items-center bg-[var(--accent-1)] hover:bg-[var(--accent-2)] transition-colors"
                data-oid="a:qcswr"
              >
                <span
                  className="text-lg font-semibold text-[var(--gray-12)]"
                  data-oid="nc:yfe8"
                >
                  {question.title}
                </span>
                <motion.span
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  className="text-[var(--accent-11)]"
                  data-oid="mybjje7"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-oid="0zfk36v"
                  >
                    <path
                      d="M19 9L12 16L5 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      data-oid="gp-zd8z"
                    />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence data-oid="8zmhply">
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    data-oid="1e-0xaq"
                  >
                    <div
                      className="px-6 py-4 bg-[var(--accent-a2)] transition-colors duration-300 prose prose-gray dark:prose-invert max-w-none"
                      data-oid="0qly0jb"
                    >
                      <ReactMarkdown
                        className="text-[var(--gray-11)]"
                        data-oid="y4:1giu"
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

        <div className="mt-16 text-center" data-oid="hrzyo92">
          <h3
            className="text-2xl font-bold text-[var(--gray-12)] mb-4"
            data-oid="fm23x86"
          >
            {footerHeading}
          </h3>
          <p className="text-[var(--gray-11)] mb-8" data-oid="a1yfb07">
            {footerDescription}
          </p>
          <a
            href="/contact-us"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--accent-8)] hover:bg-[var(--accent-9)] transition-colors"
            data-oid="t_..gqz"
          >
            🤙 貨發出去賺大錢！
          </a>
        </div>
      </div>
    </section>
  );
}
