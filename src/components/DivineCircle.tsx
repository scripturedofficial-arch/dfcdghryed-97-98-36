import { Star, Users, Calendar, Video } from "lucide-react";
const DivineCircle = () => {
  const benefits = [{
    icon: Star,
    title: "Exclusive Access",
    description: "First access to new collections and limited drops"
  }, {
    icon: Calendar,
    title: "Monthly Selection",
    description: "Participate in scripture selection for upcoming pieces"
  }, {
    icon: Video,
    title: "Private Content",
    description: "Behind-the-scenes vlogs and design process insights"
  }, {
    icon: Users,
    title: "Community",
    description: "Connect with like-minded individuals in our private forum"
  }];
  return <section className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">The 12</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our exclusive community of faith-driven fashion enthusiasts. 
            Membership is free, but the experience is priceless.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => <div key={benefit.title} className="text-center">
              <div className="bg-white text-black p-6 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-300 text-sm">{benefit.description}</p>
            </div>)}
        </div>

        {/* Application Process */}
        <div className="bg-gray-900 p-8 rounded-lg">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-bold mb-4">Application Process</h3>
            <p className="text-gray-300">
              Membership is selective but free. Tell us why you want to join our movement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-white text-black w-8 h-8 rounded-full mx-auto mb-3 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-medium mb-2">Apply</h4>
              <p className="text-sm text-gray-400">Share your story and values</p>
            </div>
            <div className="text-center">
              <div className="bg-white text-black w-8 h-8 rounded-full mx-auto mb-3 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-medium mb-2">Review</h4>
              <p className="text-sm text-gray-400">We review applications monthly</p>
            </div>
            <div className="text-center">
              <div className="bg-white text-black w-8 h-8 rounded-full mx-auto mb-3 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-medium mb-2">Welcome</h4>
              <p className="text-sm text-gray-400">Join our exclusive community</p>
            </div>
          </div>

          <div className="text-center">
            <a href="/application" className="inline-block bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 whitespace-nowrap">APPLY FOR MEMBERSHIP</a>
            <p className="text-xs text-gray-400 mt-3">No purchase necessary • Free Month membership & allocation</p>
          </div>
        </div>
      </div>
    </section>;
};
export default DivineCircle;