import { z } from 'zod';

export const loanFormSchema = z.object({
  dataInicial: z.string(),
  dataFinal: z.string(),
  primeiroPagamento: z.string(),
  valor: z.string(),
  taxaJuros: z.string(),
});

export type LoanFormSchema = z.infer<typeof loanFormSchema>;

export type LoanFormErrors = Partial<Record<keyof LoanFormSchema, string[] | undefined>>;
