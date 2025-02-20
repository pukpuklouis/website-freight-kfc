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
        <div className="group relative" data-oid="4m6jk.r">
          <Button
            variant="soft"
            className="flex items-center gap-1 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            data-oid="y65:0x1"
          >
            {link.title}
            <RxChevronDown className="size-4" data-oid="nt881ow" />
          </Button>
          <div
            className="absolute left-0 top-full hidden pt-2 group-hover:block"
            data-oid="5xo0s9b"
          >
            <div
              className="w-48 rounded-lg border bg-[var(--theme-gray-1)] p-2 shadow-md"
              data-oid="uqyts4:"
            >
              {link.subMenuLinks.map((subLink) => (
                <Link
                  key={subLink.title}
                  to={subLink.url}
                  className="block rounded-md px-2 py-1.5 text-sm text-[var(--theme-gray-11)] transition-colors hover:bg-[var(--theme-gray-11)] hover:text-[var(--theme-gray-1)]"
                  data-oid="pe9l_g8"
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
        data-oid="2wr.n-m"
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
      data-oid="ig5cuiz"
    >
      {link.title}
    </Link>
  );

  return (
    <section
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[min(900px,calc(100%-2rem))] z-50"
      style={
        {
          "--theme-gray-1": grayColors[1],
          "--theme-gray-12": grayColors[12],
        } as React.CSSProperties
      }
      data-oid="y5oj1zu"
    >
      <div
        className="px-6 rounded-full bg-background/60 backdrop-blur-md border shadow-sm"
        data-oid="p5wnef9"
      >
        <div
          className="relative flex h-14 items-center justify-between"
          data-oid="6pevw9t"
        >
          {/* Mobile Menu Button and Logo Container */}
          <div className="flex items-center" data-oid="c7mxxlj">
            {/* Mobile Menu Button */}
            <button
              className="flex size-12 flex-col justify-center lg:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              data-oid="yx_-vbr"
            >
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <span
                    key={index}
                    className="my-[3px] h-0.5 w-6 bg-foreground"
                    data-oid="3u:gf-a"
                  />
                ))}
            </button>

            {/* Logo - Centered on mobile, left on larger screens */}
            <Link
              to="/"
              className="lg:ml-0 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center text-2xl font-bold"
              data-oid="purk.v9"
            >
              <img
                src="https://res.cloudinary.com/pukpuklouis/image/upload/s--Dq6anFk9--/KFZ/KFC-logo_wrjevi"
                alt="KFC Logo"
                className="h-8"
                data-oid="t3cb-f0"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav
            className="hidden lg:flex lg:gap-4 items-center absolute left-1/2 -translate-x-1/2"
            data-oid=":u0afop"
          >
            {navLinks.map((link) => (
              <NavItem key={link.title} link={link} data-oid="mpzd:0i" />
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4" data-oid="4fopkb9">
            <ThemeToggle data-oid=".esfn5s" />
            <Button asChild data-oid="b13gez7">
              <Link to="/contact-us" data-oid="i1_pl4h">
                {NavButtonText}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence data-oid=":uodpm8">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full mt-2 rounded-2xl border bg-popover shadow-lg lg:hidden"
            data-oid=":w6r-c0"
          >
            <nav className="flex flex-col gap-2 p-4" data-oid="_cwmm_m">
              {navLinks.map((link) => (
                <MobileNavItem
                  key={link.title}
                  link={link}
                  data-oid=".v-n88_"
                />
              ))}
              <Button asChild className="w-full mt-2 " data-oid="zbqq87o">
                <Link
                  to="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-oid="bt:y-w2"
                >
                  {NavButtonText}
                </Link>
              </Button>
              <div className="flex justify-center mt-2" data-oid="yj6two1">
                <ThemeToggle data-oid="1ekmidk" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
