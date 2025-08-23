import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroGenesis from "@/assets/hero-genesis.jpg";

const ArticleDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  // Featured article data
  const featuredArticle = {
    id: 1,
    title: "The Word as Foundation",
    excerpt: "Exploring John 1:1 and its significance in our Genesis Collection design philosophy.",
    author: "Team",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "Scripture Study",
    image: heroGenesis,
    content: `
      <h2>In the Beginning Was the Word</h2>
      <p>The opening words of John's Gospel carry profound meaning that transcends time and culture. "In the beginning was the Word, and the Word was with God, and the Word was God." This foundational truth shapes not only our understanding of divine revelation but also our approach to design and creativity.</p>
      
      <h3>The Creative Power of Language</h3>
      <p>Just as God spoke creation into existence, words carry the power to create, transform, and inspire. Our Genesis Collection draws from this fundamental truth - that language, when infused with divine purpose, becomes a tool of creation and transformation.</p>
      
      <h3>Design Philosophy</h3>
      <p>Each piece in our Genesis Collection is carefully crafted to reflect the creative power of the Word. The typography, the placement, the very fabric itself becomes a canvas for divine truth. We believe that fashion can be a form of witness, a way of carrying sacred words into everyday spaces.</p>
      
      <h3>Living the Word</h3>
      <p>When we wear scripture, we're reminded that these ancient words are not merely historical artifacts but living, breathing truths that speak to our contemporary struggles and aspirations. The Word becomes flesh not only in the incarnation but in our daily lives as we embody these truths.</p>
      
      <h3>Community and Connection</h3>
      <p>Scripture worn becomes scripture shared. Each piece opens conversations, creates connections, and builds community around shared values and beliefs. In a world that often feels fragmented, these words serve as bridges between hearts and minds.</p>
    `
  };

  // Only show the article if it matches the category
  if (category !== 'scripture-article') {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navigation />
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-3xl font-bold mb-4">Article Not Found</h1>
            <Button onClick={() => navigate('/journal')}>
              Return to Journal
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      {/* Back Button */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/journal')}
            className="mb-8 text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gray-100 rounded-lg mb-8 overflow-hidden">
            <img 
              src={featuredArticle.image} 
              alt={`${featuredArticle.title} - Scriptured Journal`} 
              className="w-full h-full object-cover" 
              loading="lazy" 
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-sm text-gray-500 uppercase tracking-wide">
              <span className="bg-gray-100 px-3 py-1 rounded">{featuredArticle.category}</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              {featuredArticle.title}
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed">
              {featuredArticle.excerpt}
            </p>
            
            <div className="flex items-center text-sm text-gray-500 border-t border-b border-gray-200 py-4">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="mr-4">{featuredArticle.date}</span>
              <User className="w-4 h-4 mr-2" />
              <span className="mr-4">{featuredArticle.author}</span>
              <Clock className="w-4 h-4 mr-2" />
              <span>{featuredArticle.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: featuredArticle.content }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArticleDetail;