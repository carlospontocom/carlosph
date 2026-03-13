import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Campo from '../Campo';
import Button from '../Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pedido de recuperação para o e-mail:', email);
  };

  return (
    <section className="bg-gray-200 flex items-center justify-center min-h-[80vh] pt-[20vh] pb-[12vh] px-2">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-gray-50 rounded-2xl shadow-xl p-4">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-gray-900">Recuperar Senha</h2>
            <p className="mt-4 text-gray-600">Insira seu e-mail para receber o link de redefinição.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Campo 
                label="Seu e-mail"
                placeholder="email@exemplo.com"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-8 text-center">
              <Button 
                text={'Enviar Link'} 
                type="submit" 
              />
            </div>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-cyan-600 hover:underline">
                Voltar para o Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
