import { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrency, type CurrencyInfo } from '@/hooks/useCurrency';

const CurrencySelector = () => {
  const { currency, changeCurrency, availableCurrencies, isLoading } = useCurrency();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Globe className="w-4 h-4" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <span>{currency.symbol} {currency.code}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {availableCurrencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => changeCurrency(curr)}
            className={`flex items-center justify-between ${
              currency.code === curr.code ? 'bg-accent' : ''
            }`}
          >
            <span className="flex items-center space-x-2">
              <span className="font-mono text-sm">{curr.symbol}</span>
              <span>{curr.code}</span>
            </span>
            <span className="text-xs text-muted-foreground">{curr.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;