package io.github.nadodev.calcular.emprestimo.infrastructure.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import io.github.nadodev.calcular.emprestimo.domain.ports.input.CalcularParcelasUseCase;
import io.github.nadodev.calcular.emprestimo.domain.model.Emprestimo;
import io.github.nadodev.calcular.emprestimo.domain.model.Parcela;
import java.util.List;

@RestController
@RequestMapping("/api/emprestimos")
public class EmprestimoController {
    private final CalcularParcelasUseCase calcularParcelasService;

    @Autowired
    public EmprestimoController(CalcularParcelasUseCase calcularParcelasService) {
        this.calcularParcelasService = calcularParcelasService;
    }

    @PostMapping("/calcular-parcelas")
    public List<Parcela> calcularParcelas(@RequestBody Emprestimo emprestimo) {
        return calcularParcelasService.calcularParcelas(emprestimo);
    }
} 