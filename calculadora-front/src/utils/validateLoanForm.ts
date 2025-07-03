export interface LoanFormData {
  dataInicial: string;
  dataFinal: string;
  primeiroPagamento: string;
  valor: string;
  taxaJuros: string;
}

export type LoanFormErrors = Partial<Record<keyof LoanFormData, string>>;

export function validateLoanForm(form: LoanFormData): LoanFormErrors {
  const newErrors: LoanFormErrors = {};
  if (!form.dataInicial) newErrors.dataInicial = 'Obrigatório';
  if (!form.dataFinal) newErrors.dataFinal = 'Obrigatório';
  if (!form.primeiroPagamento) newErrors.primeiroPagamento = 'Obrigatório';
  if (!form.valor) newErrors.valor = 'Obrigatório';
  else if (isNaN(Number(form.valor)) || Number(form.valor) <= 0) newErrors.valor = 'Valor deve ser maior que zero';
  if (!form.taxaJuros) newErrors.taxaJuros = 'Obrigatório';
  else if (isNaN(Number(form.taxaJuros)) || Number(form.taxaJuros) <= 0) newErrors.taxaJuros = 'Taxa deve ser maior que zero';
  if (form.dataInicial && form.dataFinal && form.dataFinal < form.dataInicial) newErrors.dataFinal = 'Data final deve ser após a inicial';
  if (form.dataInicial && form.primeiroPagamento && form.primeiroPagamento < form.dataInicial) newErrors.primeiroPagamento = 'Primeiro pagamento deve ser após a data inicial';
  return newErrors;
} 