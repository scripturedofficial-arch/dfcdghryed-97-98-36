import { useState, useMemo, useEffect, useRef } from "react";
import { Menu, X, ShoppingBag, Search, User, Globe } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import LanguageSelector from "@/components/LanguageSelector";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useIsMobile } from "@/hooks/use-mobile";
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  
  // Mobile header hide/show state
  const isMobile = useIsMobile();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  // Refs for click outside detection
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Mobile and medium screen scroll behavior
  useEffect(() => {
    // Apply scroll behavior to mobile and medium screens (up to lg breakpoint)
    const isLargeScreen = window.innerWidth >= 1024;
    if (isLargeScreen) {
      setIsHeaderVisible(true);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);
          
          // Only react to significant scroll movements
          if (scrollDifference > 10) {
            const newDirection = currentScrollY > lastScrollY ? 'down' : 'up';
            
            // Show header when at top of page or scrolling up
            if (currentScrollY < 100 || newDirection === 'up') {
              setIsHeaderVisible(true);
            } else if (newDirection === 'down') {
              setIsHeaderVisible(false);
            }
            
            setScrollDirection(newDirection);
            setLastScrollY(currentScrollY);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobile]);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close search interface
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
      
      // Close mobile menu
      if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isSearchOpen || isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchOpen, isMenuOpen]);
  const navItems = [{
    name: "36Five",
    href: "/shop"
  }, {
    name: "The 12",
    href: "/the-12"
  }, {
    name: "Journal",
    href: "/journal"
  }, {
    name: "Editorials",
    href: "/editorials"
  }, {
    name: "About",
    href: "/about"
  }];

  // Sample product data for search functionality
  const allProducts = [{
    id: 1,
    name: "Genesis Oversized Tee",
    quote: "In the beginning was the Word...",
    verse: "John 1:1",
    price: 150,
    category: "36Five"
  }, {
    id: 2,
    name: "Faith Heavyweight Hoodie",
    quote: "Now faith is the substance of things hoped for...",
    verse: "Hebrews 11:1",
    price: 180,
    category: "36Five"
  }, {
    id: 3,
    name: "Love Collection Tee",
    quote: "Love never fails...",
    verse: "1 Corinthians 13:8",
    price: 120,
    category: "The 12"
  }, {
    id: 4,
    name: "Peace Crewneck",
    quote: "Peace I leave with you...",
    verse: "John 14:27",
    price: 160,
    category: "The 12"
  }];

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.quote.toLowerCase().includes(searchQuery.toLowerCase()) || product.verse.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to shop page with search query
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };
  return <nav className={`fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-transform duration-300 ease-in-out ${
    !isHeaderVisible && window.innerWidth < 1024 ? '-translate-y-full' : 'translate-y-0'
  }`}>
      <div className="max-w-7xl mx-auto px-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="font-serif text-2xl font-bold glitch-hover ml-[10px] md:ml-[15px] lg:ml-[20px]">
              SCRIPTURED
            </a>
          </div>

          {/* Desktop Navigation */}
            <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map(item => <a key={item.name} href={item.href} className="text-sm font-medium hover:text-gray-600 transition-colors duration-200">
                  {item.name}
                </a>)}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2 md:mr-[10px]">
            <button onClick={() => {
              setIsSearchOpen(true);
              setIsMenuOpen(false);
            }} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Search className="w-5 h-5" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                  <User className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-4 bg-white border border-gray-200 shadow-lg z-50" sideOffset={8}>
                <div className="space-y-3">
                  <div className="md:block">
                    <LanguageSelector />
                  </div>
                  {user ? (
                    <>
                      <a href="/dashboard" className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors block text-center">
                        Profile
                      </a>
                      <button 
                        onClick={async () => {
                          await supabase.auth.signOut();
                          window.location.href = '/';
                        }}
                        className="w-full bg-white text-black py-3 px-4 rounded-md font-medium border border-gray-300 hover:bg-gray-50 transition-colors block text-center"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <a href="/signin" className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors block text-center">
                        Log in
                      </a>
                      <a href="/signup" className="w-full bg-white text-black py-3 px-4 rounded-md font-medium border border-gray-300 hover:bg-gray-50 transition-colors block text-center">
                        Sign up
                      </a>
                    </>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <CartDrawer />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsSearchOpen(false);
              }} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Interface */}
      {isSearchOpen && <div ref={searchRef} className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 z-[110] shadow-lg">
          <form onSubmit={handleSearchSubmit}>
            <div className="max-w-7xl mx-auto px-0">
              <div className="flex items-center h-16 space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="Search products, verses, or collections..." className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <button type="submit" className="hidden sm:inline-flex px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium transition-colors duration-200">
                  <span className="hidden sm:inline">Search</span>
                  <Search className="sm:hidden w-5 h-5" />
                </button>
                <button type="button" onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }} className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200">
                  Cancel
                </button>
              </div>
            </div>
          </form>
          
          {/* Search Results Dropdown */}
          {searchQuery && searchResults.length > 0 && <div className="max-w-7xl mx-auto px-0 pb-4">
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-2">
                  <p className="text-sm text-gray-500 px-3 py-2">Search Results</p>
                  {searchResults.slice(0, 5).map(product => <button key={product.id} onClick={() => {
              window.location.href = `/shop?search=${encodeURIComponent(product.name)}`;
              setIsSearchOpen(false);
              setSearchQuery("");
            }} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.verse} • {product.category}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${product.price}</p>
                      </div>
                    </button>)}
                  {searchResults.length > 5 && <button onClick={() => {
              window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
              setIsSearchOpen(false);
              setSearchQuery("");
            }} className="w-full text-center px-3 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View all {searchResults.length} results
                    </button>}
                </div>
              </div>
            </div>}
          
          {/* No Results */}
          {searchQuery && searchResults.length === 0 && <div className="max-w-7xl mx-auto px-0 pb-4">
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                <p className="text-gray-500 text-center">No products found for "{searchQuery}"</p>
              </div>
            </div>}
        </div>}

      {/* Mobile menu */}
      {isMenuOpen && <div ref={mobileMenuRef} className="md:hidden bg-white border-t border-gray-200 relative z-[110]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => <a key={item.name} href={item.href} className="block px-3 py-2 text-base font-medium hover:bg-gray-50 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </a>)}
            <div className="px-3 py-2 bg-white">
              <LanguageSelector />
            </div>
          </div>
        </div>}
    </nav>;
};
export default Navigation;