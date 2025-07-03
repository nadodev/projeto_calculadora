import { z } from 'zod';

export const loanFormSchema = z.object({
  dataInicial: z.string().min(1, 'Obrigatório'),
  dataFinal: z.string().min(1, 'Obrigatório'),
  primeiroPagamento: z.string().min(1, 'Obrigatório'),
  valor: z.string().min(1, 'Obrigatório').refine(v => {
    if (!v || v === 'R$ 0,00' || v === 'R$ ' || v.trim() === '') return false;
    
    const cleanValue = v.replace('R$ ', '').replace(/\./g, '').replace(',', '.');
    const num = Number(cleanValue);
    
    return !isNaN(num) && num > 0;
  }, 'Valor deve ser maior que zero'),
  taxaJuros: z.string().min(1, 'Obrigatório').refine(v => {
    const cleanValue = v.replace('%', '').replace(',', '.');
    const num = Number(cleanValue);
    return !isNaN(num) && num > 0;
  }, 'Taxa deve ser maior que zero'),
}).refine(
  (data) => !data.dataInicial || !data.dataFinal || data.dataFinal >= data.dataInicial,
  { message: 'Data final deve ser após a inicial', path: ['dataFinal'] }
).refine(
  (data) => !data.dataInicial || !data.primeiroPagamento || data.primeiroPagamento >= data.dataInicial,
  { message: 'Primeiro pagamento deve ser após a data inicial', path: ['primeiroPagamento'] }
);

export type LoanFormSchema = z.infer<typeof loanFormSchema>; 

export type LoanFormErrors = Partial<Record<keyof LoanFormSchema, string[] | undefined>>;
