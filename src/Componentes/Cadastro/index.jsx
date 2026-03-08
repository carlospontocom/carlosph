import React from 'react';
import Campo from '../Campo';
import Select from '../Select';
import Button from '../Button';

const Cadastro = () => {
  const profissoesOptions = [
    'Selecionar profissão',
    'Desenvolvedor',
    'Designer',
    'Gerente de Projetos',
    'Outro',
  ];

  return (
    <section id="cadastro" className="bg-gray-200 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Crie sua conta</h2>
          <p className="mt-4 text-lg text-gray-600">Preencha o formulário abaixo para se cadastrar.</p>
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-xl p-8 md:p-12">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Campo
                label="Nome completo"
                placeholder="Seu nome completo"
                name="nome"
              />
              <Campo
                label="Gênero"
                placeholder="Seu gênero"
                name="genero"
              />
               <Campo
                label="Endereço"
                placeholder="Seu endereço"
                name="endereco"
              />
              <Select
                label="Profissão"
                options={profissoesOptions}
                name="profissao"
              />
              <Campo
                label="Seu e-mail"
                placeholder="email@exemplo.com"
                type="email"
                name="email"
              />
              <Campo
                label="Sua senha"
                placeholder="********"
                type="password"
                name="senha"
              />
            </div>
            <div className="mt-8 text-center">
                <Button
                    text={'Cadastrar'}
                    type="submit"
                />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Cadastro;