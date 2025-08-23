import { Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ArticleFooter = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand and Social */}
        <div className="text-center mb-8">
          <h3 className="font-serif text-2xl font-bold mb-4">SCRIPTURED</h3>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Divine by Design. Where ancient wisdom meets modern streetwear.
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Essential Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-400 border-t border-gray-800 pt-8">
          <Link to="/" className="hover:text-white transition-colors duration-200">
            Back to Main Site
          </Link>
          <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-white transition-colors duration-200">
            Terms of Service
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 mt-6">
          <p>© 2025 Scriptured. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ArticleFooter;