import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCountryDetection } from "@/hooks/useCountryDetection";
import { PhoneInput } from "@/components/PhoneInput";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phoneNumber: z.string().optional(),
  countryCity: z.string().min(2, "Country & City is required"),
  faith: z.string().min(1, "Please select your faith connection"),
  otherFaith: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().url().optional().or(z.literal("")),
  willShare: z.enum(["yes", "no"], {
    required_error: "Please select an option",
  }),
  confirmTruth: z.boolean().refine((val) => val === true, {
    message: "You must confirm your answers are true",
  }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to Terms & Conditions",
  }),
  consentContact: z.boolean().refine((val) => val === true, {
    message: "You must consent to being contacted",
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const ApplicationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { countryCode } = useCountryDetection();
  const [detectedLocation, setDetectedLocation] = useState<string>("New York, USA");

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      countryCity: "",
      faith: "",
      otherFaith: "",
      instagram: "",
      twitter: "",
      tiktok: "",
      youtube: "",
      willShare: undefined,
      confirmTruth: false,
      agreeTerms: false,
      consentContact: false,
    },
  });

  // Fetch detailed location info for placeholder
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.city && data.country_name) {
          setDetectedLocation(`${data.city}, ${data.country_name}`);
        }
      } catch (error) {
        console.log('Could not fetch location data for placeholder');
      }
    };

    fetchLocationData();
  }, []);

  const selectedFaith = form.watch("faith");

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Application submitted:", data);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="space-y-4">
            <h1 className="font-serif text-4xl text-gold uppercase tracking-wider">
              APPLICATION RECEIVED
            </h1>
            <p className="font-serif text-lg text-gold/80 italic">
              Your journey with The 12 begins now.
            </p>
          </div>
          
          <div className="space-y-4 text-muted-foreground">
            <p>Thank you for applying to The 12 ultra-exclusive drop.</p>
            <p>Our team will review your application carefully. Only selected applicants will receive an invitation to purchase.</p>
            <p className="text-sm text-gold/60">
              You will hear from us within 7-14 business days.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/the-12" 
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors duration-200 font-medium"
          >
            <ArrowLeft size={20} />
            Back to "The 12"
          </Link>
        </div>
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl text-gold uppercase tracking-wider font-bold">
            THE 12 – ULTRA-EXCLUSIVE DROP APPLICATION
          </h1>
          <p className="font-serif text-xl text-gold/80 italic">
            Limited Edition. Faith-Inspired. For the Chosen Few.
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-gold transition-all duration-300 rounded-lg h-12"
                        placeholder="Enter your full name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-gold transition-all duration-300 rounded-lg h-12"
                        placeholder="your@email.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-medium">Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <PhoneInput
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-gold transition-all duration-300 rounded-lg h-12 flex-1"
                        placeholder="(555) 123-4567"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="countryCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Country & City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-gold transition-all duration-300 rounded-lg h-12"
                        placeholder={detectedLocation}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="faith"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Faith & Connection</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background border-input text-foreground focus:border-gold transition-all duration-300 rounded-lg h-12">
                          <SelectValue placeholder="Select your faith connection" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background border-border">
                        <SelectItem value="christianity" className="text-foreground hover:bg-accent">Christianity</SelectItem>
                        <SelectItem value="islam" className="text-foreground hover:bg-accent">Islam</SelectItem>
                        <SelectItem value="hinduism" className="text-foreground hover:bg-accent">Hinduism</SelectItem>
                        <SelectItem value="buddhism" className="text-foreground hover:bg-accent">Buddhism</SelectItem>
                        <SelectItem value="other" className="text-foreground hover:bg-accent">Other (please specify)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedFaith === "other" && (
                <FormField
                  control={form.control}
                  name="otherFaith"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground font-medium">Please specify your faith</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-gold transition-all duration-300 rounded-lg h-12"
                          placeholder="Please specify"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Social Media */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-gold">Social Media Presence</h3>
              
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-medium">Instagram Handle</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-gold transition-all duration-300 rounded-lg h-12"
                        placeholder="@username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-medium">Twitter / X Handle</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-gold transition-all duration-300 rounded-lg h-12"
                        placeholder="@username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tiktok"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-medium">TikTok Handle</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-gold transition-all duration-300 rounded-lg h-12"
                        placeholder="@username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="youtube"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-medium">YouTube Channel Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="url"
                        className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-gold transition-all duration-300 rounded-lg h-12"
                        placeholder="https://youtube.com/@channel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Content Sharing */}
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="willShare"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-foreground font-medium">
                      Would you be willing to share photos or videos once you receive your piece?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-8"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="yes" className="border-input text-gold" />
                          <Label htmlFor="yes" className="text-foreground cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="no" className="border-input text-gold" />
                          <Label htmlFor="no" className="text-foreground cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Agreements */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-gold">Agreements</h3>
              
              <FormField
                control={form.control}
                name="confirmTruth"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-input data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-foreground font-normal cursor-pointer">
                        I confirm that my answers are true and that I understand The 12 is limited and non-transferable.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-input data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-foreground font-normal cursor-pointer">
                        I agree to the{" "}
                        <Link to="/terms-of-service" className="text-gold underline hover:text-gold/80">
                          Terms of Service
                        </Link>
                        {" "}and{" "}
                        <Link to="/privacy-policy" className="text-gold underline hover:text-gold/80">
                          Privacy Policy
                        </Link>
                        .
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consentContact"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-input data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-foreground font-normal cursor-pointer">
                        I consent to being contacted via email or direct message.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="space-y-4 pt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-gold to-yellow-400 hover:from-yellow-400 hover:to-gold text-black font-semibold text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold/50 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit My Application"}
              </Button>
              
              <p className="text-center text-gold/60 text-sm italic">
                (Only accepted applicants will receive an invitation to purchase.)
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ApplicationForm;