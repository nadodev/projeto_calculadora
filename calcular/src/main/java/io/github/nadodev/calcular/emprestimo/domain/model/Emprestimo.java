package io.github.nadodev.calcular.emprestimo.domain.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Emprestimo {
    private final LocalDate dataInicial;
    private final LocalDate dataFinal;
    private final LocalDate primeiroPagamento;
    private final BigDecimal valor;
    private final BigDecimal taxaJuros;

    public Emprestimo(LocalDate dataInicial, LocalDate dataFinal, LocalDate primeiroPagamento, BigDecimal valor, BigDecimal taxaJuros) {
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
        this.primeiroPagamento = primeiroPagamento;
        this.valor = valor;
        this.taxaJuros = taxaJuros;
    }

    public LocalDate getDataInicial() { return dataInicial; }
    public LocalDate getDataFinal() { return dataFinal; }
    public LocalDate getPrimeiroPagamento() { return primeiroPagamento; }
    public BigDecimal getValor() { return valor; }
    public BigDecimal getTaxaJuros() { return taxaJuros; }
} 