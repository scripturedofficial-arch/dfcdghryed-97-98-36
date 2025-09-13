import { Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import CurrencySelector from "@/components/CurrencySelector";
const Footer = () => {
  const footerLinks = {
    company: ['About', 'Manifesto', 'The 12', 'Impact Report'],
    content: ['Journal', 'Editorials'],
    support: ['Contact', 'FAQ', 'Shipping & Returns', 'Size Return'],
    shop: ['Made-to-Order', 'Size Guide']
  };
  return <footer className="bg-black text-white pt-16 pb-[10px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="mb-12">
          {/* Brand Section */}
          <div className="mb-12">
            {/* Brand Info with Email Subscription */}
            <div className="flex-1 flex flex-col sm:flex-row gap-6 lg:gap-8">
              {/* Brand Info */}
              <div className="flex-1">
                <h3 className="font-serif text-2xl font-bold mb-4">SCRIPTURED</h3>
                <p className="text-gray-300 mb-6 max-w-sm">Where ancient wisdom meets modern streetwear. Fashion with purpose, impact with intention.</p>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/scriptured.official/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors duration-200">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://x.com/ScripturedHQ" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors duration-200">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                    <img src="/lovable-uploads/e8ba378f-6b25-4baa-97de-658c1b714c65.png" alt="Social media icon" className="w-6 h-6" />
                  </a>
                  <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              {/* Newsletter Signup - Desktop */}
              <div className="hidden sm:block flex-1 max-w-md">
                <h2 className="font-serif text-2xl font-bold mb-4">
                  Stay Inspired
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Get our latest scripture meditations and design stories delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row">
                  <input type="email" placeholder="Enter your email" className="flex-1 bg-gray-900 border border-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white sm:rounded-l sm:rounded-r-none rounded" />
                  <button className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition-colors duration-200 sm:rounded-r sm:rounded-l-none rounded mt-2 sm:mt-0">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => <div key={category}>
                <h4 className="font-medium text-sm uppercase tracking-wide mb-4">
                  {category}
                </h4>
                <ul className="space-y-1">
                  {links.map(link => <li key={link}>
                      {link === 'Journal' ? <Link to="/journal" onClick={() => window.scrollTo(0, 0)} className="text-gray-300 text-sm hover:text-white transition-colors duration-200">
                          {link}
                        </Link> : link === 'Editorials' ? <Link to="/editorials" onClick={() => window.scrollTo(0, 0)} className="text-gray-300 text-sm hover:text-white transition-colors duration-200">
                          {link}
                        </Link> : link === 'Size Guide' ? <Link to="/size-guide" onClick={() => window.scrollTo(0, 0)} className="text-gray-300 text-sm hover:text-white transition-colors duration-200">
                          {link}
                        </Link> : link === 'Size Return' ? <Link to="/size-return" onClick={() => window.scrollTo(0, 0)} className="text-gray-300 text-sm hover:text-white transition-colors duration-200">
                          {link}
                        </Link> : link === 'Shipping & Returns' ? <Link to="/shipping-returns" onClick={() => window.scrollTo(0, 0)} className="text-gray-300 text-sm hover:text-white transition-colors duration-200">
                          {link}
                        </Link> : link === 'About' ? <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="text-gray-300 text-sm hover:text-white transition-colors duration-200">
                          {link}
                        </Link> : link === 'Contact' ? <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="text-gray-300 text-sm hover:text-white transition-colors duration-200">
                          {link}
                        </Link> : link === 'Manifesto' ? <Link to="/manifesto" onClick={() => window.scrollTo(0, 0)} className="text-gray-300 text-sm hover:text-white transition-colors duration-200">
                          {link}
                        </Link> : link === 'FAQ' ? <Link to="/faq" onClick={() => window.scrollTo(0, 0)} className="text-gray-300 text-sm hover:text-white transition-colors duration-200">
                          {link}
                        </Link> : link === 'Made-to-Order' ? <Link to="/made-to-order" onClick={() => window.scrollTo(0, 0)} className="text-gray-300 text-sm hover:text-white transition-colors duration-200">
                          {link}
                        </Link> : <a href="#" className="text-gray-300 text-sm hover:text-white transition-colors duration-200">
                          {link}
                        </a>}
                    </li>)}
                </ul>
              </div>)}
          </div>
        </div>

        {/* Newsletter Signup - Mobile Only */}
        <div className="sm:hidden mb-12">
          <h2 className="font-serif text-2xl font-bold mb-4 text-center">
            Stay Inspired
          </h2>
          <p className="text-lg text-gray-300 mb-6 text-center">
            Get our latest scripture meditations and design stories delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 bg-gray-900 border border-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white sm:rounded-l sm:rounded-r-none rounded" />
            <button className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition-colors duration-200 sm:rounded-r sm:rounded-l-none rounded mt-2 sm:mt-0">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-sm text-gray-400">
            <CurrencySelector />
            <div className="flex space-x-6">
            <Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/shipping-returns" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors duration-200">Shippings & Returns</Link>
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            <p>© 2025 Scriptured. All rights reserved.</p>
          </div>
          
          
        </div>
      </div>
    </footer>;
};
export default Footer;