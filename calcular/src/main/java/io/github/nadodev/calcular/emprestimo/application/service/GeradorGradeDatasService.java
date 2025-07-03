package io.github.nadodev.calcular.emprestimo.application.service;

import org.springframework.stereotype.Component;
import io.github.nadodev.calcular.emprestimo.application.util.DataUtils;
import io.github.nadodev.calcular.emprestimo.domain.model.Emprestimo;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Component
public class GeradorGradeDatasService {

    public Set<LocalDate> gerarGradeDatas(Emprestimo emprestimo) {
        Set<LocalDate> datasGrade = new TreeSet<>();
        datasGrade.add(emprestimo.getDataInicial());
        datasGrade.add(emprestimo.getDataFinal());
        datasGrade.addAll(DataUtils.datasFinsDeMes(emprestimo.getDataInicial(), emprestimo.getDataFinal()));
        datasGrade.addAll(DataUtils.datasPagamentos(emprestimo.getPrimeiroPagamento(), emprestimo.getDataFinal()));
        return datasGrade;
    }

    public Map<LocalDate, Integer> mapearPagamentos(Emprestimo emprestimo) {
        List<LocalDate> datasPagamento = gerarDatasPagamento(emprestimo);
        Map<LocalDate, Integer> mapaPagamentos = new HashMap<>();
        
        for (int i = 0; i < datasPagamento.size(); i++) {
            mapaPagamentos.put(datasPagamento.get(i), i + 1);
        }
        return mapaPagamentos;
    }

    private List<LocalDate> gerarDatasPagamento(Emprestimo emprestimo) {
        List<LocalDate> datasPagamento = new ArrayList<>();
        LocalDate dataPag = emprestimo.getPrimeiroPagamento();
        
        while (!dataPag.isAfter(emprestimo.getDataFinal())) {
            datasPagamento.add(dataPag);
            if (dataPag.getDayOfMonth() == dataPag.lengthOfMonth()) {
                dataPag = dataPag.plusMonths(1).withDayOfMonth(dataPag.plusMonths(1).lengthOfMonth());
            } else {
                dataPag = dataPag.plusMonths(1);
            }
        }
        
        if (!datasPagamento.contains(emprestimo.getDataFinal())) {
            datasPagamento.add(emprestimo.getDataFinal());
        }
        
        return datasPagamento;
    }
} 