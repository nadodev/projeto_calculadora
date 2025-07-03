import React from 'react';
import { Input } from './ui/input';

interface PercentageInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  'aria-required'?: boolean;
}

const PercentageInput: React.FC<PercentageInputProps> = ({ 
  name, 
  value, 
  onChange, 
  onBlur, 
  placeholder = "0,00%",
  className,
  'aria-required': ariaRequired 
}) => {
  const formatPercentage = (value: string): string => {
    const numbers = value.replace(/[^\d.,]/g, '');
    
    if (!numbers) return '';
    
    const normalized = numbers.replace(',', '.');
    const num = parseFloat(normalized);
    
    if (isNaN(num)) return '';
    
    const formatted = num.toFixed(2).replace('.', ',');
    
    return `${formatted}%`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace('%', '').replace(/\s/g, '');
    const formattedValue = formatPercentage(rawValue);
    
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

export default PercentageInput; 