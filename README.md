# Sistema de Gerenciamento de Projetos e Portfólio

Este é um projeto full-stack que combina um portfólio de desenvolvedor com um sistema completo de gerenciamento de projetos e um chat em tempo real para comunicação com clientes. A aplicação foi desenvolvida com React, Vite, Tailwind CSS e Firebase.

## Visão Geral do Projeto

O projeto oferece duas interfaces distintas:

1.  **Interface do Cliente:** Permite que os clientes se cadastrem, façam login, criem, gerenciem e aprovem projetos, além de se comunicarem com o administrador através de um chat em tempo real.
2.  **Interface do Administrador:** Um painel de controle completo para o administrador gerenciar todos os projetos, atualizar seus status e se comunicar com os clientes.

## Tecnologias Utilizadas

*   **Frontend:** React, Vite, Tailwind CSS
*   **Backend e Banco de Dados:** Firebase (Firestore, Authentication, Hosting)
*   **Roteamento:** React Router
*   **Ícones:** React Icons

## Funcionalidades Principais

### Para Clientes:

*   **Autenticação:** Cadastro, login e recuperação de senha.
*   **Dashboard do Usuário:**
    *   Criação, edição e exclusão de projetos (com limite de 3).
    *   Aprovação de orçamentos de projetos.
    *   Visualização do status dos projetos.
*   **Chat em Tempo Real:** Comunicação direta com o administrador.

### Para o Administrador:

*   **Painel de Controle Centralizado:**
    *   Visualização de todos os projetos de todos os clientes.
    *   Atualização do status dos projetos (Pendente, Em andamento, Concluído, Cancelado).
    *   Exclusão de projetos.
*   **Gerenciamento de Comunicação:**
    *   Chat em tempo real com todos os clientes.
    *   Notificações de mensagens não lidas.

## Como Executar o Projeto Localmente

Para clonar e executar este projeto em sua máquina local, siga estas etapas:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd seu-repositorio
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

    O site estará disponível em `http://localhost:5173`.

## Estrutura do Projeto

*   **`src/`**: Contém todo o código-fonte da aplicação.
    *   **`Componentes/`**: Onde todos os componentes React estão localizados.
        *   **`AdminDashboard.jsx`**: Painel de controle do administrador.
        *   **`DashboardUsuario.jsx`**: Painel de controle do cliente.
        *   **`Chat.jsx`**: Componente de chat em tempo real.
        *   **`Login.jsx`**, **`Cadastro.jsx`**, **`ForgotPassword.jsx`**: Componentes de autenticação.
        *   **`Home.jsx`**, **`Projetos.jsx`**, **`Contato.jsx`**: Componentes do portfólio.
    *   **`main.jsx`**: Ponto de entrada da aplicação React.
    *   **`App.jsx`**: Define as rotas da aplicação.
*   **`firebase.json`**: Arquivo de configuração do Firebase.
*   **`package.json`**: Lista as dependências e scripts do projeto.
