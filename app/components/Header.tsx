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
  { title: "服務", url: "/services" },
  { title: "未來營運", url: "/vision-roadmap" },
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
          <Button 
            variant="soft" 
            className="flex items-center gap-1 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.title}
            <RxChevronDown className="size-4" />
          </Button>
          <div className="absolute left-0 top-full hidden pt-2 group-hover:block">
            <div className="w-48 rounded-lg border bg-[var(--theme-gray-1)] p-2 shadow-md">
              {link.subMenuLinks.map((subLink) => (
                <Link
                  key={subLink.title}
                  to={subLink.url}
                  className="block rounded-md px-2 py-1.5 text-sm text-[var(--theme-gray-11)] transition-colors hover:bg-[var(--theme-gray-11)] hover:text-[var(--theme-gray-1)]"
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
        className="py-2 text-md font-bold text-[var(--gray-11)] transition-colors hover:text-foreground"
      >
        {link.title}
      </Link>
    );
  };

  const MobileNavItem = ({ link }: { link: NavLink }) => (
    <Link
      to={link.url}
      className="w-full rounded-lg px-3 py-2 text-md font-medium text-[var(--gray-11)] transition-colors hover:bg-accent hover:text-accent-foreground"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {link.title}
    </Link>
  );

  return (
    <section 
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[min(900px,calc(100%-2rem))] z-50"
      style={{
        '--theme-gray-1': grayColors[1],
        '--theme-gray-12': grayColors[12]
      } as React.CSSProperties}
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
              <img src="https://res.cloudinary.com/pukpuklouis/image/upload/s--Dq6anFk9--/KFZ/KFC-logo_wrjevi" alt="KFC Logo" className="h-8" />
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
            <Button asChild>
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
                <Link to="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>{NavButtonText}</Link>
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
