package io.github.nadodev.calcular.emprestimo.application.validator;

import io.github.nadodev.calcular.emprestimo.domain.exception.ValidacaoException;
import io.github.nadodev.calcular.emprestimo.domain.model.Emprestimo;
import org.springframework.stereotype.Component;

@Component
public class EmprestimoValidatorPadrao implements EmprestimoValidator {
    @Override
    public void validar(Emprestimo e) {
        if (e.getDataFinal().isBefore(e.getDataInicial())) {
            throw new ValidacaoException("Data final deve ser maior que a data inicial.");
        }
        if (e.getPrimeiroPagamento().isBefore(e.getDataInicial())) {
            throw new ValidacaoException("Primeiro pagamento deve ser depois da data inicial.");
        }
        if (e.getPrimeiroPagamento().isAfter(e.getDataFinal())) {
            throw new ValidacaoException("Primeiro pagamento deve ser antes da data final.");
        }
    }
} 