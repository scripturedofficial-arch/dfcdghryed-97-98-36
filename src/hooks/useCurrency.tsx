import { useState, useEffect } from 'react';

export interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number;
  name: string;
}

const CURRENCY_MAP: Record<string, CurrencyInfo> = {
  ZA: { code: 'ZAR', symbol: 'R', rate: 1, name: 'South African Rand' },
  US: { code: 'USD', symbol: '$', rate: 0.054, name: 'US Dollar' },
  GB: { code: 'GBP', symbol: '£', rate: 0.043, name: 'British Pound' },
  EU: { code: 'EUR', symbol: '€', rate: 0.049, name: 'Euro' },
  CA: { code: 'CAD', symbol: 'C$', rate: 0.074, name: 'Canadian Dollar' },
  AU: { code: 'AUD', symbol: 'A$', rate: 0.082, name: 'Australian Dollar' },
  JP: { code: 'JPY', symbol: '¥', rate: 8.1, name: 'Japanese Yen' },
  BR: { code: 'BRL', symbol: 'R$', rate: 0.27, name: 'Brazilian Real' },
  SA: { code: 'SAR', symbol: '﷼', rate: 0.20, name: 'Saudi Riyal' },
  IN: { code: 'INR', symbol: '₹', rate: 4.5, name: 'Indian Rupee' },
  CN: { code: 'CNY', symbol: '¥', rate: 0.39, name: 'Chinese Yuan' },
  KR: { code: 'KRW', symbol: '₩', rate: 72, name: 'South Korean Won' },
  DEFAULT: { code: 'ZAR', symbol: 'R', rate: 1, name: 'South African Rand' }
};

export const useCurrency = () => {
  const [currency, setCurrency] = useState<CurrencyInfo>(CURRENCY_MAP.DEFAULT);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        // Check if currency is already stored in localStorage
        const storedCurrency = localStorage.getItem('userCurrency');
        if (storedCurrency) {
          const parsed = JSON.parse(storedCurrency);
          setCurrency(parsed);
          setIsLoading(false);
          return;
        }

        // Fetch user's country based on IP
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        
        const data = await response.json();
        const countryCode = data.country_code;
        
        // Map country to currency
        let userCurrency = CURRENCY_MAP[countryCode] || CURRENCY_MAP.DEFAULT;
        
        // Special cases for Euro countries
        const euroCountries = ['AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES'];
        if (euroCountries.includes(countryCode)) {
          userCurrency = CURRENCY_MAP.EU;
        }
        
        setCurrency(userCurrency);
        localStorage.setItem('userCurrency', JSON.stringify(userCurrency));
        setIsLoading(false);
      } catch (err) {
        console.error('Error detecting currency:', err);
        setError('Failed to detect currency');
        setCurrency(CURRENCY_MAP.DEFAULT);
        setIsLoading(false);
      }
    };

    detectCurrency();
  }, []);

  const convertPrice = (zarPrice: number): number => {
    return Math.round(zarPrice * currency.rate * 100) / 100;
  };

  const formatPrice = (zarPrice: number): string => {
    const convertedPrice = convertPrice(zarPrice);
    
    // Handle special formatting for different currencies
    if (currency.code === 'JPY' || currency.code === 'KRW') {
      return `${currency.symbol}${Math.round(convertedPrice)}`;
    }
    
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  };

  const changeCurrency = (newCurrency: CurrencyInfo) => {
    setCurrency(newCurrency);
    localStorage.setItem('userCurrency', JSON.stringify(newCurrency));
  };

  return {
    currency,
    isLoading,
    error,
    convertPrice,
    formatPrice,
    changeCurrency,
    availableCurrencies: Object.values(CURRENCY_MAP)
      .filter(c => c.code !== 'DEFAULT')
      .filter((curr, index, array) => 
        array.findIndex(c => c.code === curr.code) === index
      )
  };
};