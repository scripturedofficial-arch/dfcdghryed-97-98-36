import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArticleFooter from "@/components/ArticleFooter";
import { Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroGenesis from "@/assets/hero-genesis.jpg";
import heroFaith from "@/assets/hero-faith.jpg";
import heroWisdom from "@/assets/hero-wisdom.jpg";
const Journal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const articles = [{
    id: 1,
    title: "The Word as Foundation",
    excerpt: "Exploring John 1:1 and its significance in our Genesis Collection design philosophy.",
    author: "Team",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "Scripture Study"
  }, {
    id: 2,
    title: "Faith in Uncertain Times",
    excerpt: "How Hebrews 11:1 speaks to modern struggles and why we chose it for our Faith Hoodie.",
    author: "Team",
    date: "December 10, 2024",
    readTime: "7 min read",
    category: "Religion"
  }, {
    id: 3,
    title: "The Beginning of Wisdom",
    excerpt: "Unpacking Proverbs 9:10 and the importance of reverence in contemporary culture.",
    author: "Team",
    date: "December 5, 2024",
    readTime: "6 min read",
    category: "Philosophy"
  }];

  // Filter articles based on category
  const displayedArticles = category === 'philosophy' ? articles.filter(article => article.category === "Philosophy") : articles;
  const handleArticleClick = (article: any) => {
    if (article.category === "Philosophy") {
      navigate('/philosophy');
      window.scrollTo(0, 0);
    } else if (article.category === "Religion") {
      navigate('/religion');
      window.scrollTo(0, 0);
    }
  };
  const articleImages: Record<number, {
    src: string;
    alt: string;
  }> = {
    2: {
      src: heroFaith,
      alt: "Faith in Uncertain Times - Faith Hoodie inspiration"
    },
    3: {
      src: heroWisdom,
      alt: "The Beginning of Wisdom - Proverbs 9:10 visual"
    }
  };
  return <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      {/* Back Button for Category Views */}
      {category && <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => navigate('/journal')} className="mb-8 text-gray-600 hover:text-black">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Journal
            </Button>
          </div>
        </div>}
      
      {/* Hero Section */}
      <div className={`${category ? 'pt-8' : 'pt-20'} pb-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8">
            {category === 'philosophy' ? 'Philosophy' : 'Journal'}
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 max-w-2xl mx-auto">
            {category === 'philosophy' ? 'Exploring life\'s deepest questions through the intersection of faith and reason.' : 'Scripture breakdowns, design inspirations, and reflections on faith meeting fashion.'}
          </p>
        </div>
      </div>

      {/* Featured Article - Only show when not in category view */}
      {!category && <div className="px-4 sm:px-6 lg:px-8 pb-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8 md:p-12 mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Featured Article
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-4">
                    The Word as Foundation
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    In the beginning was the Word - these opening words of John's Gospel carry 
                    profound meaning for both our faith and our design philosophy. Explore how 
                    this foundational truth shapes every piece in our Genesis Collection.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="mr-4">December 15, 2024</span>
                    <User className="w-4 h-4 mr-2" />
                    <span>Team</span>
                  </div>
                  <button className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center" onClick={() => {
                    navigate('/article?category=scripture-article');
                    window.scrollTo(0, 0);
                  }}>
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
                  <img src={heroGenesis} alt="The Word as Foundation - Genesis Collection" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>}

      {/* Articles Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(category ? displayedArticles : articles.slice(1)).map(article => <article key={article.id} className="group cursor-pointer" onClick={() => handleArticleClick(article)}>
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img src={articleImages[article.id]?.src || heroGenesis} alt={articleImages[article.id]?.alt || `${article.title} - Scriptured Journal`} className="w-full h-full object-cover" loading="lazy" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-xs text-gray-500 uppercase tracking-wide">
                    <span className="bg-gray-100 px-2 py-1 rounded">{article.category}</span>
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold group-hover:text-gray-600 transition-colors duration-200">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="w-3 h-3 mr-1" />
                    <span>{article.author}</span>
                  </div>
                </div>
              </article>)}
          </div>
        </div>
      </div>

      {category === 'philosophy' ? <ArticleFooter /> : <Footer />}
    </div>;
};
export default Journal;