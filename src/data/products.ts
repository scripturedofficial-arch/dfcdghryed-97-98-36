export interface Product {
  id: number;
  name: string;
  quote: string;
  verse: string;
  price: number;
  edition: string;
  image: string;
  impact: string;
  story: string;
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Origin Oversized Tee",
    quote: "In the beginning was the Word...",
    verse: "John 1:1",
    price: 150,
    edition: "003 of 365",
    image: "/api/placeholder/400/500",
    impact: "Literacy Programs",
    story: "Represents fundamental truth of creation and divine intention",
    rating: 4.5,
    reviewCount: 147
  },
  {
    id: 2,
    name: "Trust Heavyweight Hoodie",
    quote: "Now faith is the substance of things hoped for...",
    verse: "Hebrews 11:1",
    price: 200,
    edition: "027 of 365",
    image: "/api/placeholder/400/500",
    impact: "Youth Mentorship",
    story: "Embodies unwavering trust in divine providence",
    rating: 4.8,
    reviewCount: 203
  },
  {
    id: 3,
    name: "Knowledge Long Sleeve",
    quote: "The fear of the Lord is the beginning of wisdom...",
    verse: "Proverbs 9:10",
    price: 150,
    edition: "015 of 365",
    image: "/api/placeholder/400/500",
    impact: "Educational Scholarships",
    story: "Celebrates pursuit of divine understanding",
    rating: 4.6,
    reviewCount: 89
  },
  {
    id: 4,
    name: "Future Classic Tee",
    quote: "For I know the plans I have for you...",
    verse: "Jeremiah 29:11",
    price: 150,
    edition: "041 of 365",
    image: "/api/placeholder/400/500",
    impact: "Community Outreach",
    story: "Celebrates God's perfect plan for our lives",
    rating: 4.7,
    reviewCount: 156
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};