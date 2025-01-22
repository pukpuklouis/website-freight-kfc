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
  { name: 'Services', to: '#services' },
  { name: 'Features', to: '#features' },
  { name: 'Pricing', to: '#pricing' },
  { name: 'Contact', to: '#contact' }
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">卡菲斯國際</h3>
            <p className="text-sm mb-4 font-light">
              在全球物流和運輸解決方案的可靠夥伴
            </p>
            <div className="space-y-2 text-sm">
              <p>卡菲斯國際有限公司/台海絲路運通有限公司</p>
              <p>
                <span className="font-semibold">電話:</span> (02)2935-1589
              </p>
              <p>
                <span className="font-semibold">傳真:</span> (02)2935-0833
              </p>
              <p>
                <span className="font-semibold">地址:</span>{' '}
                11670台北市文山區羅斯福路六段142巷82號1樓
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
          <p className="mb-2">&copy; {currentYear} KFC Freight. All rights reserved.</p>
          <p className="text-gray-500">
            Design by{' '}
            <a 
              href="https://anlstudio.framer.website" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              A&Lstudio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
