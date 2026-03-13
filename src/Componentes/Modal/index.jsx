
import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center max-h-[90vh] pt-[10px]">
      <div className="bg-white p-2 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
