import React, { useState } from 'react';
import api from '../api';
import Title from './Title';
import { loanFormSchema } from '../utils/loanFormSchema';
import type { LoanFormErrors, LoanFormSchema } from '../utils/loanFormSchema';
import { columns } from '../utils/Columns';
import { Header } from './Header';
import { Card, CardContent } from './ui/card';
import { handleApiError } from '../utils/handleApiError';
import LoanResult from './LoanResult';
import LoanForm from './LoanForm';
import type { LoanResultRow } from '../types/loan';

const initialForm: LoanFormSchema = {
  dataInicial: '',
  dataFinal: '',
  primeiroPagamento: '',
  valor: '',
  taxaJuros: '',
};

const LoanCalculator: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<LoanFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LoanResultRow[] | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: LoanFormSchema) => ({ ...prev, [name]: value }));
    if (value) setErrors((prev: LoanFormErrors) => ({ ...prev, [name]: undefined }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const validation = loanFormSchema.safeParse({ ...form, [name]: value });
    if (validation.success) {
      setErrors((prev: LoanFormErrors) => ({ ...prev, [name]: undefined }));
    } else {
      const fieldError = validation.error.flatten().fieldErrors[name as keyof LoanFormSchema];
      setErrors((prev: LoanFormErrors) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    const resultZod = loanFormSchema.safeParse(form);
    if (!resultZod.success) {
      setErrors(resultZod.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setResult(null);
    try {
      const cleanValue = form.valor.replace('R$ ', '').replace(/\./g, '').replace(',', '.');
      const numericValue = Number(cleanValue);

      if (isNaN(numericValue) || numericValue <= 0) {
        setApiError('Valor inválido. Digite um valor maior que zero.');
        return;
      }

      const { data } = await api.post('emprestimos/calcular-parcelas', {
        ...form,
        valor: numericValue,
        taxaJuros: Number(form.taxaJuros.replace('%', '').replace(',', '.')),
      });

      setResult(Array.isArray(data) ? data : null);

      if (!Array.isArray(data)) setApiError('Resposta inesperada do servidor.');


    } catch (err: unknown) {
      setApiError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const getError = (field: keyof LoanFormSchema) =>
    Array.isArray(errors[field]) ? errors[field]?.find(Boolean) : errors[field];

  return (
    <div className="bg-gradient-to-br from-blue-100 to-gray-100 flex flex-col w-full mx-auto min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center w-full px-2 py-8 ">
        <div className="w-full flex flex-col items-center justify-center mx-auto">
          <Card className="w-full p-0 md:p-0 shadow-lg border border-blue-100">
            <CardContent className="p-0 md:p-8 py-4  px-4">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-blue-100 rounded-full p-3 shadow flex items-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="4" fill="#1976d2" /><rect x="6" y="7" width="12" height="2" rx="1" fill="#fff" /><rect x="6" y="11" width="7" height="2" rx="1" fill="#fff" /></svg>
                </span>
                <Title as="h2" className="text-[15px] md:text-3xl">Simule seu empréstimo</Title>
              </div>
              <LoanForm
                form={form}
                errors={errors}
                loading={loading}
                onChange={handleChange}
                onBlur={handleBlur}
                onSubmit={handleSubmit}
                getError={getError}
                apiError={apiError}
              />
            </CardContent>
          </Card>
        </div>
        {result && (
          <LoanResult result={result} columns={columns} />
        )}
      </main>
      <footer className="w-full bg-blue-700 text-white text-center py-4 text-base mt-8 shadow-inner">
        <span>Desenvolvido para o desafio de calculadora de empréstimos &copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default LoanCalculator; 