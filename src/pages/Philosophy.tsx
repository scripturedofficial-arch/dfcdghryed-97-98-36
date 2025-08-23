import Navigation from "@/components/Navigation";
import ArticleFooter from "@/components/ArticleFooter";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroGenesis from "@/assets/hero-genesis.jpg";
import heroFaith from "@/assets/hero-faith.jpg";
import heroWisdom from "@/assets/hero-wisdom.jpg";

const Philosophy = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "The Word as Foundation",
      excerpt: "Exploring John 1:1 and its significance in our Genesis Collection design philosophy.",
      author: "Team",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Scripture Study"
    },
    {
      id: 2,
      title: "Faith in Uncertain Times",
      excerpt: "How Hebrews 11:1 speaks to modern struggles and why we chose it for our Faith Hoodie.",
      author: "Team",
      date: "December 10, 2024",
      readTime: "7 min read",
      category: "Religion"
    },
    {
      id: 3,
      title: "The Beginning of Wisdom",
      excerpt: "Unpacking Proverbs 9:10 and the importance of reverence in contemporary culture.",
      author: "Team",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Philosophy"
    },
    {
      id: 4,
      title: "Truth in a Post-Truth World",
      excerpt: "Examining John 14:6 and the concept of absolute truth in modern philosophy.",
      author: "Team",
      date: "December 1, 2024",
      readTime: "8 min read",
      category: "Philosophy"
    },
    {
      id: 5,
      title: "The Nature of Love",
      excerpt: "1 Corinthians 13:4-8 and what it teaches us about authentic love versus cultural definitions.",
      author: "Team",
      date: "November 28, 2024",
      readTime: "6 min read",
      category: "Philosophy"
    },
    {
      id: 6,
      title: "Freedom and Responsibility",
      excerpt: "Galatians 5:13 explores the paradox of true freedom through service to others.",
      author: "Team",
      date: "November 25, 2024",
      readTime: "7 min read",
      category: "Philosophy"
    },
    {
      id: 7,
      title: "The Problem of Suffering",  
      excerpt: "Romans 8:28 and how ancient wisdom addresses one of philosophy's greatest questions.",
      author: "Team",
      date: "November 22, 2024",
      readTime: "9 min read",
      category: "Philosophy"
    },
    {
      id: 8,
      title: "Identity and Purpose",
      excerpt: "Jeremiah 1:5 and the philosophical implications of predestined purpose in human existence.",
      author: "Team",
      date: "November 18, 2024",
      readTime: "5 min read",
      category: "Philosophy"
    },
    {
      id: 9,
      title: "Justice and Mercy",
      excerpt: "Micah 6:8 and the eternal tension between justice and compassion in moral philosophy.",
      author: "Team",
      date: "November 15, 2024",
      readTime: "8 min read",
      category: "Philosophy"
    },
    {
      id: 10,
      title: "The Meaning of Life",
      excerpt: "Ecclesiastes 3:1-8 and humanity's search for meaning in the rhythm of existence.",
      author: "Team",
      date: "November 12, 2024",
      readTime: "7 min read",
      category: "Philosophy"
    }
  ];

  const philosophyArticles = articles.filter(article => article.category === "Philosophy");
  
  const handleArticleClick = (article: any) => {
    // Stay on philosophy page or navigate to individual article
    console.log("Article clicked:", article.title);
  };

  const articleImages: Record<number, { src: string; alt: string; }> = {
    2: {
      src: heroFaith,
      alt: "Faith in Uncertain Times - Faith Hoodie inspiration"
    },
    3: {
      src: heroWisdom,
      alt: "The Beginning of Wisdom - Proverbs 9:10 visual"
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
              Philosophy
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-600 max-w-2xl mx-auto">
              Exploring life's deepest questions through the intersection of faith and reason.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {philosophyArticles.map(article => 
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

export default Philosophy;