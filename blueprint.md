# Blueprint do Portfólio

## Visão Geral do Projeto

Este documento detalha a arquitetura, funcionalidades e o processo de desenvolvimento de um portfólio web moderno e interativo. O objetivo é apresentar de forma clara e profissional as habilidades, projetos e a trajetória de um **Desenvolvedor Frontend com Conhecimento Full Stack**, com foco especial em React, Node.js (Básico) e Firebase.

O design foi concebido para ser clean, atraente e totalmente responsivo, proporcionando uma experiência de usuário de alta qualidade em qualquer dispositivo.

---

## Funcionalidades e Design Implementados

### 1. **Barra de Navegação Responsiva (`Header`)**
- **Propósito:** Oferecer uma navegação rápida, acessível e consistente em todos os dispositivos.
- **Design:** Fixo no topo, com fundo branco, sombra sutil e menu "hambúrguer" para dispositivos móveis.
- **Tecnologias:** React, `useState`, Tailwind CSS, React Icons.

### 2. **Seção Hero (Apresentação)**
- **Propósito:** Causar um primeiro impacto forte, resumindo as competências e a experiência do desenvolvedor.
- **Design:** Layout de duas colunas, adaptável, com cards informativos e ícones de tecnologias.
- **Tecnologias:** React, Tailwind CSS.

### 3. **Seção de Projetos**
- **Propósito:** Exibir os projetos mais relevantes de forma organizada e interativa.
- **Design:** Layout em grid com cards e um componente `Modal` para exibir detalhes.
- **Tecnologias:** React, Tailwind CSS, `useState`.

### 4. **Seção de Contato (Formulário com Validação)**
- **Propósito:** Permitir que visitantes entrem em contato diretamente pelo site, garantindo que os dados enviados sejam válidos.
- **Design:** Formulário limpo e moderno com campos para nome, e-mail, assunto e mensagem. Exibe feedback de erro em tempo real.
- **Tecnologias:** React, `useState`, Tailwind CSS.

### 5. **Rodapé (`Footer`)**
- **Propósito:** Finalizar a página com informações de contato, links para redes sociais e copyright.
- **Design:** Layout dividido em colunas com links sociais e informações adicionais.
- **Tecnologias:** React, Tailwind CSS, React Icons.

---

## Plano de Alterações Recentes

### Solicitação 9: Validação do Formulário de Contato
- **Objetivo:** Implementar uma validação robusta no formulário de contato para garantir que os dados enviados sejam corretos e completos.
- **Ações:**
    1.  **Componentes de Formulário (`Campo`, `Select`, `Textarea`):**
        - Modificados para aceitar uma `prop` `error`.
        - Quando um erro é passado, eles exibem uma mensagem de erro e uma borda vermelha para feedback visual imediato.
        - Adicionada a `prop` `name` para que a lógica de estado do formulário funcione corretamente.
    2.  **Componente `Contato`:**
        - Utilizado o hook `useState` para gerenciar os dados do formulário (`formData`) e os erros de validação (`errors`).
        - Criada a função `validate`, que verifica se os campos obrigatórios (nome, e-mail, assunto, mensagem) estão preenchidos e se o e-mail tem um formato válido.
        - Implementada a função `handleSubmit`, que é acionada no envio do formulário. Ela chama a `validate` e, somente se a validação for bem-sucedida, os dados são processados.
- **Resultado:** O formulário de contato agora possui uma validação do lado do cliente que impede envios incompletos ou inválidos, melhorando a qualidade dos dados recebidos e a experiência do usuário ao fornecer feedback claro sobre os erros.

### Solicitação 8: Restauração do Formulário de Contato
- **Ações:**
    - O componente `<Contato />`, que havia sido removido por engano, foi reintegrado ao `App.jsx`.
    - O atributo `id="contato"` duplicado foi removido do `Footer` para garantir que a navegação aponte para a seção correta (o formulário).
- **Resultado:** O formulário de contato foi restaurado com sucesso, e a navegação da página voltou a funcionar como esperado.

### Solicitação 7: Menu Responsivo e Mudança de Cor
- **Ações:**
    - O `Header` foi reestruturado para ser totalmente responsivo com um menu "hambúrguer".
    - O esquema de cores escuro foi substituído por um fundo branco com sombra.
- **Resultado:** A barra de navegação tornou-se mais moderna, funcional e esteticamente coesa.

### Solicitação 6: Adição da Barra de Navegação Fixa
- **Ações:**
    - Criado e integrado o componente `Header` com links de navegação suaves.
- **Resultado:** A usabilidade do site foi significativamente melhorada com uma navegação fixa e acessível.

### Solicitação 1 a 5: Refinamentos Iniciais
- **Ações:**
    - Ajustes no foco da stack (React), terminologia profissional, destaque visual para Frontend e descrições de projetos.
- **Resultado:** O conteúdo do portfólio foi alinhado com mais precisão aos objetivos e habilidades do desenvolvedor.
