import React from 'react';
import { Input } from './ui/input';

interface CurrencyInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  'aria-required'?: boolean;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ 
  name, 
  value, 
  onChange, 
  onBlur, 
  placeholder = "R$ 0,00",
  className,
  'aria-required': ariaRequired 
}) => {
  const formatCurrency = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    
    if (!numbers) return '';
    
    const num = parseInt(numbers, 10);
    if (isNaN(num)) return '';
    
    const reais = Math.floor(num / 100);
    const centavos = num % 100;
    
    const formattedReais = reais.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    const formattedCentavos = centavos.toString().padStart(2, '0');
    
    return `R$ ${formattedReais},${formattedCentavos}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const formattedValue = formatCurrency(rawValue);
    
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name,
        value: formattedValue || ''
      }
    };
    
    onChange(syntheticEvent);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <Input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={className}
      aria-required={ariaRequired}
    />
  );
};

export default CurrencyInput; 