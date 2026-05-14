
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import YearCalendar from "@/components/YearCalendar";
import DivineCircleSection from "@/components/DivineCircle";
import SEO from "@/components/SEO";

const DivineCircle = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title="The 12 — Premium Faith-Inspired Apparel | Scriptured"
        description="The 12 is Scriptured's premium clothing line: twelve limited pieces, one for each disciple. Pre-order each monthly drop."
        path="/the-12"
      />
      <Navigation />
      <div className="pt-16 min-h-screen bg-gray-50 pb-5">
        <YearCalendar />
      </div>
      <DivineCircleSection />
      <Footer />
    </div>
  );
};

export default DivineCircle;
