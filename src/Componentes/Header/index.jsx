import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { title: 'Início', path: '#inicio' },
    { title: 'Projetos', path: '#projetos' },
    { title: 'Contato', path: '#contato' },
  ];

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Nome */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-gray-800">Frontend::</a>
          </div>

          {/* Navegação para Desktop */}
          <nav className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.path}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition duration-150 ease-in-out"
                >
                  {link.title}
                </a>
              ))}
            </div>
            {/* Botão de Login e Cadastro */}
            <div className="ml-4 flex items-center">
                <Link 
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition duration-150 ease-in-out"
                >
                    Login
                </Link>
                <Link 
                    to="/cadastro"
                    className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-cyan-700 bg-cyan-100 hover:bg-cyan-200 transition duration-150 ease-in-out"
                >
                    Cadastre-se
                </Link>
            </div>
          </nav>

          {/* Botão do Menu Hambúrguer (Mobile) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown (Mobile) */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.path}
                onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                {link.title}
              </a>
            ))}
             <Link 
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-3 py-2 mt-2 rounded-md text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition duration-150 ease-in-out"
            >
                Login
            </Link>
             <Link 
                to="/cadastro"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-3 py-2 mt-2 rounded-md text-base font-medium text-cyan-700 bg-cyan-100 hover:bg-cyan-200 transition duration-150 ease-in-out"
            >
                Cadastre-se
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;