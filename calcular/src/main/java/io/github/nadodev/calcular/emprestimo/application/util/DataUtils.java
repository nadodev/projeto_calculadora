package io.github.nadodev.calcular.emprestimo.application.util;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

public class DataUtils {
    public static LocalDate proximaDataParcela(LocalDate dataAtual) {
        int dia = dataAtual.getDayOfMonth();
        LocalDate proxima = dataAtual.plusMonths(1);
        int ultimoDia = proxima.lengthOfMonth();
        if (dia == dataAtual.lengthOfMonth()) {
            return proxima.withDayOfMonth(ultimoDia);
        } else if (dia > ultimoDia) {
            return proxima.withDayOfMonth(ultimoDia);
        } else {
            return proxima.withDayOfMonth(dia);
        }
    }

    public static Set<LocalDate> datasFinsDeMes(LocalDate inicio, LocalDate fim) {
        Set<LocalDate> datas = new HashSet<>();
        LocalDate atual = inicio.withDayOfMonth(inicio.lengthOfMonth());
        while (!atual.isAfter(fim)) {
            datas.add(atual);
            atual = atual.plusMonths(1).withDayOfMonth(atual.plusMonths(1).lengthOfMonth());
        }
        return datas;
    }

    public static Set<LocalDate> datasPagamentos(LocalDate primeiro, LocalDate fim) {
        Set<LocalDate> datas = new HashSet<>();
        LocalDate atual = primeiro;
        while (!atual.isAfter(fim)) {
            datas.add(atual);
            atual = proximaDataParcela(atual);
        }
        return datas;
    }
} 