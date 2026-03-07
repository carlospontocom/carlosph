import React from 'react';
import Contato from '../Contato';

const Home = () => {
  return (
    <div className="bg-gray-100 font-sans">
      {/* Hero Section */}
      <header className="bg-gray-800 text-white text-center p-12 md:p-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Carlos Nascimento</h1>
        <p className="text-lg md:text-xl">Desenvolvedor Web</p>
        <div className="mt-8">
          <a href="#contato" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Entre em Contato
          </a>
        </div>
      </header>

      {/* About Section */}
      <section id="sobre" className="py-16 px-8 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Sobre Mim</h2>
          <p className="text-gray-700 leading-relaxed">
            Olá! Sou Carlos Nascimento, um desenvolvedor web apaixonado por criar aplicações web modernas e responsivas.
            Tenho experiência com diversas tecnologias e estou sempre buscando aprender mais.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="bg-gray-200 py-16 px-8 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Projetos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Projeto 1</h3>
                <p className="text-gray-700">Descrição do projeto.</p>
              </div>
            </div>
            {/* Add more project cards here */}
          </div>
        </div>
      </section>

      <Contato/>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Carlos Nascimento. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
