import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CollectionCalendar from './CollectionCalendar';
interface YearSelectionProps {
  years: number[];
  selectedYear: number;
  onYearClick: (year: number) => void;
}
const YearSelection = ({
  years,
  selectedYear,
  onYearClick
}: YearSelectionProps) => {
  const [showArrows, setShowArrows] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        const isPastHeader = headerRect.bottom < 0;
        setShowArrows(isPastHeader || isHoveringTitle);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHoveringTitle]);
  const scrollToProduct = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? Math.max(0, currentIndex - 1) : Math.min(products.length - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
  };
  const products = [{
    id: 1,
    name: "Genesis Oversized Tee",
    quote: "In the beginning was the Word...",
    verse: "John 1:1",
    price: 150,
    originalPrice: 170,
    edition: "003 of 365",
    image: "/api/placeholder/400/500",
    impact: "Literacy Programs",
    story: "Represents fundamental truth of creation and divine intention",
    isOnSale: true,
    rating: 4.5,
    reviewCount: 147
  }, {
    id: 2,
    name: "Faith Heavyweight Hoodie",
    quote: "Now faith is the substance of things hoped for...",
    verse: "Hebrews 11:1",
    price: 200,
    originalPrice: 230,
    edition: "027 of 365",
    image: "/api/placeholder/400/500",
    impact: "Youth Mentorship",
    story: "Embodies unwavering trust in divine providence",
    isOnSale: true,
    rating: 4.8,
    reviewCount: 203
  }, {
    id: 3,
    name: "Wisdom Long Sleeve",
    quote: "The fear of the Lord is the beginning of wisdom...",
    verse: "Proverbs 9:10",
    price: 150,
    originalPrice: 170,
    edition: "015 of 365",
    image: "/api/placeholder/400/500",
    impact: "Educational Scholarships",
    story: "Celebrates pursuit of divine understanding",
    isOnSale: true,
    rating: 4.6,
    reviewCount: 89
  }, {
    id: 4,
    name: "Hope Classic Tee",
    quote: "For I know the plans I have for you...",
    verse: "Jeremiah 29:11",
    price: 150,
    originalPrice: 170,
    edition: "041 of 365",
    image: "/api/placeholder/400/500",
    impact: "Community Outreach",
    story: "Celebrates God's perfect plan for our lives",
    isOnSale: true,
    rating: 4.7,
    reviewCount: 156
  }];

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-2xl w-full mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-black whitespace-nowrap">Collection Calendar</h1>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {years.map((year) => {
            const isFutureYear = year > currentYear;
            return (
              <button
                key={year}
                onClick={() => !isFutureYear && onYearClick(year)}
                disabled={isFutureYear}
                className={`p-2 md:p-4 rounded-xl transition-all ${
                  isFutureYear 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50' 
                    : selectedYear === year
                      ? 'bg-black text-white hover:scale-105'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:scale-105'
                }`}
              >
                <span className="text-lg md:text-xl font-semibold">{year}</span>
              </button>
            );
          })}
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-gray-700">Current: {selectedYear}</p>
          <p className="text-gray-500">Click a year to view months</p>
        </div>
      </div>
    </div>
  );
};

export default YearSelection;