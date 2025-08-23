import { ArrowLeft, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useCountryDetection, formatMeasurement, getUnitLabel } from "@/hooks/useCountryDetection";
import { useState } from "react";
import MeasurementIllustration from "@/components/MeasurementIllustration";
import ArticleFooter from "@/components/ArticleFooter";

const SizeGuide = () => {
  const { countryCode, useMetric } = useCountryDetection();
  const [manualMetricToggle, setManualMetricToggle] = useState<boolean | null>(null);
  
  // Use manual toggle if set, otherwise use detected country preference
  const shouldUseMetric = manualMetricToggle !== null ? manualMetricToggle : useMetric;
  const unitLabel = getUnitLabel(shouldUseMetric);

  const sizeCharts = {
    tshirts: {
      title: "T-Shirts & Long Sleeves",
      sizes: [
        { size: "XS", chest: "18", length: "27", shoulder: "16" },
        { size: "S", chest: "20", length: "28", shoulder: "17" },
        { size: "M", chest: "22", length: "29", shoulder: "18" },
        { size: "L", chest: "24", length: "30", shoulder: "19" },
        { size: "XL", chest: "26", length: "31", shoulder: "20" },
        { size: "XXL", chest: "28", length: "32", shoulder: "21" }
      ]
    },
    hoodies: {
      title: "Hoodies & Sweatshirts", 
      sizes: [
        { size: "XS", chest: "20", length: "26", shoulder: "17" },
        { size: "S", chest: "22", length: "27", shoulder: "18" },
        { size: "M", chest: "24", length: "28", shoulder: "19" },
        { size: "L", chest: "26", length: "29", shoulder: "20" },
        { size: "XL", chest: "28", length: "30", shoulder: "21" },
        { size: "XXL", chest: "30", length: "31", shoulder: "22" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Size Guide</h1>
            <div className="mt-4 sm:mt-0 flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Globe className="w-4 h-4" />
                <span>Detected: {countryCode}</span>
              </div>
              <button
                onClick={() => setManualMetricToggle(!shouldUseMetric)}
                className="px-4 py-2 bg-white/10 text-white rounded-md text-sm hover:bg-white/20 transition-colors duration-200"
              >
                Switch to {shouldUseMetric ? 'Imperial' : 'Metric'}
              </button>
            </div>
          </div>
          <p className="text-gray-300 mt-4 max-w-2xl">
            Find your perfect fit with our comprehensive sizing charts. All measurements are in {shouldUseMetric ? 'centimeters' : 'inches'}.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* How to Measure */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold mb-8 text-foreground">How to Measure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg text-center">
              <MeasurementIllustration type="chest" className="mb-4" />
              <h3 className="font-semibold text-lg mb-3 text-foreground">Chest</h3>
              <p className="text-muted-foreground">
                Measure around the fullest part of your chest, keeping the tape measure horizontal.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg text-center">
              <MeasurementIllustration type="length" className="mb-4" />
              <h3 className="font-semibold text-lg mb-3 text-foreground">Length</h3>
              <p className="text-muted-foreground">
                Measure from the highest point of the shoulder down to the desired length.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg text-center">
              <MeasurementIllustration type="shoulder" className="mb-4" />
              <h3 className="font-semibold text-lg mb-3 text-foreground">Shoulder</h3>
              <p className="text-muted-foreground">
                Measure from shoulder point to shoulder point across the back.
              </p>
            </div>
          </div>
        </div>

        {/* Size Charts */}
        <div className="space-y-12">
          {Object.entries(sizeCharts).map(([key, chart]) => (
            <div key={key}>
              <h2 className="font-serif text-3xl font-bold mb-8 text-foreground">{chart.title}</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-card rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Size</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Chest ({unitLabel})</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Length ({unitLabel})</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Shoulder ({unitLabel})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chart.sizes.map((size, index) => (
                      <tr key={size.size} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                        <td className="px-6 py-4 font-medium text-foreground">{size.size}</td>
                        <td className="px-6 py-4 text-muted-foreground">{formatMeasurement(size.chest, shouldUseMetric)}</td>
                        <td className="px-6 py-4 text-muted-foreground">{formatMeasurement(size.length, shouldUseMetric)}</td>
                        <td className="px-6 py-4 text-muted-foreground">{formatMeasurement(size.shoulder, shouldUseMetric)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Fit Guide */}
        <div className="mt-16">
          <h2 className="font-serif text-3xl font-bold mb-8 text-foreground">Fit Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-foreground">Regular Fit</h3>
              <p className="text-muted-foreground mb-4">
                Our standard fit offers a comfortable, relaxed silhouette that's neither too tight nor too loose.
              </p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Classic streetwear style</li>
                <li>• Comfortable for daily wear</li>
                <li>• True to size</li>
              </ul>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-foreground">Oversized Fit</h3>
              <p className="text-muted-foreground mb-4">
                Designed for a relaxed, contemporary look with extra room for comfort and style.
              </p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Modern streetwear aesthetic</li>
                <li>• Generous cut through body</li>
                <li>• Consider sizing down for fitted look</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-16 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4 text-foreground">Still Need Help?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team is here to help you find the perfect fit. Don't hesitate to reach out with any questions.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Contact Support
          </Link>
        </div>
      </div>
      <ArticleFooter />
    </div>
  );
};

export default SizeGuide;