# 💰 Banking App

Aplicação web de gerenciamento financeiro, validação de formulários e boas práticas modernas de desenvolvimento frontend.

## Demo

👉 https://brenolg.github.io/Banking-app


## 🧠 Sobre o projeto

O **Banking App** simula uma interface bancária onde o usuário pode:

- 🔐 Realizar login com validação
- 📊 Visualizar saldo, receitas e despesas
- 💸 Simulação de uma transação
- 💸 Acompanhar histórico de transações 

O projeto foi desenvolvido com foco em:

- Arquitetura limpa
- Testes automatizados
- Tipagem com TypeScript


## 🛠️ Tecnologias utilizadas

• React + TypeScript  
• Vite  
• Tailwind + CVA  
• shadcn/ui + Radix  
• React Router  
• React Query  
• Zustand  
• React Hook Form + Zod  
• Axios  
• Vitest  

- **Axios**  
  Responsável por simular as requisições HTTP. 

- **Axios Mock Adapter**  
  Utilizado para simular um backend durante o desenvolvimento, interceptando requisições e retornando respostas mockadas (sucesso ou erro).

- **React Query**  
  Gerencia o estado das requisições assíncronas, controlando automaticamente estados como loading, sucesso e erro.

 - **React Hook Form + Zod**  
  Utilizados para gerenciamento e validação de formulários com schemas de validação com tipagem.

- **Tailwind CSS + CVA + shadcn/ui + Radix UI**  
  Utilizados para construção da interface da aplicação.

  - **Zustand**  
  Utilizado para gerenciamento de estado global


## 🔐 Autenticação

O login é simulado utilizando mock de API com Axios. 
Credenciais válidas:
email: breno@test.com
senha: 123456

## 🧪 Testes

O projeto possui testes automatizados cobrindo o fluxo de login:

- ✔️ Componentes (integração)
- ✔️ Serviços (unitários)
- ✔️ Fluxos de sucesso e erro

### ▶️ Rodar os testes (modo desenvolvimento)

```bash
npm run test
```

## ▶️ Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/brenolg/Banking-app.git

# Acesse a pasta
cd Banking-ap

# Instale as dependências
npm install

# Inicie o projeto
npm run dev
```


