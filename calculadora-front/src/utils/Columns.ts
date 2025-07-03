import { format, parseISO } from 'date-fns';

export const columns = [
    { label: 'Nº Parcela', accessor: 'numero', render: (v: number) => v > 0 ? v : '-' },
    { label: 'Total Parcelas', accessor: 'totalParcelas' },
    { label: 'Data', accessor: 'dataCompetencia', render: (v: string) => {
        if (!v) return '-';
        try {
          return format(parseISO(v), 'dd/MM/yyyy');
        } catch {
          return v;
        }
      }
    },
    { label: 'Valor Empréstimo', accessor: 'valorEmprestimo', render: (v: number) => v ? v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-' },
    { label: 'Saldo Devedor', accessor: 'saldoDevedor', render: (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
    { label: 'Consolidação', accessor: 'consolidada' },
    { label: 'Total', accessor: 'total', render: (v: number) => v ? v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-' },
    { label: 'Amortização', accessor: 'amortizacao', render: (v: number) => v ? v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-' },
    { label: 'Saldo Inicial', accessor: 'saldo', render: (v: number) => v ? v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-' },
    { label: 'Provisão', accessor: 'provisao', render: (v: number) => v ? v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-' },
    { label: 'Acumulado', accessor: 'acumulado', render: (v: number) => v ? v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-' },
    { label: 'Pago', accessor: 'pago', render: (v: number) => v ? v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-' },
    { label: 'Pagamento?', accessor: 'pagamento', render: (v: boolean) => v ? 'Sim' : 'Não' },
];