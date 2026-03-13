import React from 'react';

const Campo = ({ type, placeholder, value, onChange, label, error, name }) => {
  const errorClass = error ? 'border-red-500' : 'border-gray-300 focus:border-cyan-500';

  return (
    <div className="mb-0">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        className={`block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 ${errorClass}`}
      />
      <div className="h-0 mt-0">
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
    </div>
  );
};

export default Campo;
