import { useState } from "react";
import { Link } from "@remix-run/react";
// import { Button } from "~/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@radix-ui/themes";
import { useTheme, themes } from "~/utils/theme";
import "@radix-ui/themes/styles.css";
import type { ServiceLink } from "~/models/service.server";

interface NavLink {
  title: string;
  url: string;
  subMenuLinks?: ServiceLink[];
}

interface HeaderProps {
  serviceLinks: ServiceLink[];
}

const NavButtonText = "跨境下單";

export function Header({ serviceLinks }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const accentColor = themes[theme].accent;
  const grayColors = themes[theme].gray;

  const NavItem = ({ link }: { link: NavLink }) => {
    if (link.subMenuLinks) {
      return (
        <div className="group relative" data-oid="m2a3y68">
          <div
            className="flex items-center gap-1 py-2 text-lg font-medium text-[var(--accent-9)] transition-colors hover:text-[var(--accent-11)]"
            data-oid="y0eu3l4"
          >
            {link.title}
            <RxChevronDown className="size-4" data-oid="w3xdspa" />
          </div>
          <div
            className="absolute left-0 top-full hidden pt-2 group-hover:block"
            data-oid="sgi2kyd"
          >
            <div
              className="w-[18rem] rounded-lg border border-[var(--accent-8)] bg-[var(--gray-a3)] backdrop-blur-sm p-2 shadow-lg transition-all duration-300"
              data-oid="rs0ww6i"
            >
              {link.subMenuLinks.map((subLink) => (
                <Link
                  key={subLink.title}
                  to={subLink.url}
                  className="block rounded-md px-2 py-1.5 text-md text-[var(--accent-9)] transition-colors hover:bg-[var(--accent-9)] hover:text-[var(--gray-1)] dark:hover:bg-[var(--accent-8)] dark:hover:text-[var(--gray-12)]"
                  data-oid="jgi9e5x"
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
        data-oid="dix:9g0"
      >
        {link.title}
      </Link>
    );
  };

  const MobileNavItem = ({ link }: { link: NavLink }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    if (link.subMenuLinks) {
      return (
        <div className="w-full" data-oid=":e-r02x">
          <Button
            onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-md font-medium text-[var(--gray-11)] transition-colors hover:bg-accent hover:text[var(--accent-7)]"
            data-oid="._.gpe."
          >
            {link.title}
            <RxChevronDown
              className={`size-4 transition-transform ${
                isSubMenuOpen ? "rotate-180" : ""
              }`}
              data-oid="uw77.ky"
            />
          </Button>
          <AnimatePresence data-oid="xd.rt8o">
            {isSubMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
                data-oid="iogu9og"
              >
                <div
                  className="ml-4 mt-1 flex flex-col gap-1"
                  data-oid="1do-69g"
                >
                  {link.subMenuLinks.map((subLink) => (
                    <Link
                      key={subLink.title}
                      to={subLink.url}
                      className="rounded-lg px-3 py-2 text-sm text-[var(--gray-11)] transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-oid="8azs6eo"
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
        data-oid="pqk7z7l"
      >
        {link.title}
      </Link>
    );
  };

  const navLinks: NavLink[] = [
    { title: "關於我們", url: "/about-us" },
    {
      title: "服務項目",
      url: "/services",
      subMenuLinks: serviceLinks
    },
    { title: "聯絡我們", url: "/contact-us" },
  ];

  return (
    <section
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[min(900px,calc(100%-2rem))] z-50"
      style={
        {
          "--theme-gray-1": grayColors[1],
          "--theme-gray-12": grayColors[12],
        } as React.CSSProperties
      }
      data-oid="1.l3v:j"
    >
      <div
        className="px-6 rounded-full bg-[var(--gray-a3)] backdrop-blur-md border border-[var(--accent-8)] shadow-sm transition duration-300"
        data-oid="g2dw62s"
      >
        <div
          className="relative flex h-14 items-center justify-between"
          data-oid="vv7jcw-"
        >
          {/* Mobile Menu Button and Logo Container */}
          <div className="flex items-center" data-oid="1xjqx9.">
            {/* Mobile Menu Button */}
            <button
              className="flex size-12 flex-col justify-center lg:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              data-oid="332cbfs"
            >
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <span
                    key={index}
                    className="my-[3px] h-0.5 w-6 bg-foreground"
                    data-oid="7lushob"
                  />
                ))}
            </button>

            {/* Logo - Centered on mobile, left on larger screens */}
            <Link
              to="/"
              className="lg:ml-0 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center text-2xl font-bold"
              data-oid=".5l77gw"
            >
              <img
                src="https://res.cloudinary.com/pukpuklouis/image/upload/s--Dq6anFk9--/KFZ/KFC-logo_wrjevi"
                alt="KFC Logo"
                className="h-8"
                data-oid="bvr6kiz"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav
            className="hidden lg:flex lg:gap-4 items-center absolute left-1/2 -translate-x-1/2"
            data-oid="_pv1_bo"
          >
            {navLinks.map((link) => (
              <NavItem key={link.title} link={link} data-oid="xckao84" />
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4" data-oid="jzv8fbr">
            <ThemeToggle data-oid="qd39mo0" />
            <Button asChild size="3" radius="full" data-oid="nla0jpk">
              <Link to="/contact-us" data-oid="cs6zu6y">
                {NavButtonText}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence data-oid=".lx_72p">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full mt-2 rounded-2xl border bg-popover shadow-lg lg:hidden"
            data-oid="hq71fzz"
          >
            <nav className="flex flex-col gap-2 p-4" data-oid="r7m20mr">
              {navLinks.map((link) => (
                <MobileNavItem
                  key={link.title}
                  link={link}
                  data-oid="as7gin1"
                />
              ))}
              <Button asChild className="w-full mt-2 " data-oid="vdriy8l">
                <Link
                  to="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-oid="c09mbjt"
                >
                  {NavButtonText}
                </Link>
              </Button>
              <div className="flex justify-center mt-2" data-oid="2wi2j8u">
                <ThemeToggle data-oid="r54:2ii" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
