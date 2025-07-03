# Calculadora de Empréstimos

Esta aplicação é uma calculadora de empréstimos moderna, responsiva e acessível, desenvolvida em React + TypeScript, com foco em experiência do usuário, arquitetura limpa e boas práticas de UI/UX.

## Funcionalidades
- Simulação de empréstimos com datas e valores customizáveis
- Tabela de resultados agrupada e formatada (Empréstimo, Parcela, Principal, Juros)
- Validação de formulário com feedback de erros
- Layout responsivo e visual profissional
- Acessibilidade e semântica aprimoradas

## Tecnologias Utilizadas
- **React** (com TypeScript)
- **Vite** (build e dev server)
- **Tailwind CSS** (estilização utilitária)
- **shadcn/ui** (componentes de UI acessíveis e modernos)
- **date-fns** (formatação de datas)
- **zod** (validação de formulário)

## Estrutura de Componentes
- `LoanCalculator`: container principal, orquestra o fluxo
- `LoanForm`: formulário de simulação (inputs em linha, botão à direita)
- `LoanResult`: exibe a tabela de resultados agrupada
- `Footer`, `Header`, `FormField`, `Title`: componentes comuns e reutilizáveis

## Como rodar o projeto
1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Rode o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
3. **Acesse em:**
   [http://localhost:5173](http://localhost:5173)

## Como funciona
- O usuário preenche as datas, valor do empréstimo e taxa de juros.
- Ao clicar em "Calcular", a aplicação valida os dados e faz uma requisição para a API (endpoint `/emprestimos/calcular-parcelas`).
- O resultado é exibido em uma tabela agrupada, com valores formatados em reais e datas no padrão brasileiro.
- O layout é responsivo e acessível, funcionando bem em desktop e mobile.

## Boas práticas aplicadas
- Componentização e separação de responsabilidades
- Validação robusta com feedback amigável
- Layout semântico e acessível (aria, headings, roles)
- Código limpo, organizado e fácil de manter

---

Se tiver dúvidas ou quiser contribuir, fique à vontade para abrir uma issue ou PR!
