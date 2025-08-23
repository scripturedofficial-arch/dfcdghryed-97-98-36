import Navigation from "@/components/Navigation";
import ArticleFooter from "@/components/ArticleFooter";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroGenesis from "@/assets/hero-genesis.jpg";
import heroFaith from "@/assets/hero-faith.jpg";
import heroWisdom from "@/assets/hero-wisdom.jpg";

const Religion = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "The Word as Foundation",
      excerpt: "Exploring John 1:1 and its significance in our Genesis Collection design philosophy.",
      author: "Scriptured Team",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Scripture Study"
    },
    {
      id: 2,
      title: "Faith in Uncertain Times",
      excerpt: "How Hebrews 11:1 speaks to modern struggles and why we chose it for our Faith Hoodie.",
      author: "Scriptured Team",
      date: "December 10, 2024",
      readTime: "7 min read",
      category: "Religion"
    },
    {
      id: 3,
      title: "The Beginning of Wisdom",
      excerpt: "Unpacking Proverbs 9:10 and the importance of reverence in contemporary culture.",
      author: "Scriptured Team",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Philosophy"
    },
    {
      id: 4,
      title: "Walking in the Spirit",
      excerpt: "Galatians 5:16 and the daily practice of spiritual discernment in modern life.",
      author: "Scriptured Team",
      date: "December 1, 2024",
      readTime: "6 min read",
      category: "Religion"
    },
    {
      id: 5,
      title: "Prayer and Meditation",
      excerpt: "1 Thessalonians 5:17 explores the continuous communion with the divine.",
      author: "Scriptured Team",
      date: "November 28, 2024",
      readTime: "5 min read",
      category: "Religion"
    },
    {
      id: 6,
      title: "Grace and Redemption",
      excerpt: "Ephesians 2:8-9 and the transformative power of unmerited favor.",
      author: "Scriptured Team",
      date: "November 25, 2024",
      readTime: "7 min read",
      category: "Religion"
    },
    {
      id: 7,
      title: "Community and Fellowship",
      excerpt: "Hebrews 10:24-25 and the importance of gathering in faith communities.",
      author: "Scriptured Team",
      date: "November 22, 2024",
      readTime: "6 min read",
      category: "Religion"
    },
    {
      id: 8,
      title: "Scripture and Tradition",
      excerpt: "2 Timothy 3:16 and the role of sacred texts in spiritual formation.",
      author: "Scriptured Team",
      date: "November 18, 2024",
      readTime: "8 min read",
      category: "Religion"
    }
  ];

  const religionArticles = articles.filter(article => article.category === "Religion");
  
  const handleArticleClick = (article: any) => {
    // Stay on religion page or navigate to individual article
    console.log("Article clicked:", article.title);
  };

  const articleImages: Record<number, { src: string; alt: string; }> = {
    2: {
      src: heroFaith,
      alt: "Faith in Uncertain Times - Faith Hoodie inspiration"
    },
    4: {
      src: heroWisdom,
      alt: "Walking in the Spirit - Spiritual discernment visual"
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-20 pb-[5px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/journal')}
            className="mb-8 text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </Button>
          <div className="text-center">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8">
              Religion
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-600 max-w-2xl mx-auto">
              Exploring faith, scripture, and spiritual practice in contemporary culture.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {religionArticles.map(article => 
              <article 
                key={article.id} 
                className="group cursor-pointer mt-8 md:mt-[70px]"
                onClick={() => handleArticleClick(article)}
              >
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={articleImages[article.id]?.src || heroGenesis} 
                    alt={articleImages[article.id]?.alt || `${article.title} - Scriptured Journal`} 
                    className="w-full h-full object-cover" 
                    loading="lazy" 
                  />
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
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="mr-3">{article.date}</span>
                    <User className="w-3 h-3 mr-1" />
                    <span className="mr-3">{article.author}</span>
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </div>

      <ArticleFooter />
    </div>
  );
};

export default Religion;