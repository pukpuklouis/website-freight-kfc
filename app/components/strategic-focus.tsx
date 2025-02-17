import { motion } from 'framer-motion';
import { useTheme } from '~/utils/theme';

interface StrategyItem {
  title: string;
  points: string[];
  icon: {
    color: string;
    path?: string;
    component?: React.ReactNode;
  };
}

interface StrategicFocusProps {
  heading: string;
  strategies: StrategyItem[];
}

export function StrategicFocus({ heading, strategies }: StrategicFocusProps) {
  const { theme } = useTheme();
  
  return (
    <div className="mt-20 bg-[var(--accent-3)] dark:bg-[var(--accent-9)] rounded-xl py-32 px-16 shadow-xl">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 text-center text-[var(--accent-12)]"
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
            className="p-6 rounded-lg bg-[var(--accent-2)] dark:bg-[var(--accent-8)] shadow-lg"
          >
            <div className="flex items-center justify-center mb-4">
              {strategy.icon.component ? (
                strategy.icon.component
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={strategy.icon.color}
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={strategy.icon.path}
                  />
                </svg>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[var(--accent-12)]">
              {strategy.title}
            </h3>
            <ul className="space-y-2 text-left">
              {strategy.points.map((point, pointIndex) => (
                <li key={pointIndex} className="text-[var(--accent-11)] text-md">
                  ✓ {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
