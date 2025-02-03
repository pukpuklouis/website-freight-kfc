import { Link } from '@remix-run/react';
import { FaFacebookF, FaLine, FaWeixin, FaQq } from 'react-icons/fa';
import { useTheme, themes } from '~/utils/theme';

interface SocialLink {
  name: string;
  id: string;
  url: string;
  icon: React.ReactNode;
}

interface NavLink {
  name: string;
  to: string;
}

interface ContactInfo {
  label: string;
  value: string;
}

interface FooterSection {
  title: string;
  children: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  { 
    name: 'Line',
    url: 'https://line.me/ti/p/~0932194674',
    id: '0932194674',
    icon: <FaLine className="w-5 h-5 text-green-500" />
  },
  {
    name: 'Line',
    url: 'https://line.me/ti/p/~12unisky',
    id: '12unisky',
    icon: <FaLine className="w-5 h-5 text-green-500" />
  },
  {
    name: 'WeChat',
    url: '#',
    id: 'a0932194674',
    icon: <FaWeixin className="w-5 h-5 text-green-500" />
  },
  {
    name: 'QQ',
    url: '#',
    id: '1794331657',
    icon: <FaQq className="w-5 h-5 text-gray-600" />
  }
];

const followLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100057394310703', icon: <FaFacebookF className="w-4 h-4" /> },
];

const quickLinks: NavLink[] = [
  { name: '首頁', to: '/' },
  { name: '關於我們', to: '/about-us' },
  { name: '服務', to: '/services' },
  { name: '未來營運', to: '/vision-roadmap' },
  { name: '聯絡我們', to: '/contact-us' }
];

const companyInfo = {
  name: 'KFC卡菲斯國際',
  slogan: '在全球物流和運輸解決方案的可靠夥伴',
  legalName: '卡菲斯國際有限公司/台海絲路運通有限公司',
  contacts: [
    { label: '電話', value: '(02)2935-1589' },
    { label: '傳真', value: '(02)2935-0833' },
    { label: '地址', value: '11670 台北市文山區羅斯福路六段142巷82號1樓' },
  ] as ContactInfo[]
};

const ContactItem = ({ label, value }: ContactInfo) => (
  <p>
    <span className="font-semibold">{label}:</span>{' '}
    <span className="">{value}</span>
  </p>
);

const FooterSection = ({ title, children }: FooterSection) => (
  <div>
    <h4 className="font-semibold mb-4">{title}</h4>
    {children}
  </div>
);

const QuickLinksSection = () => (
  <nav aria-label="Footer navigation">
    <FooterSection title="快速連結">
      <ul className="space-y-2">
        {quickLinks.map(({ name, to }) => (
          <li key={name}>
            <Link 
              to={to} 
              className="hover:text-[var(--accent-1)] transition-colors"
              prefetch="intent"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </FooterSection>
  </nav>
);

const SocialLinksSection = () => (
  <FooterSection title="聯絡方式">
    <ul className="space-y-2 text-sm">
      {socialLinks.map((link) => (
        <li key={link.name + link.id}>
          <a href={link.url} className="hover:text-[var(--accent-1)] transition-colors flex items-center gap-2">
            {link.icon}
            <span className="font-semibold">{link.name}:</span> {link.id}
          </a>
        </li>
      ))}
    </ul>
  </FooterSection>
);

const FollowSection = () => (
  <FooterSection title="追蹤我們">
    <div className="flex gap-4">
      {followLinks.map((link) => (
        <a 
          key={link.name}
          href={link.url} 
          className="hover:text-[var(--accent-1)] transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  </FooterSection>
);

const CompanySection = () => (
  <div>
    <div className="flex items-bottom justify-left gap-2">
      <img src="/KFC-logo.svg" alt="KFC Logo" className="h-8" />
      <h3 className="text-2xl font-bold mb-4">{companyInfo.name}</h3>
    </div>
    <p className="mb-4 text-[clamp(0.75rem,3vw+0.5rem,0.9rem)]">
      {companyInfo.slogan}
    </p>
    <div className="space-y-2 text-sm">
      <p className="text-[clamp(0.5rem,4vw+0.25rem,0.9rem)]">{companyInfo.legalName}</p>
      {companyInfo.contacts.map((contact) => (
        <ContactItem key={contact.label} {...contact} />
      ))}
    </div>
  </div>
);

export function Footer() {
  const { theme } = useTheme();
  const { accent, gray } = themes[theme];

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={`${theme === 'dark' ? 'bg-[var(--accent-2)] text-[var(--accent-12)]' : 'bg-[var(--accent-9)] text-[var(--accent-4)]'}`} 
      role="contentinfo"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <CompanySection />
          <QuickLinksSection />
          <SocialLinksSection />
          <FollowSection />
        </div>
        
        <div className={`border-t ${theme === 'dark' ? 'border-[var(--accent-7)]' : 'border-[var(--accent-6)]'} mt-8 pt-8 text-sm text-center`}>
          <p className="mb-2">&copy; {currentYear} 卡菲斯國際. All rights reserved.</p>
          <div className="flex justify-center gap-4 mb-4">
            <Link 
              to="/terms" 
              className="hover:text-[var(--accent-1)] transition-colors"
              prefetch="intent"
            >
              服務條款
            </Link>
            <span>•</span>
            <Link 
              to="/privacy" 
              className="hover:text-[var(--accent-1)] transition-colors"
              prefetch="intent"
            >
              隱私政策
            </Link>
          </div>
          <p className="">
            Design by{' '}
            <a 
              href="https://anlstudio.framer.website" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-1)] transition-colors"
            >
              A&LStudio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
