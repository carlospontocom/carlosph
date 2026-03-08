# Portfólio de Desenvolvedor Frontend

Este é um portfólio web moderno e interativo, projetado para apresentar as habilidades, projetos e a trajetória de um Desenvolvedor Frontend com conhecimento Full Stack. O projeto foi desenvolvido com foco em React, Vite, Tailwind CSS e Firebase.

## Visão Geral do Projeto

O objetivo é apresentar de forma clara e profissional as competências do desenvolvedor. O design foi concebido para ser clean, atraente e totalmente responsivo, proporcionando uma experiência de usuário de alta qualidade em qualquer dispositivo.

## Tecnologias Utilizadas

- **Frontend:** React, Vite, Tailwind CSS
- **Backend/Infraestrutura:** Firebase (Hosting)
- **Serviço de Email:** EmailJS (integrado no formulário de contato)
- **Ícones:** React Icons

---

## Funcionalidades

- **Barra de Navegação Responsiva:** Navegação fixa no topo com menu "hambúrguer" para dispositivos móveis.
- **Seção de Apresentação (Hero):** Um primeiro impacto forte, resumindo as competências e a experiência do desenvolvedor.
- **Seção de Projetos:** Exibição dos projetos mais relevantes em um layout de grid com um modal para detalhes.
- **Formulário de Contato com Validação:** Permite que visitantes entrem em contato diretamente, com validação de dados em tempo real.
- **Rodapé:** Links para redes sociais, informações de contato e copyright.

---

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

---

## Deploy

O projeto está configurado para deploy contínuo no Firebase Hosting.

1.  **Gere a build de produção:**
    ```bash
    npm run build
    ```

2.  **Faça o deploy para o Firebase:**
    ```bash
    firebase deploy --only hosting
    ```

---

## Documentação da API (Swagger Básico)

Apesar da implementação atual usar EmailJS no lado do cliente, esta seção documenta como um endpoint de API para o formulário de contato se comportaria.

### Endpoint: `/api/contact`

#### Método: `POST`

Envia os dados do formulário de contato para um serviço de backend que processaria e enviaria o email.

#### Descrição

Este endpoint é responsável por receber os dados do formulário, validá-los e, se válidos, enviar um email para o administrador do portfólio.

#### Corpo da Requisição (Request Body)

```json
{
  "nome": "string",
  "email": "string (formato de email)",
  "assunto": "string",
  "mensagem": "string"
}
```

#### Respostas (Responses)

-   **`200 OK`** (Sucesso)

    Indica que o email foi enviado com sucesso.

    ```json
    {
      "status": "success",
      "message": "Email enviado com sucesso!"
    }
    ```

-   **`400 Bad Request`** (Erro de Validação)

    Indica que os dados enviados eram inválidos. O corpo da resposta contém os erros específicos.

    ```json
    {
      "status": "error",
      "message": "Dados inválidos fornecidos.",
      "errors": {
        "nome": "O campo nome é obrigatório.",
        "email": "O formato do email é inválido.",
        "assunto": "O campo assunto é obrigatório.",
        "mensagem": "O campo mensagem é obrigatório."
      }
    }
    ```

-   **`500 Internal Server Error`** (Erro no Servidor)

    Indica que ocorreu um erro no servidor ao tentar enviar o email.

    ```json
    {
      "status": "error",
      "message": "Ocorreu um erro interno no servidor."
    }
    ```
