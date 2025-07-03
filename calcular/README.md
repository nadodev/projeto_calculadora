# Calculadora de Empréstimos

## 📋 Descrição

Sistema de cálculo de parcelas de empréstimos com amortização constante e juros compostos proporcionais, seguindo exatamente a lógica da planilha Excel "Calculadora_Emprestimos.xlsx". O sistema calcula automaticamente a grade de datas (competências e pagamentos), juros provisionados e valores das parcelas.

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 21** - Linguagem principal
- **Spring Boot 3.53** - Framework para desenvolvimento
- **Maven** - Gerenciador de dependências

### Arquitetura e Padrões
- **Clean Architecture** - Separação de responsabilidades
- **SOLID Principles** - Princípios de design de software
- **Hexagonal Architecture** - Ports and Adapters
- **Dependency Injection** - Inversão de controle

## 🏗️ Arquitetura do Projeto

### Estrutura de Pacotes
```
src/main/java/io/github/nadodev/calcular/emprestimo/
├── application/
│   ├── service/           # Casos de uso e serviços de aplicação
│   ├── validator/         # Validações de negócio
│   └── util/             # Utilitários
├── domain/
│   ├── model/            # Entidades de domínio
│   ├── ports/
│   │   └── input/        # Interfaces de entrada (Use Cases)
│   └── exception/        # Exceções de domínio
└── infrastructure/
    ├── controller/       # Controllers REST
    └── config/          # Configurações
```

### Camadas da Aplicação

#### 1. **Domain Layer** (Núcleo)
- **Model**: Entidades `Emprestimo` e `Parcela`
- **Ports**: Interfaces para casos de uso
- **Exception**: Exceções específicas do domínio

#### 2. **Application Layer** (Casos de Uso)
- **Service**: Implementação dos casos de uso
- **Validator**: Validações de regras de negócio
- **Util**: Utilitários para cálculos e manipulação de datas

#### 3. **Infrastructure Layer** (Adaptadores)
- **Controller**: Endpoints REST
- **Config**: Configurações da aplicação

## 🧮 Lógica de Negócio

### Cálculo de Juros Compostos
O sistema utiliza juros compostos proporcionais ao número de dias, seguindo a fórmula:

```
juros = saldo × ((1 + taxaAnual)^(dias/360) - 1)
```

### Amortização Constante
- Valor fixo por parcela: `valorEmprestimo / quantidadeParcelas`
- Saldo devedor reduzido apenas nas linhas de pagamento

### Grade de Datas
1. **Data Inicial**: Primeira linha da grid
2. **Competências**: Fins de mês entre data inicial e final
3. **Pagamentos**: Datas de pagamento (mensais a partir do primeiro pagamento)

### Estrutura da Grid
Cada linha contém:
- **Data Competência**: Data do evento
- **Valor Empréstimo**: Valor original (constante)
- **Saldo Devedor**: Saldo após o evento
- **Consolidada**: Número da parcela (apenas em pagamentos)
- **Total**: Valor total da parcela (amortização + juros)
- **Amortização**: Valor fixo de amortização
- **Saldo**: Saldo antes do evento
- **Provisão**: Juros do período
- **Acumulado**: Juros acumulados
- **Pago**: Juros pagos na parcela

## 📊 Serviços Especializados

### 1. **CalcularParcelasService** (Orquestrador)
- Coordena o processo de cálculo
- Validações de entrada
- Orquestração entre serviços

### 2. **CalculadoraJurosService**
- Cálculo de juros compostos
- Fórmula específica da planilha
- Base de 360 dias

### 3. **GeradorGradeDatasService**
- Geração da grade de datas
- Mapeamento de pagamentos
- Lógica de competências

### 4. **CalculadoraAmortizacaoService**
- Cálculo de quantidade de parcelas
- Cálculo de amortização fixa

## 🚀 Como Executar

### Pré-requisitos
- Java 21+
- Maven

### Execução
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd calculadora-back
```

### Endpoint
```
POST http://localhost:9090/api/emprestimos/calcular-parcelas
```

### Exemplo de Requisição
```json
{
  "dataInicial": "2024-01-01",
  "dataFinal": "2034-01-01",
  "primeiroPagamento": "2024-02-15",
  "valor": 140000.00,
  "taxaJuros": 7.0
}
```

## 📋 Validações

### Regras de Negócio
1. **Datas**: Data final > Data inicial
2. **Primeiro Pagamento**: Entre data inicial e final
3. **Valores**: Valor e taxa de juros > 0
4. **Base de Dias**: Fixa em 360 dias

### Validações Técnicas
- Formato de datas (yyyy-MM-dd)
- Valores numéricos válidos
- Campos obrigatórios

## 📈 Exemplo de Saída

```json
[
  {
    "numero": 0,
    "totalParcelas": 120,
    "dataCompetencia": "2024-01-01",
    "valorEmprestimo": 140000.00,
    "saldoDevedor": 140000.00,
    "consolidada": "",
    "total": 0.00,
    "amortizacao": 0.00,
    "saldo": 140000.00,
    "provisao": 0.00,
    "acumulado": 0.00,
    "pago": 0.00,
    "pagamento": false
  },
  {
    "numero": 1,
    "totalParcelas": 120,
    "dataCompetencia": "2024-02-15",
    "valorEmprestimo": 0.00,
    "saldoDevedor": 138833.33,
    "consolidada": "1/120",
    "total": 2355.71,
    "amortizacao": 1166.67,
    "saldo": 140000.00,
    "provisao": 397.47,
    "acumulado": 0.00,
    "pago": 1189.05,
    "pagamento": true
  }
]
```

## 🔧 Configurações

### application.properties
```properties
# Configurações do servidor
server.port=9090
```

## 🚧 Próximos Passos

### 1. **Testes Unitários** ⏳
- [ ] **CalculadoraJurosService**
  - Testes para cálculo de juros compostos
  - Validação de diferentes períodos
  - Testes de edge cases (taxa zero, saldo zero)

- [ ] **GeradorGradeDatasService**
  - Testes para geração de grade de datas
  - Validação de datas de pagamento
  - Testes de competências (fins de mês)

- [ ] **CalculadoraAmortizacaoService**
  - Testes para cálculo de quantidade de parcelas
  - Validação de amortização fixa
  - Testes de arredondamento

- [ ] **CalcularParcelasService**
  - Testes de orquestração
  - Validação de fluxo completo
  - Testes de cenários de erro

### 2. **Testes de Integração** ⏳
- [ ] **EmprestimoController**
  - Testes de endpoints REST
  - Validação de respostas HTTP
  - Testes de payloads inválidos

- [ ] **Fluxo Completo**
  - Testes end-to-end
  - Validação de regras de negócio
  - Testes de performance

- [ ] **Validações**
  - Testes de validação de entrada
  - Testes de exceções
  - Testes de mensagens de erro

### 3. **Comunicação Via Fila** ⏳
- [ ] **Implementação de Message Broker**
  - Integração com RabbitMQ
  - Configuração de exchanges e queues
  - Implementação de producers e consumers


- [ ] **Logs Estruturados**
  - Logback com JSON format
  - Correlation IDs
  - Logs de performance

- [ ] **Documentação da API**
  - OpenAPI/Swagger
  - Exemplos de uso
  - Documentação de erros

### 5. **Segurança e Performance** ⏳

- [ ] **Validação Avançada**
  - Bean Validation
  - Custom validators
  - Sanitização de entrada

- [ ] **Performance**
  - Otimização de algoritmos

## 👥 Autores

- **Leonardo Geja** - Desenvolvimento

## 📚 Documentação Adicional

- [Arquitetura Detalhada](docs/ARCHITECTURE.md)
