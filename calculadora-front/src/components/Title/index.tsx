import React from 'react';

interface TitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  id?: string;
}

const Title: React.FC<TitleProps> = ({ children, icon, as = 'h2', className, id }) => {
  const Tag = as;
  return (
    <Tag className={`flex items-center gap-2 text-blue-800 font-bold text-xl md:text-2xl ${className || ''}`} id={id}>
      {icon && <span>{icon}</span>}
      {children}
    </Tag>
  );
};

export default Title; 