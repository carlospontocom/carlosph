import React from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaCloud, FaGraduationCap, FaBriefcase, FaGithub, FaFire } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiFirebase, SiMysql, SiRender, SiVercel } from 'react-icons/si';

const Hero = () => {
  // Tecnologias  
  const techStack = [
    { icon: <FaReact className="text-blue-400" />, name: 'React.js', bg: 'bg-blue-100' },
    { icon: <FaNodeJs className="text-green-600" />, name: 'Node.js (Básico)', bg: 'bg-green-100' },
    { icon: <SiMongodb className="text-green-700" />, name: 'MongoDB', bg: 'bg-green-100' },
    { icon: <SiFirebase className="text-yellow-500" />, name: 'Firebase', bg: 'bg-yellow-100' },
    { icon: <SiMysql className="text-blue-600" />, name: 'MySQL (TiDB)', bg: 'bg-blue-100' },
    { icon: <SiTailwindcss className="text-cyan-500" />, name: 'Tailwind', bg: 'bg-cyan-100' },
    { icon: <FaGithub className="text-gray-800" />, name: 'Git/GitHub', bg: 'bg-gray-100' },
    { icon: <SiRender className="text-purple-600" />, name: 'Render', bg: 'bg-purple-100' },
    { icon: <SiVercel className="text-black" />, name: 'Vercel', bg: 'bg-gray-100' },
    { icon: <FaCloud className="text-blue-500" />, name: 'Netlify', bg: 'bg-blue-100' },
  ];

  // Estatísticas
  const stats = [
    { number: '2', label: 'Graduações', icon: <FaGraduationCap /> },
    { number: '5+', label: 'Anos experiência', icon: <FaBriefcase /> },
    { number: '10+', label: 'Tecnologias', icon: <FaFire /> },
    { number: '3', label: 'Conhecimentos', icon: <FaDatabase /> },
  ];

  return (
    <section id="inicio" className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Coluna Esquerda - Informações Pessoais */}
          <div className="space-y-6">
            {/* Badge de formação */}
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <FaGraduationCap className="text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Pós-graduando em Frontend com React
              </span>
            </div>

            {/* Título principal */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Desenvolvedor Frontend{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                + Backend Básico
              </span>
            </h1>

            {/* Descrição profissional */}
            <p className="text-xl text-gray-600 max-w-2xl">
              Pós-graduando em desenvolvimento frontend, focado em criar interfaces ricas com React e com conhecimento em Node.js (Básico) para APIs.
            </p>

            {/* Stack de tecnologias em badges */}
            <div className="flex flex-wrap gap-2">
              {techStack.slice(0, 6).map((tech, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 ${tech.bg} text-gray-700 rounded-full text-sm font-medium`}
                >
                  {tech.icon}
                  {tech.name}
                </span>
              ))}
              <span className="inline-flex items-center px-3 py-1.5 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                +4 tecnologias
              </span>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projetos"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <FaReact />
                Ver Projetos
              </a>
              <a
                href="#contato"
                className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all border border-gray-300 hover:border-blue-600 flex items-center gap-2"
              >
                <FaBriefcase />
                Vamos Trabalhar Juntos
              </a>
            </div>

            {/* Cards de estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="text-2xl text-blue-600 mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Direita - Cards de especialidades */}
          <div className="space-y-6">
            {/* Card principal - Formação */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-600">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaGraduationCap className="text-blue-600" />
                Formação Acadêmica
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Pós-graduando em Frontend</p>
                    <p className="text-sm text-gray-500">React.js</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Graduação em Administração</p>
                    <p className="text-sm text-gray-500">Gestão · Dados · Processos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card - Especialidades Técnicas */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-purple-600">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaDatabase className="text-purple-600" />
                Stack Completa
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Frontend</p>
                  <p className="text-xs text-gray-500">React · Tailwind</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Backend</p>
                  <p className="text-xs text-gray-500">Node.js (Básico) · API REST · Firebase</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Banco de Dados</p>
                  <p className="text-xs text-gray-500">MongoDB · MySQL (TiDB) · Firebase</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">DevOps</p>
                  <p className="text-xs text-gray-500">Git · Render · Vercel · Netlify</p>
                </div>
              </div>
            </div>

            {/* Card - Experiência Profissional */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-green-600">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaBriefcase className="text-green-600" />
                Experiência Profissional
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Help Desk & Suporte</span>
                  <span className="text-sm text-gray-500">5+ anos</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Gestão de Dados</span>
                  <span className="text-sm text-gray-500">Especialista</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Pacote Office</span>
                  <span className="text-sm text-gray-500">Avançado</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">CRUD e APIs</span>
                  <span className="text-sm text-gray-500">Completo</span>
                </div>
              </div>
            </div>

            {/* Card - Deploy e Versionamento */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FaCloud />
                Deploy & Versionamento
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Git</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">GitHub</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Render</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Vercel</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Netlify</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">CI/CD</span>
              </div>
              <p className="text-sm mt-3 text-white/80">
                Experiência com deploy contínuo e hospedagem de aplicações completas
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé do Hero - Tecnologias adicionais */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center mb-4">
            Tecnologias que utilizo no dia a dia
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1 group cursor-pointer"
                title={tech.name}
              >
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <span className="text-xs text-gray-500">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
