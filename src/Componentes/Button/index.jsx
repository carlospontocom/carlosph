import React from 'react';

const Button = ({ text, bgcolor, color, onClick }) => {
  const baseClasses = 'w-full font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2';

  return (
    <button 
      className={baseClasses}
      style={{ backgroundColor: bgcolor, color: color }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;