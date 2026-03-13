import React, { useState } from 'react';
import Card from '../Card';
import Modal from '../Modal';
import { MessageSquare } from 'lucide-react';

// --- Ícones para os Cards ---
const CalendarIcon = () => (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);

const ChatIcon = () => (
  <svg 
    className="w-10 h-10" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="固定8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const ChecklistIcon = () => (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
);

const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);
// ---

const Projetos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectData = [
    {
      title: 'Agenda Online',
      icon: <CalendarIcon />,
      bgColor: 'bg-purple-600',
      description: 'Sistema de agendamento para prestadores de serviços com notificações e calendário.',
      technologies: ['React JS', 'Node.js (Básico)', 'Firebase'],
      functionalities: ['Calendário interativo', 'Notificações por email', 'Cancelamento e remarcação'],
      demoLink: '#',
      modalContent: {
        detailedDescription: 'Este sistema robusto foi desenvolvido para otimizar a gestão de agendamentos de profissionais autônomos e pequenas empresas. A plataforma oferece uma experiência de usuário fluida, desde a visualização de horários disponíveis até a confirmação do serviço, tudo de forma integrada e automatizada.',
        detailedFunctionalities: [
          { title: 'Calendário Interativo', description: 'Permite que os clientes visualizem rapidamente os horários livres e agendem com apenas alguns cliques, evitando conflitos de agenda.' },
          { title: 'Notificações por Email', description: 'Confirmações, lembretes e avisos de cancelamento são enviados automaticamente, reduzindo o não comparecimento (no-show).' },
          { title: 'Cancelamento e Remarcação Flexível', description: 'Regras de negócio personalizáveis para cancelamentos e remarcações, dando autonomia ao usuário dentro de limites pré-definidos.' },
        ]
      }
    },
    {
      title: 'Chat Firebase',
      icon: <MessageSquare />,
      bgColor: 'bg-green-500',
      description: 'Aplicação de chat em tempo real com interface intuitiva e sincronização instantânea.',
      technologies: ['React JS', 'Tailwind CSS', 'Firebase'],
      functionalities: [
        'Mensagens em tempo real',
        'Indicação de mensagem não lida',
        'Informações do contato',
        'Indicação de data e horário de envio'
      ],
      demoLink: '#',
      modalContent: {
        detailedDescription: 'Um sistema de chat completo desenvolvido para proporcionar uma experiência de comunicação fluida. Utiliza o Firebase para garantir que as mensagens sejam entregues instantaneamente, com foco em uma interface limpa e responsiva inspirada nos melhores apps de mensagens atuais.',
        detailedFunctionalities: [
          { 
            title: 'Comunicação Instantânea', 
            description: 'Troca de mensagens em tempo real com persistência de dados no Firestore, garantindo que o histórico nunca seja perdido.' 
          },
          { 
            title: 'Gestão de Status', 
            description: 'Sistema inteligente que identifica mensagens pendentes de leitura e exibe metadados cruciais como o timestamp (horário) exato do envio.' 
          },
          { 
            title: 'Perfis e Contatos', 
            description: 'Visualização detalhada dos dados do contato, permitindo identificar com quem você está conversando de forma rápida e segura.' 
          },
        ]
      }
    },
    {
      title: 'Checklist App',
      icon: <ChecklistIcon />,
      bgColor: 'bg-blue-500',
      description: 'Aplicativo de checklist para tarefas diárias com autenticação e sincronização em tempo real.',
      technologies: ['React JS', 'Firebase', 'Auth API'],
      functionalities: ['Login com Google/Facebook', 'Listas personalizadas', 'Sincronização em tempo real'],
      demoLink: '#',
      modalContent: {
        detailedDescription: 'Focado na produtividade, este aplicativo ajuda usuários a organizar suas tarefas diárias de forma eficiente. Com a sincronização em tempo real do Firebase, as listas de tarefas estão sempre atualizadas em todos os dispositivos. A autenticação social simplifica o processo de login.',
        detailedFunctionalities: [
          { title: 'Login Social (Google/Facebook)', description: 'Integração com Firebase Auth para um processo de login rápido e seguro, sem a necessidade de criar novas senhas.' },
          { title: 'Listas Personalizadas', description: 'Crie, edite e organize múltiplas listas de tarefas para diferentes contextos (trabalho, pessoal, estudos).' },
          { title: 'Sincronização em Tempo Real', description: 'Utilizando o Firestore, qualquer alteração em uma lista é instantaneamente refletida em todos os dispositivos logados.' },
          { title: 'Modo Offline', description: 'O aplicativo permite a visualização e edição de tarefas mesmo sem conexão com a internet, sincronizando as alterações assim que a conexão for restabelecida.' },
        ]
      }
    },
  ];

  const handleSaibaMaisClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const techColorMap = {
    'React JS': 'bg-blue-200 text-blue-800',
    'Node.js (Básico)': 'bg-green-200 text-green-800',
    'Firebase': 'bg-yellow-200 text-yellow-800',
    'JavaScript': 'bg-yellow-200 text-yellow-800',
    'REST API': 'bg-indigo-200 text-indigo-800',
    'Auth API': 'bg-pink-200 text-pink-800',
  };

  return (
    <section className="py-20 bg-gray-200" id="projetos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Meus Projetos</h2>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
          {projectData.map((project) => (
            <Card 
              key={project.title} 
              {...project} 
              onSaibaMaisClick={() => handleSaibaMaisClick(project)}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedProject && selectedProject.modalContent && (
             <div className="max-h-[70vh] overflow-y-auto">
            <div className={`p-6 text-white flex items-center rounded-t-lg ${selectedProject.bgColor}`}>
                <div className="mr-4">{selectedProject.icon}</div>
                <h3 className="text-4xl">{selectedProject.title}</h3>
            </div>
            <div className="p-8">
              <p className="text-gray-700 text-lg mb-6">{selectedProject.modalContent.detailedDescription}</p>
              
              <h4 className="font-bold text-xl mb-4 text-gray-800">Tecnologias:</h4>
              <div className="flex flex-wrap gap-3 mb-6">
                {selectedProject.technologies.map(tech => (
                  <span key={tech} className={`px-4 py-1 text-sm font-semibold rounded-full ${techColorMap[tech] || 'bg-gray-200 text-gray-800'}`}>{tech}</span>
                ))}
              </div>

              <h4 className="font-bold text-xl mb-4 text-gray-800">Principais Funcionalidades:</h4>
              <ul className="space-y-4">
                {selectedProject.modalContent.detailedFunctionalities.map(func => (
                  <li key={func.title} className="flex items-start">
                    <CheckIcon />
                    <div>
                        <h5 className="font-semibold text-gray-800">{func.title}</h5>
                        <p className="text-gray-600">{func.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Projetos;
