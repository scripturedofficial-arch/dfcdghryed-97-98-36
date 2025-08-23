import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Play, Calendar, Eye } from "lucide-react";
const Editorials = () => {
  const editorials = [{
    id: 1,
    title: "Genesis Lookbook",
    type: "Photo Series",
    description: "Black & white photography showcasing the Genesis Collection in urban environments.",
    date: "December 20, 2024",
    duration: "Visual Story",
    views: "2.3K",
    featured: true
  }, {
    id: 2,
    title: "Behind the Design",
    type: "Video",
    description: "An intimate look at the creative process behind our scripture-inspired pieces.",
    date: "December 15, 2024",
    duration: "8:42",
    views: "1.8K",
    featured: false
  }, {
    id: 3,
    title: "Faith in Fashion",
    type: "Documentary",
    description: "Exploring the intersection of spirituality and streetwear in modern culture.",
    date: "December 10, 2024",
    duration: "15:30",
    views: "4.1K",
    featured: false
  }, {
    id: 4,
    title: "Divine Circle Stories",
    type: "Photo Series",
    description: "Portraits of our community members and their personal faith journeys.",
    date: "December 5, 2024",
    duration: "Visual Story",
    views: "1.2K",
    featured: false
  }];
  return <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8">
            Editorials
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 max-w-2xl mx-auto">
            Black & white visual stories, behind-the-scenes content, and community features.
          </p>
        </div>
      </div>

      {/* Featured Editorial */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          {editorials.filter(editorial => editorial.featured).map(editorial => <div key={editorial.id} className="mb-16">
              <div className="relative group cursor-pointer">
                <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-black bg-opacity-50 px-2 py-1 rounded text-sm font-medium">
                      {editorial.type}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Featured Editorial
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-4">
                    {editorial.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                    {editorial.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{editorial.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{editorial.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}

          {/* Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {editorials.filter(editorial => !editorial.featured).map(editorial => <div key={editorial.id} className="group cursor-pointer">
                <div className="relative">
                  <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-black bg-opacity-50 px-2 py-1 rounded text-xs font-medium text-white">
                        {editorial.type}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 text-white">
                      <span className="bg-black bg-opacity-50 px-2 py-1 rounded text-xs">
                        {editorial.duration}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold group-hover:text-gray-600 transition-colors duration-200">
                      {editorial.title}
                    </h3>
                    
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {editorial.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{editorial.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        <span>{editorial.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold mb-4">
            Join Our Story
          </h2>
          <p className="text-lg text-gray-700 mb-8">Be part of our visual journey. Share your Scriptured moments and get featured in our community socials.</p>
          <div className="flex justify-center">
            <button className="bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors duration-200">
              SUBMIT YOUR STORY
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default Editorials;