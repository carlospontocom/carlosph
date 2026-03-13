# Blueprint do Sistema de Gerenciamento de Projetos

## Visão Geral da Arquitetura

Este documento detalha a arquitetura, as funcionalidades e os fluxos de dados do sistema de gerenciamento de projetos e portfólio. O projeto foi construído com uma arquitetura moderna baseada em componentes, utilizando React para o frontend e Firebase para o backend.

### Arquitetura Frontend

*   **React com Vite:** Para uma experiência de desenvolvimento rápida e eficiente.
*   **React Router:** Para o gerenciamento de rotas e a criação de uma Single Page Application (SPA).
*   **Componentização:** A interface é dividida em componentes reutilizáveis, seguindo os princípios do design atômico.
*   **Tailwind CSS:** Para a estilização da interface, permitindo a criação de um design moderno e responsivo de forma rápida e eficiente.

### Arquitetura Backend (Firebase)

*   **Firestore:** Um banco de dados NoSQL para armazenar informações sobre usuários, projetos e mensagens do chat.
*   **Authentication:** Para gerenciar a autenticação de usuários (cadastro, login, recuperação de senha) de forma segura.
*   **Hosting:** Para hospedar a aplicação web e disponibilizá-la na internet.

## Fluxo de Dados

### Autenticação

1.  **Cadastro:** O usuário se cadastra com nome, e-mail e senha. As informações são salvas na coleção `usuarios` do Firestore.
2.  **Login:** O usuário faz login com e-mail e senha. O sistema verifica o UID do usuário para determinar se ele é um administrador ou um cliente.
3.  **Redirecionamento:** Com base no tipo de usuário, ele é redirecionado para o `AdminDashboard` ou para o `DashboardUsuario`.

### Gerenciamento de Projetos

*   **Criação:** O cliente cria um novo projeto, que é salvo na coleção `projetos` do Firestore com o status "pendente".
*   **Visualização:** O cliente visualiza apenas os seus projetos, enquanto o administrador visualiza todos os projetos de todos os clientes.
*   **Atualização de Status:** O administrador pode atualizar o status de um projeto (Pendente, Em andamento, Concluído, Cancelado), e essa informação é refletida em tempo real para o cliente.
*   **Aprovação:** O cliente pode aprovar um orçamento de projeto, alterando seu status para "aprovado".

### Chat em Tempo Real

*   **Comunicação:** As mensagens trocadas entre o cliente e o administrador são salvas na coleção `mensagens` do Firestore.
*   **Tempo Real:** O sistema utiliza o `onSnapshot` do Firestore para ouvir as alterações na coleção `mensagens` e atualizar a interface em tempo real.
*   **Notificações:** O administrador recebe notificações de mensagens não lidas de todos os clientes.

## Estrutura do Banco de Dados (Firestore)

*   **Coleção `usuarios`:**
    *   **Documento (UID do usuário):**
        *   `nome`: (string) Nome do usuário.
        *   `email`: (string) E-mail do usuário.

*   **Coleção `projetos`:**
    *   **Documento (ID do projeto):**
        *   `userId`: (string) UID do usuário que criou o projeto.
        *   `nomeProjeto`: (string) Nome do projeto.
        *   `descricao`: (string) Descrição do projeto.
        *   `tecnologia`: (string) Tecnologia principal do projeto.
        *   `status`: (string) Status do projeto (pendente, aprovado, Em andamento, Concluído, Cancelado).
        *   `createdAt`: (timestamp) Data de criação do projeto.

*   **Coleção `mensagens`:**
    *   **Documento (ID da mensagem):**
        *   `userId`: (string) UID do usuário.
        *   `text`: (string) Conteúdo da mensagem.
        *   `sender`: (string) "user" ou "admin".
        *   `read`: (boolean) Se a mensagem foi lida.
        *   `timestamp`: (timestamp) Data de envio da mensagem.
