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
        <div className="group relative" data-oid="rz7-9su">
          <div
            className="flex items-center gap-1 py-2 text-lg font-medium text-[var(--accent-9)] transition-colors hover:text-[var(--accent-11)]"
            data-oid="a4odllj"
          >
            {link.title}
            <RxChevronDown className="size-4" data-oid="kfc61hx" />
          </div>
          <div
            className="absolute left-0 top-full hidden pt-2 group-hover:block"
            data-oid="_jcfvyi"
          >
            <div
              className="w-48 rounded-lg border border-[var(--accent-6)] bg-background/70 backdrop-blur-sm p-2 shadow-lg"
              data-oid="t7n4ycj"
            >
              {link.subMenuLinks.map((subLink) => (
                <Link
                  key={subLink.title}
                  to={subLink.url}
                  className="block rounded-md px-2 py-1.5 text-md text-[var(--accent-9)] transition-colors hover:bg-[var(--accent-9)] hover:text-[var(--gray-1)] dark:hover:bg-[var(--accent-8)] dark:hover:text-[var(--gray-12)]"
                  data-oid="8k:aa:a"
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
        data-oid="rwi.i38"
      >
        {link.title}
      </Link>
    );
  };

  const MobileNavItem = ({ link }: { link: NavLink }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    if (link.subMenuLinks) {
      return (
        <div className="w-full" data-oid="22qjc9r">
          <button
            onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-md font-medium text-[var(--gray-11)] transition-colors hover:bg-accent hover:text[var(--accent-7)]"
            data-oid="0irfe9e"
          >
            {link.title}
            <RxChevronDown
              className={`size-4 transition-transform ${
                isSubMenuOpen ? "rotate-180" : ""
              }`}
              data-oid=".vqc2d5"
            />
          </button>
          <AnimatePresence data-oid="pm3bhx5">
            {isSubMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
                data-oid="5-f2qmi"
              >
                <div
                  className="ml-4 mt-1 flex flex-col gap-1"
                  data-oid="ui0j63l"
                >
                  {link.subMenuLinks.map((subLink) => (
                    <Link
                      key={subLink.title}
                      to={subLink.url}
                      className="rounded-lg px-3 py-2 text-sm text-[var(--gray-11)] transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-oid="nj8uwqn"
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
        data-oid="83e61w4"
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
      data-oid="rh1_gju"
    >
      <div
        className="px-6 rounded-full bg-background/60 backdrop-blur-md border shadow-sm"
        data-oid="x6svic3"
      >
        <div
          className="relative flex h-14 items-center justify-between"
          data-oid="67zd8it"
        >
          {/* Mobile Menu Button and Logo Container */}
          <div className="flex items-center" data-oid="-ylae0b">
            {/* Mobile Menu Button */}
            <button
              className="flex size-12 flex-col justify-center lg:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              data-oid="34atzc."
            >
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <span
                    key={index}
                    className="my-[3px] h-0.5 w-6 bg-foreground"
                    data-oid="nardpl8"
                  />
                ))}
            </button>

            {/* Logo - Centered on mobile, left on larger screens */}
            <Link
              to="/"
              className="lg:ml-0 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center text-2xl font-bold"
              data-oid="am4w1yi"
            >
              <img
                src="https://res.cloudinary.com/pukpuklouis/image/upload/s--Dq6anFk9--/KFZ/KFC-logo_wrjevi"
                alt="KFC Logo"
                className="h-8"
                data-oid="c9rmy6g"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav
            className="hidden lg:flex lg:gap-4 items-center absolute left-1/2 -translate-x-1/2"
            data-oid="kp5.tie"
          >
            {navLinks.map((link) => (
              <NavItem key={link.title} link={link} data-oid="t:9lffo" />
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4" data-oid="1kmbp9v">
            <ThemeToggle data-oid="83tid3e" />
            <Button asChild size="3" radius="full" data-oid="53dgh6:">
              <Link to="/contact-us" data-oid="xhgvy4-">
                {NavButtonText}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence data-oid="p8o4kun">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full mt-2 rounded-2xl border bg-popover shadow-lg lg:hidden"
            data-oid="vnxfss2"
          >
            <nav className="flex flex-col gap-2 p-4" data-oid="iyt:mci">
              {navLinks.map((link) => (
                <MobileNavItem
                  key={link.title}
                  link={link}
                  data-oid="5s7:xa0"
                />
              ))}
              <Button asChild className="w-full mt-2 " data-oid="bek4h:9">
                <Link
                  to="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-oid="717enux"
                >
                  {NavButtonText}
                </Link>
              </Button>
              <div className="flex justify-center mt-2" data-oid="87eqj7e">
                <ThemeToggle data-oid="9qz6cog" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
