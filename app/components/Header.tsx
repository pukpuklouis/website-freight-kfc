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
  { title: 'About Us', url: '/about-us' },
  { title: 'Services', url: '/services' },
  { title: 'Vision & Roadmap', url: '/vision-roadmap' },
  { title: 'Contact Us', url: '/contact-us' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="fixed top-4 left-1/2 -translate-x-1/2 w-[900px] bg-background/60 backdrop-blur-md z-50 rounded-full border shadow-sm">
      <div className="px-6">
        <div className="relative flex h-14 items-center justify-between">
          {/* Mobile Menu Button */}
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

          {/* Logo */}
          <Link to="/" className="flex items-center text-2xl font-bold">
            KFC Freight
          </Link>

          {/* Desktop Navigation */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <ul className="flex items-center gap-6">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.url}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-x-4">
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

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  closed: {
                    x: "-100%",
                    opacity: 1,
                    transition: { type: "spring", duration: 0.6, bounce: 0 },
                  },
                  open: {
                    x: 0,
                    opacity: 1,
                    transition: { type: "spring", duration: 0.4, bounce: 0 },
                  },
                }}
                className="absolute left-0 top-14 z-50 flex h-dvh w-[90%] flex-col border rounded-2xl border-border bg-background/95 backdrop-blur-md px-[5%] pb-4 md:w-[80%] lg:hidden"
              >
                <Link to="/" className="mb-8 mt-10 text-2xl font-bold">
                  KFC Freight
                </Link>
                
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.url}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 flex flex-col gap-4">
                  <Button variant="outline" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/get-started">Get Started</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Menu Overlay */}
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
        </div>
      </div>
    </section>
  );
}
