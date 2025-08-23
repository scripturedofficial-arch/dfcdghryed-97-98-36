
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import YearCalendar from "@/components/YearCalendar";
import DivineCircleSection from "@/components/DivineCircle";

const DivineCircle = () => {
  return (
    <div className="min-h-screen bg-white text-black">
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
