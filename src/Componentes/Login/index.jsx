import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Campo from '../Campo';
import Button from '../Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tentativa de login com:', { email, password });
  };

  return (
    <section className="bg-gray-200 py-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Acessar Painel</h2>
            <p className="mt-2 text-gray-600">Bem-vindo de volta!</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Campo 
                label="Seu e-mail"
                placeholder="email@exemplo.com"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Campo 
                label="Sua senha"
                placeholder="********"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-6 text-right">
              <Link to="/esqueci-senha" className="text-sm text-cyan-600 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <div className="mt-8 text-center">
              <Button 
                text={'Entrar'} 
                type="submit" 
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
