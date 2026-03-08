import React from 'react';

const Select = ({ label, options, value, onChange, error, name }) => {
  const ringClass = error ? 'ring-red-500' : 'ring-gray-300';

  return (
    <div className="mb-4">
      <label 
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        className={`block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${ringClass} focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6`}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      <div className="h-5 mt-1">
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
    </div>
  );
};

export default Select;
