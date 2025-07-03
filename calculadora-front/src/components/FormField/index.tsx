import React from 'react';

interface FormFieldProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, children, ...props }) => (
  <label {...props} className="flex flex-col gap-1 font-medium text-blue-900 text-base">
    {label}
    {children}
       {error && <span className="text-red-600 text-sm mt-1">{error}</span>}
  </label>
);

export default FormField; 