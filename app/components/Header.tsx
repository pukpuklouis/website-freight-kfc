'use client';

import { useState } from 'react';
import { Link } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { RxChevronDown, RxMoon, RxSun } from 'react-icons/rx';
import { useTheme } from '~/hooks/use-theme';

type NavLink = {
  title: string;
  url: string;
  subMenuLinks?: NavLink[];
};

const navLinks: NavLink[] = [
  { title: 'Services', url: '/services' },
  { title: 'Features', url: '/features' },
  { title: 'Pricing', url: '/pricing' },
  { title: 'Contact', url: '/contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="fixed top-4 left-1/2 -translate-x-1/2 w-[900px] bg-background/60 backdrop-blur-md z-50 rounded-full border shadow-sm">
      <div className="px-6">
        <div className="grid h-14 grid-cols-[1fr_max-content_1fr] items-center justify-between">
          <button
            className="flex size-12 flex-col justify-center lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <span key={index} className="my-[3px] h-0.5 w-6 bg-foreground lg:hidden" />
              ))}
          </button>

          <AnimatePresence>
            <motion.div
              initial="closed"
              animate={isMobileMenuOpen ? "open" : "closed"}
              exit="closed"
              variants={{
                closed: {
                  x: "-100%",
                  opacity: 1,
                  transition: { type: "spring", duration: 0.6, bounce: 0 },
                  transitionEnd: {
                    opacity: "var(--opacity-closed, 0%)",
                    x: "var(--x-closed, -100%)",
                  },
                },
                open: {
                  x: 0,
                  opacity: 1,
                  transition: { type: "spring", duration: 0.4, bounce: 0 },
                },
              }}
              className="absolute left-0 top-14 z-50 flex h-dvh w-[90%] flex-col border rounded-2xl border-border bg-background/95 backdrop-blur-md px-[5%] pb-4 md:w-[80%] lg:visible lg:static lg:-ml-4 lg:flex lg:h-auto lg:w-auto lg:flex-row lg:border-none lg:bg-transparent lg:px-0 lg:pb-0 lg:[--opacity-closed:100%] lg:[--x-closed:0%]"
            >
              <Link to="/" className="mb-8 mt-10 text-2xl font-bold lg:hidden">
                KFC Freight
              </Link>
              
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.url}
                  className="relative block py-3 text-md hover:text-primary transition-colors lg:px-4 lg:py-2 lg:text-base"
                >
                  {link.title}
                </Link>
              ))}

              <div className="mt-6 flex flex-col gap-4 lg:hidden">
                <Button variant="outline" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/get-started">Get Started</Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <Link to="/" className="flex min-h-16 flex-shrink-0 items-center text-2xl font-bold">
            KFC Freight
          </Link>

          <div className="flex min-h-16 items-center justify-end gap-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2"
            >
              {theme === 'dark' ? (
                <RxSun className="h-5 w-5" />
              ) : (
                <RxMoon className="h-5 w-5" />
              )}
            </Button>
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/get-started">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-black lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </section>
  );
}
