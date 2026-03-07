import React from 'react';
import Campo from '../Campo';
import Button from '../Button';
import Textarea from '../Textarea';
import Select from '../Select'; // Importando o componente Select

const Contato = () => {
  const servicosOptions = [
    'Selecionar serviços',
    'Suporte técnico',
    'Desenvolvimento frontend',
    'Desenvolvimento Backend',
    'Adição de funcionalidade',
    'Correções e Atualização',
    'Dúvidas gerais'
  ];

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Saiba mais</h2>
        <h3 className="text-center">Para maiores informações sobre nossos serviços preencha o formulário abaixo</h3>
      
      <form className="max-w-md mx-auto">
        <Campo placeholder="Nome" label="Nome" />
        <Campo placeholder="E-mail" label="E-mail"/>
        <Campo placeholder="Telefone" label="Telefone"/>
        <Select label="Serviços" options={servicosOptions} />
        <Textarea placeholder="Mensagem" label="Mensagem"/>
        <Button text="Enviar" bgcolor="#007bff" color="white"/>
      </form>
      </div>
    </section>
  );
};

export default Contato;
