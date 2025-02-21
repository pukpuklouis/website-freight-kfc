import { useState } from "react";
import { Link } from "@remix-run/react";
// import { Button } from "~/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@radix-ui/themes";
import { useTheme, themes } from "~/utils/theme";
import "@radix-ui/themes/styles.css";

type NavLink = {
  title: string;
  url: string;
  subMenuLinks?: NavLink[];
};

const navLinks: NavLink[] = [
  { title: "關於我們", url: "/about-us" },
  {
    title: "服務介紹",
    url: "/services",
    subMenuLinks: [
      { title: "冷鏈物流", url: "/services/cold-chain" },
      { title: "倉儲服務", url: "/services/warehousing" },
      { title: "運輸配送", url: "/services/delivery" },
      { title: "供應鏈管理", url: "/services/supply-chain" },
    ],
  },
  // { title: "未來營運", url: "/vision-roadmap" },
  { title: "聯絡我們", url: "/contact-us" },
];

const NavButtonText = "跨境下單";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const accentColor = themes[theme].accent;
  const grayColors = themes[theme].gray;

  const NavItem = ({ link }: { link: NavLink }) => {
    if (link.subMenuLinks) {
      return (
        <div className="group relative">
          <div className="flex items-center gap-1 py-2 text-lg font-medium text-[var(--accent-9)] transition-colors hover:text-[var(--accent-11)]">
            {link.title}
            <RxChevronDown className="size-4" />
          </div>
          <div className="absolute left-0 top-full hidden pt-2 group-hover:block">
            <div className="w-48 rounded-lg border border-[var(--accent-6)] bg-background/70 backdrop-blur-sm p-2 shadow-lg">
              {link.subMenuLinks.map((subLink) => (
                <Link
                  key={subLink.title}
                  to={subLink.url}
                  className="block rounded-md px-2 py-1.5 text-md text-[var(--accent-9)] transition-colors hover:bg-[var(--accent-9)] hover:text-[var(--gray-1)] dark:hover:bg-[var(--accent-8)] dark:hover:text-[var(--gray-12)]"
                >
                  {subLink.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <Link
        to={link.url}
        className="py-2 text-lg font-bold text-[var(--accent-9)] transition-colors hover:text-[var(--accent-11)]"
      >
        {link.title}
      </Link>
    );
  };

  const MobileNavItem = ({ link }: { link: NavLink }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    if (link.subMenuLinks) {
      return (
        <div className="w-full">
          <button
            onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-md font-medium text-[var(--gray-11)] transition-colors hover:bg-accent hover:text[var(--accent-7)]"
          >
            {link.title}
            <RxChevronDown
              className={`size-4 transition-transform ${
                isSubMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {isSubMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  {link.subMenuLinks.map((subLink) => (
                    <Link
                      key={subLink.title}
                      to={subLink.url}
                      className="rounded-lg px-3 py-2 text-sm text-[var(--gray-11)] transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {subLink.title}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link
        to={link.url}
        className="w-full rounded-lg px-3 py-2 text-md font-medium text-[var(--gray-11)] transition-colors hover:bg-accent hover:text-accent-foreground"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {link.title}
      </Link>
    );
  };

  return (
    <section
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[min(900px,calc(100%-2rem))] z-50"
      style={
        {
          "--theme-gray-1": grayColors[1],
          "--theme-gray-12": grayColors[12],
        } as React.CSSProperties
      }
    >
      <div className="px-6 rounded-full bg-background/60 backdrop-blur-md border shadow-sm">
        <div className="relative flex h-14 items-center justify-between">
          {/* Mobile Menu Button and Logo Container */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              className="flex size-12 flex-col justify-center lg:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <span
                    key={index}
                    className="my-[3px] h-0.5 w-6 bg-foreground"
                  />
                ))}
            </button>

            {/* Logo - Centered on mobile, left on larger screens */}
            <Link
              to="/"
              className="lg:ml-0 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center text-2xl font-bold"
            >
              <img
                src="https://res.cloudinary.com/pukpuklouis/image/upload/s--Dq6anFk9--/KFZ/KFC-logo_wrjevi"
                alt="KFC Logo"
                className="h-8"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex lg:gap-4 items-center absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <NavItem key={link.title} link={link} />
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Button asChild size="3" radius="full">
              <Link to="/contact-us">{NavButtonText}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full mt-2 rounded-2xl border bg-popover shadow-lg lg:hidden"
          >
            <nav className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <MobileNavItem key={link.title} link={link} />
              ))}
              <Button asChild className="w-full mt-2 ">
                <Link
                  to="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {NavButtonText}
                </Link>
              </Button>
              <div className="flex justify-center mt-2">
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
