package io.github.nadodev.calcular.emprestimo.application.service;

import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Component
public class CalculadoraAmortizacaoService {

    public int calcularQuantidadeParcelas(LocalDate primeiroPagamento, LocalDate dataFinal) {
        int meses = (int) ChronoUnit.MONTHS.between(
                primeiroPagamento.withDayOfMonth(1),
                dataFinal.withDayOfMonth(1)
        ) + 1;
        return meses;
    }

    public BigDecimal calcularAmortizacaoFixa(BigDecimal valorEmprestimo, int quantidadeParcelas) {
        return valorEmprestimo.divide(BigDecimal.valueOf(quantidadeParcelas), 2, RoundingMode.HALF_UP);
    }
} 