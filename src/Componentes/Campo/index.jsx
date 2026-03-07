import React from 'react';

const Campo = ({ type, placeholder, value, onChange, label, error, name }) => {
  const errorClass = error ? 'border-red-500' : 'border-gray-200';

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorClass}`}
      />
      <div className="h-5 mt-1">
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
    </div>
  );
};

export default Campo;
