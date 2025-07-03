# Arquitetura da Aplicação

## 🏗️ Visão Geral

A aplicação segue os princípios da **Clean Architecture** e **Hexagonal Architecture**, organizando o código em camadas bem definidas com responsabilidades específicas. O sistema é construído para ser testável, manutenível e escalável.

## 📐 Estrutura de Camadas

### 1. **Domain Layer** (Núcleo da Aplicação)

#### Responsabilidades
- Entidades de negócio
- Regras de domínio
- Interfaces de casos de uso
- Exceções específicas do domínio

#### Componentes
```java
// Entidades
- Emprestimo.java
- Parcela.java

// Interfaces (Ports)
- CalcularParcelasUseCase.java

// Exceções
- ValidacaoException.java
```

#### Características
- **Independência**: Não depende de frameworks externos
- **Pureza**: Contém apenas lógica de negócio
- **Testabilidade**: Fácil de testar isoladamente

### 2. **Application Layer** (Casos de Uso)

#### Responsabilidades
- Implementação dos casos de uso
- Orquestração de serviços
- Validações de negócio
- Transformação de dados

#### Componentes
```java
// Serviços de Aplicação
- CalcularParcelasService.java (Orquestrador)
- CalculadoraJurosService.java
- CalculadoraAmortizacaoService.java
- GeradorGradeDatasService.java

// Validadores
- EmprestimoValidator.java
- EmprestimoValidatorPadrao.java

// Utilitários
- DataUtils.java
```

#### Características
- **Orquestração**: Coordena múltiplos serviços
- **Validação**: Aplica regras de negócio
- **Especialização**: Cada serviço tem responsabilidade única

### 3. **Infrastructure Layer** (Adaptadores)

#### Responsabilidades
- Controllers REST
- Configurações
- Integrações externas
- Persistência (futuro)

#### Componentes
```java
// Controllers
- EmprestimoController.java

// Configurações
- CorsConfig.java
```

#### Características
- **Adaptação**: Conecta com sistemas externos
- **Configuração**: Gerencia dependências externas
- **Isolamento**: Protege o domínio de mudanças externas

## 🔄 Fluxo de Dados

### 1. **Entrada**
```
HTTP Request → Controller → Use Case → Domain
```

### 2. **Processamento**
```
Domain → Application Services → Domain
```

### 3. **Saída**
```
Domain → Use Case → Controller → HTTP Response
```

## 🧮 Lógica de Negócio

### Cálculo de Juros Compostos
```java
// Fórmula utilizada
juros = saldo × ((1 + taxaAnual)^(dias/360) - 1)

// Implementação
public BigDecimal calcularJuros(BigDecimal saldo, BigDecimal taxaAnual, int dias) {
    double taxaDecimal = taxaAnual.doubleValue() / 100.0;
    double fator = Math.pow(1 + taxaDecimal, (double) dias / 360.0);
    return saldo.multiply(BigDecimal.valueOf(fator - 1));
}
```

### Amortização Constante
```java
// Valor fixo por parcela
amortizacao = valorEmprestimo / quantidadeParcelas

// Quantidade de parcelas
quantidadeParcelas = Period.between(dataInicial, dataFinal).getMonths()
```

### Grade de Datas
1. **Data Inicial**: Primeira linha da grid
2. **Competências**: Fins de mês entre data inicial e final
3. **Pagamentos**: Datas mensais a partir do primeiro pagamento

## 🔧 Padrões de Design

### 1. **Dependency Injection**
```java
@Service
public class CalcularParcelasService {
    private final CalculadoraJurosService calculadoraJuros;
    private final GeradorGradeDatasService geradorGrade;
    private final CalculadoraAmortizacaoService calculadoraAmortizacao;
    
    public CalcularParcelasService(
        CalculadoraJurosService calculadoraJuros,
        GeradorGradeDatasService geradorGrade,
        CalculadoraAmortizacaoService calculadoraAmortizacao
    ) {
        this.calculadoraJuros = calculadoraJuros;
        this.geradorGrade = geradorGrade;
        this.calculadoraAmortizacao = calculadoraAmortizacao;
    }
}
```

## 🚧 Próximos Passos da Arquitetura

### 1. **Testes** ⏳

#### Testes Unitários
```java
// Estrutura de testes
src/test/java/
├── domain/
│   ├── model/
│   │   ├── EmprestimoTest.java
│   │   └── ParcelaTest.java
│   └── exception/
│       └── ValidacaoExceptionTest.java
├── application/
│   ├── service/
│   │   ├── CalcularParcelasServiceTest.java
│   │   ├── CalculadoraJurosServiceTest.java
│   │   ├── CalculadoraAmortizacaoServiceTest.java
│   │   └── GeradorGradeDatasServiceTest.java
│   └── validator/
│       └── EmprestimoValidatorTest.java
└── infrastructure/
    └── controller/
        └── EmprestimoControllerTest.java
```


## 🔒 Segurança

### 1. **Validação de Entrada**
- Sanitização de dados
- Validação de regras de negócio
- Prevenção de ataques de injeção

### 2. **Configurações**
- CORS configurado adequadamente
- Headers de segurança
- Logs sem informações sensíveis

## 🔄 Evolução da Arquitetura

### Implementado ✅
- [x] Clean Architecture
- [x] Hexagonal Architecture
- [x] Dependency Injection
- [x] Service Layer Pattern
- [x] Princípios SOLID seguidos
- [x] Injeção de dependência
- [x] Validações adequadas
- [x] Tratamento de exceções
- [x] Documentação técnica
- [x] Configurações externalizadas
- [x] CORS configurado

### Próximas Implementações ⏳
- [ ] Testes unitários e de integração
- [ ] Comunicação via fila (RabbitMQ)
- [ ] Logs estruturados
- [ ] Documentação da API (OpenAPI)
- [ ] Estratégias de cálculo (Strategy Pattern)
- [ ] Factory para criação de estratégias 