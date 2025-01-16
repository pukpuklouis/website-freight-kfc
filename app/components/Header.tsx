import { Link } from '@remix-run/react';
import { Button } from '~/components/ui/button';

export function Header() {
  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          KFC Freight
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/services" className="hover:text-primary transition-colors">
            Services
          </Link>
          <Link to="/features" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link to="/get-started">Get Started</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
