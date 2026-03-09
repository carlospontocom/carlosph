import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { auth, db } from '../Config/Database.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'usuarios', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsUserMenuOpen(false);
      setIsOpen(false);
      navigate('/login');
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const navLinks = [
    { title: 'Início', path: '/#inicio' },
    { title: 'Projetos', path: '/#projetos' },
    { title: 'Contato', path: '/#contato' },
  ];

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Nome */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800">Frontend::</Link>
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
            
            <div className="ml-4 flex items-center relative">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                  >
                    <i className="fas fa-user-circle text-3xl text-gray-600 hover:text-cyan-600"></i>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-2 px-4">
                      <div className="border-bottom pb-2 mb-2 border-gray-100">
                        <p className="text-sm font-bold text-gray-900 truncate">{userData?.nome || 'Usuário'}</p>
                        <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
                        <p className="text-xs text-cyan-600 font-medium truncate mt-1">{userData?.profissao}</p>
                      </div>
                      <Link to="/dashboard" onClick={() => setIsUserMenuOpen(false)} className="block py-2 text-sm text-gray-700 hover:text-cyan-600">Meu Painel</Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left py-2 text-sm text-red-600 hover:text-red-800 font-medium"
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
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
                </>
              )}
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
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                {link.title}
              </a>
            ))}
            {user ? (
              <div className="border-t border-gray-100 mt-2 pt-4 pb-2 px-3">
                <div className="flex items-center mb-3">
                  <i className="fas fa-user-circle text-2xl text-gray-600 mr-3"></i>
                  <div>
                    <p className="text-base font-medium text-gray-800">{userData?.nome}</p>
                    <p className="text-sm text-gray-500">{userData?.email}</p>
                  </div>
                </div>
                <Link 
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-2 text-base font-medium text-gray-700"
                >
                  Meu Painel
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-base font-medium text-red-600"
                >
                  Sair
                </button>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;