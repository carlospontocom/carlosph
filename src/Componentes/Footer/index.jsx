import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { SiVercel } from 'react-icons/si';

const Footer = () => {
  const socialLinks = [
    { icon: <FaWhatsapp />, url: 'https://wa.me/5511999999999', name: 'WhatsApp' },
    { icon: <FaGithub />, url: 'https://github.com/frontend', name: 'GitHub' },
    { icon: <SiVercel />, url: 'https://vercel.com/seu-usuario', name: 'Vercel' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/frontend', name: 'LinkedIn' },
    ];

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Coluna 1: Sobre */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Frontend</h3>
          <p className="text-gray-400">
            Desenvolvedor Full Stack apaixonado por criar experiências web incríveis.
          </p>
        </div>

        {/* Coluna 2: Links Rápidos (Exemplo) */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Navegação</h3>
          <ul className="space-y-2">
            <li><a href="#inicio" className="hover:text-blue-400 transition-colors">Início</a></li>
            <li><a href="#projetos" className="hover:text-blue-400 transition-colors">Projetos</a></li>
            <li><a href="#contato" className="hover:text-blue-400 transition-colors">Contato</a></li>
          </ul>
        </div>

        {/* Coluna 3: Redes Sociais */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Conecte-se</h3>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-white hover:scale-110 transition-all"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Linha de Copyright */}
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Frontend. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
