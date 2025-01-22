import { motion } from 'framer-motion';

interface StrategyItem {
  title: string;
  points: string[];
  icon: {
    color: string;
    path: string;
  };
}

interface StrategicFocusProps {
  heading: string;
  strategies: StrategyItem[];
}

export function StrategicFocus({ heading, strategies }: StrategicFocusProps) {
  return (
    <div className="mt-20 bg-gray-50 rounded-xl p-8">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-900 mb-6 text-center"
      >
        {heading}
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {strategies.map((strategy, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="text-center"
          >
            <div className={`bg-${strategy.icon.color}-100 rounded-full p-4 inline-block mb-4`}>
              <svg
                className={`h-8 w-8 text-${strategy.icon.color}-500`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={strategy.icon.path}
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">{strategy.title}</h3>
            <p className="text-gray-600">
              {strategy.points.map((point, idx) => (
                <span key={idx}>
                  ✓ {point}<br/>
                </span>
              ))}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
