import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "Ordering & Products",
      questions: [
        {
          question: "What is the meaning behind Scriptured's designs?",
          answer: "Each piece in our collection is carefully designed to carry sacred scripture and spiritual meaning. We believe fashion can be a form of witness, allowing you to share your faith through beautifully crafted garments that spark meaningful conversations."
        },
        {
          question: "Are your products made-to-order?",
          answer: "Yes, all Scriptured pieces are made-to-order to ensure the highest quality and reduce waste. This means each item is crafted specifically for you after you place your order, which typically takes 2-3 weeks before shipping."
        },
        {
          question: "What materials do you use?",
          answer: "We use premium, ethically-sourced materials including organic cotton, bamboo blends, and sustainable fabrics. All our garments are designed for comfort, durability, and to beautifully showcase the sacred texts they carry."
        },
        {
          question: "Can I customize scripture or verses on my garment?",
          answer: "Currently, our collections feature carefully curated scripture selections that align with our design philosophy. We're working on custom options for future releases - stay tuned to our newsletter for updates."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Since all items are made-to-order, production takes 2-3 weeks. After production, domestic shipping takes 3-5 business days, while international shipping takes 7-21 business days depending on your location."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship worldwide! Shipping costs and delivery times vary by location. You'll see the exact shipping cost and estimated delivery time at checkout before completing your order."
        },
        {
          question: "Can I track my order?",
          answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can also check your order status anytime by logging into your account on our website."
        },
        {
          question: "What if my package is lost or damaged?",
          answer: "We're committed to ensuring you receive your order in perfect condition. If your package is lost or arrives damaged, please contact us within 48 hours of expected delivery, and we'll work with you to resolve the issue promptly."
        }
      ]
    },
    {
      category: "Sizing & Fit",
      questions: [
        {
          question: "How do I find my correct size?",
          answer: "We provide a detailed size guide with measurements for each garment. Since fit preferences vary, we recommend measuring a favorite piece of clothing and comparing it to our size charts. Our customer service team is also happy to help with sizing questions."
        },
        {
          question: "What if my item doesn't fit?",
          answer: "We offer free size exchanges within 30 days of delivery for unworn, unwashed items with original tags. Simply contact us to initiate a size exchange, and we'll send you a prepaid return label."
        },
        {
          question: "Do your garments shrink?",
          answer: "All our garments are pre-shrunk during manufacturing. However, to maintain the quality and longevity of your Scriptured pieces, we recommend following the care instructions on each garment's label."
        }
      ]
    },
    {
      category: "Care & Maintenance",
      questions: [
        {
          question: "How should I care for my Scriptured garments?",
          answer: "To preserve the sacred texts and maintain garment quality, we recommend washing in cold water, turning inside out, and air drying when possible. Detailed care instructions are included with each order and on garment labels."
        },
        {
          question: "Will the scripture text fade over time?",
          answer: "Our printing techniques are designed for longevity. With proper care, the scripture and designs should maintain their appearance for years. We use high-quality, fade-resistant inks and printing methods."
        },
        {
          question: "Can I iron my Scriptured clothing?",
          answer: "Yes, but we recommend ironing inside out on a low heat setting to protect the printed scripture and designs. Always check the specific care label on your garment for the best results."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We accept returns within 30 days of delivery for unworn, unwashed items in original condition with tags attached. Since our pieces are made-to-order, we cannot accept returns for change of mind, but we do cover defects and sizing issues."
        },
        {
          question: "How do I start a return or exchange?",
          answer: "Contact our customer service team through the website or email us directly. We'll guide you through the process and provide a prepaid return label if your return qualifies under our policy."
        },
        {
          question: "When will I receive my refund?",
          answer: "Once we receive and inspect your returned item, refunds are processed within 3-5 business days. The refund will appear on your original payment method within 5-10 business days, depending on your bank or card issuer."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, sizing, and more. 
            Can't find what you're looking for? Contact our team directly.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="font-serif text-2xl font-bold mb-6 text-gray-900">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const itemIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openItems.includes(itemIndex);
                  
                  return (
                    <div 
                      key={questionIndex}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(itemIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="font-medium text-gray-900 pr-4">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <div className="text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                            {item.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-6">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our customer service team is here to help with any questions about your order, 
            our products, or anything else you need assistance with.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors duration-200 rounded"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@scriptured.com"
              className="inline-block border border-gray-300 text-gray-700 px-8 py-3 font-medium hover:bg-gray-100 transition-colors duration-200 rounded"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;