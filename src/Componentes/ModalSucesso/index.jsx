import React from 'react';
import Button from '../Button';

const ModalSucesso = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center max-w-sm mx-auto transform transition-all animate-fade-in-up">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Obrigado!</h3>
        <p className="text-gray-600 mb-8">Sua mensagem foi enviada com sucesso. Retornaremos o contato em até 48 horas.</p>
        <Button 
          text="Fechar" 
          onClick={onClose} 
        />
      </div>
    </div>
  );
};

export default ModalSucesso;
