export interface LoanResultRow {
  dataCompetencia: string;
  valorEmprestimo: number;
  saldoDevedor: number;
  consolidada: string | number;
  total: number;
  amortizacao: number;
  saldo: number;
  provisao: number;
  acumulado: number;
  pago: number;
}

export interface TableColumn {
  label: string;
  accessor: string;
  render?: (value: any) => string | number;
}

export interface LoanResultProps {
  result: LoanResultRow[];
  columns: any[];
} 