import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import FormField from './FormField';
import CurrencyInput from './CurrencyInput';
import PercentageInput from './PercentageInput';
import type { LoanFormSchema } from '../utils/loanFormSchema';


interface LoanFormProps {
  form: LoanFormSchema;
  errors: Partial<Record<keyof LoanFormSchema, string[]>>;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  getError: (field: keyof LoanFormSchema) => string | undefined;
  apiError: string | null;
}

const LoanForm: React.FC<LoanFormProps> = ({ form,  loading, onChange, onBlur, onSubmit, getError, apiError }) => (
  <section aria-labelledby="loan-form-title" className="w-full flex flex-col items-center justify-center mx-auto">
    <form className="flex flex-col gap-8 w-full" onSubmit={onSubmit} noValidate>
      <div className="flex flex-row flex-wrap items-start gap-4 w-full">
        <div className="flex flex-col flex-1 min-w-[180px]">
          <FormField label="Data Inicial*" error={getError('dataInicial')}>
            <Input type="date" name="dataInicial" value={form.dataInicial} onChange={onChange} onBlur={onBlur} aria-required="true" />
          </FormField>
        </div>
        <div className="flex flex-col flex-1 min-w-[180px]">
          <FormField label="Data Final*" error={getError('dataFinal')}>
            <Input type="date" name="dataFinal" value={form.dataFinal} onChange={onChange} onBlur={onBlur} aria-required="true" />
          </FormField>
        </div>
        <div className="flex flex-col flex-1 min-w-[180px]">
          <FormField label="Primeiro Pagamento*" error={getError('primeiroPagamento')}>
            <Input type="date" name="primeiroPagamento" value={form.primeiroPagamento} onChange={onChange} onBlur={onBlur} aria-required="true" />
          </FormField>
        </div>
        <div className="flex flex-col flex-1 min-w-[180px]">
          <FormField label="Valor do Empréstimo*" error={getError('valor')}>
            <CurrencyInput name="valor" value={form.valor} onChange={onChange} onBlur={onBlur} aria-required={true} />
          </FormField>
        </div>
        <div className="flex flex-col flex-1 min-w-[120px]">
          <FormField label="Taxa de Juros*" error={getError('taxaJuros')}>
            <PercentageInput name="taxaJuros" value={form.taxaJuros} onChange={onChange} onBlur={onBlur} aria-required={true} />
          </FormField>
        </div>
        <div className="flex flex-col justify-end min-w-[120px] h-[66px]">
          <Button size={'sm'} variant={'default'} type="submit" disabled={loading} className="w-full h-[42px] cursor-pointer" aria-busy={loading} aria-label="Calcular empréstimo" >
            {loading ? 'Carregando...' : 'Calcular'}
          </Button>
        </div>
      </div>
        {apiError && <div className="text-red-600 bg-red-50 p-3 rounded text-center border border-red-200 text-base mt-2 h-40" aria-live="assertive">{apiError}</div>}
    </form>
  </section>
);

export default LoanForm; 