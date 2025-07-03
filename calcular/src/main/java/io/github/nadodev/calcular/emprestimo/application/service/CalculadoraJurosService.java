package io.github.nadodev.calcular.emprestimo.application.service;

import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Component
public class CalculadoraJurosService {
    private static final int BASE_DIAS = 360;

    public BigDecimal calcularJurosPeriodo(BigDecimal saldo, BigDecimal taxaJurosAnual, 
                                         LocalDate dataAnterior, LocalDate data) {
        long diasPeriodo = ChronoUnit.DAYS.between(dataAnterior, data);
        BigDecimal taxaJurosDecimal = taxaJurosAnual.divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP);
        
        return saldo.multiply(
            pow1p(taxaJurosDecimal, diasPeriodo, BASE_DIAS).subtract(BigDecimal.ONE)
        ).setScale(2, RoundingMode.HALF_UP);
    }

    private BigDecimal pow1p(BigDecimal taxaAnual, long dias, int baseDias) {
        double base = taxaAnual.add(BigDecimal.ONE).doubleValue();
        double expoente = ((double) dias) / baseDias;
        return BigDecimal.valueOf(Math.pow(base, expoente));
    }
} 