import React from 'react';

// SVG Icons
const DemoIcon = () => (
    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
);

const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const Card = ({ title, icon, bgColor, description, technologies, functionalities, onSaibaMaisClick }) => {
    
  const techColorMap = {
    'React JS': 'bg-blue-200 text-blue-800',
    'Node.js': 'bg-green-200 text-green-800',
    'Payment API': 'bg-purple-200 text-purple-800',
    'Firebase': 'bg-yellow-200 text-yellow-800',
    'JavaScript': 'bg-yellow-200 text-yellow-800',
    'REST API': 'bg-indigo-200 text-indigo-800',
    'Auth API': 'bg-pink-200 text-pink-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-transform transform hover:-translate-y-2">
      <div className={`p-4 text-white flex items-center min-h-[200px] ${bgColor}`}>
        <div className="mr-4">{icon}</div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <div className="p-6 flex-grow">
        <p className="text-gray-600 mb-6">{description}</p>
        
        <h4 className="font-semibold mb-2 text-gray-800">Tecnologias:</h4>
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map(tech => (
            <span key={tech} className={`px-3 py-1 text-sm font-bold rounded-full ${techColorMap[tech] || 'bg-gray-200 text-gray-800'}`}>
              {tech}
            </span>
          ))}
        </div>

        <h4 className="font-semibold mb-2 text-gray-800">Funcionalidades:</h4>
        <ul className="text-gray-600 space-y-2">
          {functionalities.map(func => (
            <li key={func} className="flex items-start">
              <CheckIcon />
              <span>{func}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto flex justify-center items-center">
        <button onClick={onSaibaMaisClick} className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 transition-colors">
          Saiba mais
        </button>
      </div>
    </div>
  );
};

export default Card;
