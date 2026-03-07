import React from 'react';

const Textarea = ({ label, placeholder, value, onChange, error, name }) => {
  const errorClass = error ? 'border-red-500' : 'border-gray-200';

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none ${errorClass}`}
      />
      <div className="h-5 mt-1">
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
    </div>
  );
};

export default Textarea;
