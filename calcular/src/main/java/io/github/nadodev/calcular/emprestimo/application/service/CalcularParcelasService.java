package io.github.nadodev.calcular.emprestimo.application.service;

import io.github.nadodev.calcular.emprestimo.application.util.DataUtils;
import io.github.nadodev.calcular.emprestimo.domain.model.Emprestimo;
import io.github.nadodev.calcular.emprestimo.domain.model.Parcela;
import io.github.nadodev.calcular.emprestimo.domain.ports.input.CalcularParcelasUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

import io.github.nadodev.calcular.emprestimo.application.validator.EmprestimoValidator;

@Service
public class CalcularParcelasService implements CalcularParcelasUseCase {
    private final EmprestimoValidator validator;
    private final CalculadoraJurosService calculadoraJuros;
    private final GeradorGradeDatasService geradorGradeDatas;
    private final CalculadoraAmortizacaoService calculadoraAmortizacao;

    @Autowired
    public CalcularParcelasService(EmprestimoValidator validator,
                                 CalculadoraJurosService calculadoraJuros,
                                 GeradorGradeDatasService geradorGradeDatas,
                                 CalculadoraAmortizacaoService calculadoraAmortizacao) {
        this.validator = validator;
        this.calculadoraJuros = calculadoraJuros;
        this.geradorGradeDatas = geradorGradeDatas;
        this.calculadoraAmortizacao = calculadoraAmortizacao;
    }

    @Override
    public List<Parcela> calcularParcelas(Emprestimo emprestimo) {
        validator.validar(emprestimo);
        validarDatas(emprestimo);

        BigDecimal valorEmprestimo = emprestimo.getValor();
        BigDecimal taxaJurosAnual = emprestimo.getTaxaJuros();
        int quantidadeParcelas = calculadoraAmortizacao.calcularQuantidadeParcelas(
            emprestimo.getPrimeiroPagamento(), emprestimo.getDataFinal());
        BigDecimal amortizacaoFixa = calculadoraAmortizacao.calcularAmortizacaoFixa(valorEmprestimo, quantidadeParcelas);

        Set<LocalDate> datasGrade = geradorGradeDatas.gerarGradeDatas(emprestimo);
        Map<LocalDate, Integer> mapaPagamentos = geradorGradeDatas.mapearPagamentos(emprestimo);

        return processarParcelas(emprestimo, valorEmprestimo, taxaJurosAnual, amortizacaoFixa, 
                                quantidadeParcelas, datasGrade, mapaPagamentos);
    }

    private void validarDatas(Emprestimo emprestimo) {
        if (!emprestimo.getDataFinal().isAfter(emprestimo.getDataInicial())) {
            throw new IllegalArgumentException("A data final deve ser maior que a data inicial.");
        }
        if (!emprestimo.getPrimeiroPagamento().isAfter(emprestimo.getDataInicial()) || 
            !emprestimo.getPrimeiroPagamento().isBefore(emprestimo.getDataFinal())) {
            throw new IllegalArgumentException("A data do primeiro pagamento deve ser maior que a data inicial e menor que a data final.");
        }
    }

    private List<Parcela> processarParcelas(Emprestimo emprestimo, BigDecimal valorEmprestimo, 
                                           BigDecimal taxaJurosAnual, BigDecimal amortizacaoFixa,
                                           int quantidadeParcelas, Set<LocalDate> datasGrade, 
                                           Map<LocalDate, Integer> mapaPagamentos) {
        List<Parcela> parcelas = new ArrayList<>();
        BigDecimal saldoAmortizavel = valorEmprestimo;
        LocalDate dataAnterior = emprestimo.getDataInicial();
        BigDecimal acumulado = BigDecimal.ZERO;

        parcelas.add(criarParcelaInicial(emprestimo.getDataInicial(), valorEmprestimo, saldoAmortizavel, quantidadeParcelas));

        Set<LocalDate> datasGradeSemInicial = new TreeSet<>(datasGrade);
        datasGradeSemInicial.remove(emprestimo.getDataInicial());

        for (LocalDate data : datasGradeSemInicial) {
            boolean isPagamento = mapaPagamentos.containsKey(data);
            int numero = isPagamento ? mapaPagamentos.get(data) : 0;
            
            BigDecimal jurosPeriodo = calculadoraJuros.calcularJurosPeriodo(
                saldoAmortizavel, taxaJurosAnual, dataAnterior, data);

            if (!isPagamento) {
                parcelas.add(criarParcelaCompetencia(data, quantidadeParcelas, saldoAmortizavel, 
                                                   jurosPeriodo, acumulado));
                acumulado = acumulado.add(jurosPeriodo);
            } else {
                Parcela parcela = criarParcelaPagamento(data, numero, quantidadeParcelas, 
                                                       saldoAmortizavel, amortizacaoFixa, 
                                                       jurosPeriodo, acumulado);
                parcelas.add(parcela);
                saldoAmortizavel = saldoAmortizavel.subtract(amortizacaoFixa);
                acumulado = BigDecimal.ZERO;
            }
            dataAnterior = data;
        }
        return parcelas;
    }

    private Parcela criarParcelaInicial(LocalDate dataInicial, BigDecimal valorEmprestimo, 
                                       BigDecimal saldoAmortizavel, int quantidadeParcelas) {
        return new Parcela(0, quantidadeParcelas, dataInicial, valorEmprestimo, saldoAmortizavel,
                          "", BigDecimal.ZERO, BigDecimal.ZERO, saldoAmortizavel,
                          BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, false);
    }

    private Parcela criarParcelaCompetencia(LocalDate data, int quantidadeParcelas, 
                                           BigDecimal saldoAmortizavel, BigDecimal jurosPeriodo, 
                                           BigDecimal acumulado) {
        return new Parcela(0, quantidadeParcelas, data, BigDecimal.ZERO, saldoAmortizavel,
                          "", BigDecimal.ZERO, BigDecimal.ZERO, saldoAmortizavel,
                          jurosPeriodo, acumulado.add(jurosPeriodo), BigDecimal.ZERO, false);
    }

    private Parcela criarParcelaPagamento(LocalDate data, int numero, int quantidadeParcelas,
                                         BigDecimal saldoAmortizavel, BigDecimal amortizacaoFixa,
                                         BigDecimal jurosPeriodo, BigDecimal acumulado) {
        BigDecimal provisaoPagamento = jurosPeriodo;
        BigDecimal pago = acumulado.add(provisaoPagamento);
        BigDecimal total = amortizacaoFixa.add(pago);
        BigDecimal novoSaldoAmortizavel = saldoAmortizavel.subtract(amortizacaoFixa);

        return new Parcela(numero, quantidadeParcelas, data, BigDecimal.ZERO, novoSaldoAmortizavel,
                          numero + "/" + quantidadeParcelas, total, amortizacaoFixa, saldoAmortizavel,
                          provisaoPagamento, BigDecimal.ZERO, pago, true);
    }
}