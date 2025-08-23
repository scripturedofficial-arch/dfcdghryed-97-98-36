import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useCountryDetection } from "@/hooks/useCountryDetection";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const countryCodes = [
  { code: "US", dialCode: "+1", name: "United States" },
  { code: "CA", dialCode: "+1", name: "Canada" },
  { code: "GB", dialCode: "+44", name: "United Kingdom" },
  { code: "AU", dialCode: "+61", name: "Australia" },
  { code: "DE", dialCode: "+49", name: "Germany" },
  { code: "FR", dialCode: "+33", name: "France" },
  { code: "IT", dialCode: "+39", name: "Italy" },
  { code: "ES", dialCode: "+34", name: "Spain" },
  { code: "NL", dialCode: "+31", name: "Netherlands" },
  { code: "BR", dialCode: "+55", name: "Brazil" },
  { code: "IN", dialCode: "+91", name: "India" },
  { code: "CN", dialCode: "+86", name: "China" },
  { code: "JP", dialCode: "+81", name: "Japan" },
  { code: "KR", dialCode: "+82", name: "South Korea" },
  { code: "MX", dialCode: "+52", name: "Mexico" },
  { code: "RU", dialCode: "+7", name: "Russia" },
  { code: "ZA", dialCode: "+27", name: "South Africa" },
  { code: "NG", dialCode: "+234", name: "Nigeria" },
  { code: "AE", dialCode: "+971", name: "United Arab Emirates" },
  { code: "SA", dialCode: "+966", name: "Saudi Arabia" },
];

export const PhoneInput = ({ value, onChange, className, placeholder }: PhoneInputProps) => {
  const { countryCode } = useCountryDetection();
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Parse existing value on mount
  useEffect(() => {
    if (value) {
      const match = value.match(/^(\+\d+)\s(.+)$/);
      if (match) {
        setSelectedCountryCode(match[1]);
        setPhoneNumber(match[2]);
      } else {
        setPhoneNumber(value);
      }
    }
  }, []);

  // Set default country code based on detection
  useEffect(() => {
    const detectedCountry = countryCodes.find(c => c.code === countryCode);
    if (detectedCountry) {
      setSelectedCountryCode(detectedCountry.dialCode);
    }
  }, [countryCode]);

  const handleCountryChange = (dialCode: string) => {
    setSelectedCountryCode(dialCode);
    const fullValue = phoneNumber ? `${dialCode} ${phoneNumber}` : "";
    onChange(fullValue);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    const fullValue = newPhoneNumber ? `${selectedCountryCode} ${newPhoneNumber}` : "";
    onChange(fullValue);
  };

  return (
    <div className="flex gap-2">
      <Select value={selectedCountryCode} onValueChange={handleCountryChange}>
        <SelectTrigger className="w-32 bg-background border-input text-foreground focus:border-gold transition-all duration-300 rounded-lg h-12">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-background border-border max-h-60">
          {countryCodes.map((country) => (
            <SelectItem 
              key={country.code} 
              value={country.dialCode}
              className="text-foreground hover:bg-accent"
            >
              {country.dialCode} {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Input
        value={phoneNumber}
        onChange={handlePhoneChange}
        className={className}
        placeholder={placeholder || "Phone number"}
        type="tel"
      />
    </div>
  );
};