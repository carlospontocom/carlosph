import React, { useState } from 'react';
import Campo from '../Campo';
import Select from '../Select';
import Button from '../Button';
import { auth, db } from '../Config/Database.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    genero: '',
    endereco: '',
    profissao: '',
    email: '',
    senha: '',
  });

  const profissoesOptions = [
    'Selecionar profissão',
    'Desenvolvedor',
    'Designer',
    'Gerente de Projetos',
    'Outro',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.senha
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        nome: formData.nome,
        genero: formData.genero,
        endereco: formData.endereco,
        profissao: formData.profissao,
        email: formData.email,
      });

      alert('Cadastro realizado com sucesso!');
      setFormData({
        nome: '',
        genero: '',
        endereco: '',
        profissao: '',
        email: '',
        senha: '',
      });
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert('Erro ao realizar cadastro: ' + error.message);
    }
  };

  return (
    <section id="cadastro" className="bg-gray-200 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Crie sua conta</h2>
          <p className="mt-4 text-lg text-gray-600">Preencha o formulário abaixo para se cadastrar.</p>
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Campo
                label="Nome completo"
                placeholder="Seu nome completo"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
              <Campo
                label="Gênero"
                placeholder="Seu gênero"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
              />
               <Campo
                label="Endereço"
                placeholder="Seu endereço"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
              />
              <Select
                label="Profissão"
                options={profissoesOptions}
                name="profissao"
                value={formData.profissao}
                onChange={handleChange}
              />
              <Campo
                label="Seu e-mail"
                placeholder="email@exemplo.com"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Campo
                label="Sua senha"
                placeholder="********"
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
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