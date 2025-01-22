import { Link } from '@remix-run/react';
import { FaFacebookF, FaLine, FaWeixin, FaQq } from 'react-icons/fa';

interface SocialLink {
  name: string;
  url: string;
  id: string;
  icon: React.ReactNode;
}

interface QuickLink {
  name: string;
  to: string;
}

interface FollowLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  { 
    name: 'Line',
    url: 'https://line.me/ti/p/~0932194674',
    id: '0932194674',
    icon: <FaLine className="w-5 h-5" />
  },
  {
    name: 'Line',
    url: 'https://line.me/ti/p/~12unisky',
    id: '12unisky',
    icon: <FaLine className="w-5 h-5" />
  },
  {
    name: 'WeChat',
    url: '#',
    id: 'a0932194674',
    icon: <FaWeixin className="w-5 h-5" />
  },
  {
    name: 'QQ',
    url: '#',
    id: '1794331657',
    icon: <FaQq className="w-5 h-5" />
  }
];

const followLinks: FollowLink[] = [
  {
    name: 'Facebook',
    url: '#',
    icon: <FaFacebookF className="w-5 h-5" />
  }
];

const quickLinks: QuickLink[] = [
  { name: '服務項目', to: '/services' },
  { name: '願景藍圖', to: '/vision-roadmap' },
  { name: '關於我們', to: '/about-us' },
  { name: '聯絡我們', to: '/contact-us' }
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">KFZ卡菲斯國際</h3>
            <p className="text-sm mb-4 font-thin">
              在全球物流和運輸解決方案的可靠夥伴
            </p>
            <div className="space-y-2 text-sm">
              <p>卡菲斯國際有限公司/台海絲路運通有限公司</p>
              <p>
                <span className="font-semibold">電話:</span> <span className="font-thin">(02)2935-1589</span>
              </p>
              <p>
                <span className="font-semibold">傳真:</span> <span className="font-thin">(02)2935-0833</span>
              </p>
              <p>
                <span className="font-semibold">地址:</span> <span className="font-thin">11670 台北市文山區羅斯福路六段142巷82號1樓</span>
              </p>
            </div>
          </div>
          
          <nav aria-label="Footer navigation">
            <h4 className="text-white font-semibold mb-4">快速連結</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ name, to }) => (
                <li key={name}>
                  <Link 
                    to={to} 
                    className="hover:text-white transition-colors"
                    prefetch="intent"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div>
            <h4 className="text-white font-semibold mb-4">聯絡方式</h4>
            <ul className="space-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.name + link.id}>
                  <a href={link.url} className="hover:text-white transition-colors flex items-center gap-2">
                    {link.icon}
                    <span className="font-semibold">{link.name}:</span> {link.id}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">追蹤我們</h4>
            <div className="flex gap-4">
              {followLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url} 
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${link.name}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p className="mb-2">&copy; {currentYear} 卡菲斯國際. All rights reserved.</p>
          <div className="flex justify-center gap-4 mb-4 text-gray-500">
            <Link 
              to="/terms" 
              className="hover:text-white transition-colors"
              prefetch="intent"
            >
              服務條款
            </Link>
            <span>•</span>
            <Link 
              to="/privacy" 
              className="hover:text-white transition-colors"
              prefetch="intent"
            >
              隱私政策
            </Link>
          </div>
          <p className="text-gray-500">
            Design by{' '}
            <a 
              href="https://anlstudio.framer.website" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              A&LStudio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
