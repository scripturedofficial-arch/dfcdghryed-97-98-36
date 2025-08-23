import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare, Instagram, Twitter, Youtube, Video, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import TikTokIcon from "@/assets/tiktok.svg";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Handle form submission here
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="text-gray-300 mt-4 max-w-2xl">
            Get in touch with our team. We're here to help with any questions about our products, orders, or collaborations.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="font-serif text-3xl font-bold mb-8 text-foreground">Get in Touch</h2>
            
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">info@scriptured.clothing</p>
                    <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">+27 (0) 123 456 789</p>
                    <p className="text-sm text-muted-foreground">Mon - Fri, 9AM - 5PM SAST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">Pietermaritzburg, South Africa</p>
                    <p className="text-sm text-muted-foreground">
                  </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p>Saturday: 10:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div>
                <h2 className="font-semibold text-foreground mb-4">Quick Links</h2>
                <Link to="/faq" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-200 font-medium">
                  View Our FAQ
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
                <p className="text-sm text-muted-foreground mt-2">
                  Find answers to common questions about orders, shipping, sizing, and more.
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-card rounded-lg hover:bg-muted transition-colors duration-200" aria-label="Instagram">
                    <Instagram className="w-5 h-5 text-foreground" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-card rounded-lg hover:bg-muted transition-colors duration-200" aria-label="Twitter">
                    <Twitter className="w-5 h-5 text-foreground" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-card rounded-lg hover:bg-muted transition-colors duration-200" aria-label="YouTube">
                    <Youtube className="w-5 h-5 text-foreground" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-card rounded-lg hover:bg-muted transition-colors duration-200" aria-label="TikTok">
                    <img src={TikTokIcon} alt="TikTok" className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-card p-8 rounded-lg -mt-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="w-6 h-6 text-primary mr-3" />
                <h2 className="font-serif text-2xl font-bold text-foreground">Send us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">Name *</Label>
                    <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="mt-1" placeholder="Your full name" />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email *</Label>
                    <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1" placeholder="your@email.com" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-foreground">Subject *</Label>
                  <Input id="subject" name="subject" type="text" required value={formData.subject} onChange={handleChange} className="mt-1" placeholder="What's this about?" />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-foreground">Message *</Label>
                  <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} className="mt-1 min-h-[120px]" placeholder="Tell us more about your inquiry..." />
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>;
};
export default Contact;