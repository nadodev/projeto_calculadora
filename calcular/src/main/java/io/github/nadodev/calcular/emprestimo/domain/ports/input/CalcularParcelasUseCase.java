package io.github.nadodev.calcular.emprestimo.domain.ports.input;

import io.github.nadodev.calcular.emprestimo.domain.model.Emprestimo;
import io.github.nadodev.calcular.emprestimo.domain.model.Parcela;
import java.util.List;

public interface CalcularParcelasUseCase {
    List<Parcela> calcularParcelas(Emprestimo emprestimo);
} 