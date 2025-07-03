# 📚 API - Calculadora de Empréstimos

## Base URL
```
http://localhost:8080
```

---

## Rotas Disponíveis

### 1. Calcular Parcelas
- **Rota:** `/api/emprestimos/calcular-parcelas`
- **Método:** `POST`
- **Descrição:** Calcula o cronograma de parcelas de um empréstimo, retornando uma grid com todas as datas relevantes (pagamentos, fins de mês, data inicial/final), valores de parcela, amortização, juros e saldo devedor.

---

## Formato do JSON de Requisição

```json
{
  "dataInicial": "2024-01-01",         // Data de início do cálculo (obrigatório)
  "dataFinal": "2034-01-01",           // Data final do cálculo (obrigatório)
  "primeiroPagamento": "2024-02-15",   // Data do primeiro pagamento (obrigatório)
  "valor": 140000,                     // Valor do empréstimo (obrigatório)
  "taxaJuros": 7                       // Taxa de juros anual em % (obrigatório)
}
```
- Todas as datas devem estar no formato `YYYY-MM-DD`.
- Todos os campos são obrigatórios.

---

## Formato do JSON de Resposta

A resposta é um array de objetos, cada um representando uma linha da grid (pagamento ou acompanhamento):

```json
[
  {
    "numero": 1,                  // Número da parcela (0 se não for data de pagamento)
    "totalParcelas": 120,         // Total de parcelas do empréstimo
    "dataCompetencia": "2024-02-15", // Data da linha (pagamento ou acompanhamento)
    "valorParcela": 1625.52,      // Valor da parcela (0 se não for data de pagamento)
    "amortizacao": 1225.52,       // Valor da amortização (0 se não for data de pagamento)
    "saldoDevedor": 138774.48,    // Saldo devedor após o evento
    "juros": 400.00,              // Juros do período
    "pagamento": true             // true se é data de pagamento, false se é acompanhamento
  },
  {
    "numero": 0,
    "totalParcelas": 120,
    "dataCompetencia": "2024-02-29",
    "valorParcela": 0,
    "amortizacao": 0,
    "saldoDevedor": 138774.48,
    "juros": 390.00,
    "pagamento": false
  }
  // ... outras linhas
]
```

---

## Resumo dos Campos da Resposta

- **numero:** Número da parcela (0 se não for data de pagamento)
- **totalParcelas:** Total de parcelas do empréstimo
- **dataCompetencia:** Data da linha (pagamento ou acompanhamento)
- **valorParcela:** Valor da parcela (0 se não for data de pagamento)
- **amortizacao:** Valor da amortização (0 se não for data de pagamento)
- **saldoDevedor:** Saldo devedor após o evento
- **juros:** Juros do período
- **pagamento:** `true` se é data de pagamento, `false` se é acompanhamento (ex: fim de mês)

---

## Exemplo de Consumo no Front-end

- Para exibir **todas as linhas** (igual à planilha): use o array completo.
- Para exibir **apenas as parcelas**: filtre por `pagamento === true` ou `numero > 0`.

---

