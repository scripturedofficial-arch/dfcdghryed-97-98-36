import { useState, useEffect } from 'react';

export interface CountryInfo {
  countryCode: string;
  useMetric: boolean;
}

const METRIC_COUNTRIES = [
  'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 
  'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 
  'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 
  'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 
  'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 
  'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 
  'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 
  'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 
  'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 
  'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 
  'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 
  'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 
  'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 
  'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 
  'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 
  'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 
  'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 
  'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 
  'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 
  'TZ', 'UA', 'UG', 'UM', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 
  'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'
];

// Countries that primarily use imperial system
const IMPERIAL_COUNTRIES = ['US', 'LR', 'MM'];

export const useCountryDetection = (): CountryInfo => {
  const [countryInfo, setCountryInfo] = useState<CountryInfo>({
    countryCode: 'US', // Default to US
    useMetric: false
  });

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Try to get country from IP-based service
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code) {
          const countryCode = data.country_code.toUpperCase();
          const useMetric = !IMPERIAL_COUNTRIES.includes(countryCode);
          
          setCountryInfo({
            countryCode,
            useMetric
          });
        }
      } catch (error) {
        console.log('Could not detect country, using default (US)');
        // Keep default US/Imperial
      }
    };

    detectCountry();
  }, []);

  return countryInfo;
};

// Utility functions for unit conversion
export const convertInchesToCm = (inches: string): string => {
  const inchValue = parseFloat(inches);
  return (inchValue * 2.54).toFixed(1);
};

export const formatMeasurement = (value: string, useMetric: boolean): string => {
  return useMetric ? convertInchesToCm(value) : value;
};

export const getUnitLabel = (useMetric: boolean): string => {
  return useMetric ? 'cm' : 'in';
};
