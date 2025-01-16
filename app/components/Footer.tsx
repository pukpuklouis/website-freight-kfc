import { Link } from '@remix-run/react';

interface SocialLink {
  name: string;
  url: string;
}

interface QuickLink {
  name: string;
  to: string;
}

const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', url: '#' },
  { name: 'Twitter', url: '#' },
  { name: 'Facebook', url: '#' }
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
            <h3 className="text-xl font-bold text-white mb-4">KFC Freight</h3>
            <p className="text-sm">
              Your trusted partner in global logistics and freight solutions.
            </p>
          </div>
          
          <nav aria-label="Footer navigation">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
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
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <address className="space-y-2 text-sm not-italic">
              <p>Email: <a href="mailto:info@kfcfreight.com" className="hover:text-white transition-colors">info@kfcfreight.com</a></p>
              <p>Phone: <a href="tel:+15551234567" className="hover:text-white transition-colors">+1 (555) 123-4567</a></p>
              <p>
                Address: 123 Logistics Way,<br />
                Business District, 12345
              </p>
            </address>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map(({ name, url }) => (
                <a 
                  key={name}
                  href={url}
                  className="hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${name} page`}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {currentYear} KFC Freight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
