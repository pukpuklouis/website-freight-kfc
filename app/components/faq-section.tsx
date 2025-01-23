import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  heading = 'Frequently Asked Questions',
  description = 'Find answers to common questions about our freight services.',
  questions,
  footerHeading = 'Still have questions?',
  footerDescription = 'Contact our team for more information about our services.',
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(current =>
      current.includes(index)
        ? current.filter(i => i !== index)
        : [...current, index]
    );
  };

  return (
    <section className="px-[5%] py-24 bg-accent-2">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            {heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {question.title}
                </span>
                <motion.span
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  className="text-gray-500"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 9L12 16L5 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 py-4 bg-white">
                      <p className="text-gray-600">{question.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {footerHeading}
          </h3>
          <p className="text-gray-600 mb-8">
            {footerDescription}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            🤙 貨發出去發大財！
          </a>
        </div>
      </div>
    </section>
  );
}
