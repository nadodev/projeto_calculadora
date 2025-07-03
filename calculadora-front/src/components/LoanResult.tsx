import React from 'react';
import Title from './Title';
import { Card, CardContent } from './ui/card';
import { format, parseISO } from 'date-fns';
import type { LoanResultProps, LoanResultRow } from '../types/loan';

function formatBRL(value: number | string): string {
  const num = typeof value === 'string' ? Number(value) : value;
  if (isNaN(num)) return String(value);
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDateBR(dateStr: string): string {
  if (!dateStr) return '';
  try {
    return format(parseISO(dateStr), 'dd/MM/yyyy');
  } catch {
    return dateStr;
  }
}

const LoanResult: React.FC<LoanResultProps> = ({ result }) => (
  <section aria-labelledby="loan-result-title" className="w-full flex flex-col items-center justify-center mx-auto mt-8 ">
    <Card className="w-full p-0 md:p-0 shadow-lg border border-green-100">
      <CardContent className="p-0 md:p-8">
        <div className="flex items-center gap-3 mb-8 mb-2 mt-2 ">
          <span className="bg-green-100 rounded-full p-3 shadow flex items-center ml-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="4" fill="#43a047"/><rect x="6" y="7" width="12" height="2" rx="1" fill="#fff"/><rect x="6" y="11" width="7" height="2" rx="1" fill="#fff"/></svg>
          </span>
          <Title as="h2" id="loan-result-title" className="text-[16px] md:text-3xl">Resultado do Empréstimo</Title>
        </div>
        <div className="w-full overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
          <table className="w-full table-auto text-base">
            <thead>
              <tr>
                <th colSpan={3} className="bg-blue-600 text-white font-bold px-6 py-4 border-b text-center text-lg shadow-md">Empréstimo</th>
                <th colSpan={2} className="bg-green-600 text-white font-bold px-6 py-4 border-b text-center text-lg shadow-md">Parcela</th>
                <th colSpan={2} className="bg-yellow-600 text-white font-bold px-6 py-4 border-b text-center text-lg shadow-md">Principal</th>
                <th colSpan={3} className="bg-purple-600 text-white font-bold px-6 py-4 border-b text-center text-lg shadow-md">Juros</th>
              </tr>
              <tr>
                <th className="bg-blue-100 text-blue-900 font-semibold px-4 py-3 border-b text-center border-blue-200">Data Competência</th>
                <th className="bg-blue-100 text-blue-900 font-semibold px-4 py-3 border-b text-center border-blue-200">Valor de Empréstimo</th>
                <th className="bg-blue-100 text-blue-900 font-semibold px-4 py-3 border-b text-center border-blue-200">Saldo Devedor</th>
                <th className="bg-green-100 text-green-900 font-semibold px-4 py-3 border-b text-center border-green-200">Consolidada</th>
                <th className="bg-green-100 text-green-900 font-semibold px-4 py-3 border-b text-center border-green-200">Total</th>
                <th className="bg-yellow-100 text-yellow-900 font-semibold px-4 py-3 border-b text-center border-yellow-200">Amortização</th>
                <th className="bg-yellow-100 text-yellow-900 font-semibold px-4 py-3 border-b text-center border-yellow-200">Saldo</th>
                <th className="bg-purple-100 text-purple-900 font-semibold px-4 py-3 border-b text-center border-purple-200">Provisão</th>
                <th className="bg-purple-100 text-purple-900 font-semibold px-4 py-3 border-b text-center border-purple-200">Acumulado</th>
                <th className="bg-purple-100 text-purple-900 font-semibold px-4 py-3 border-b text-center border-purple-200">Pago</th>
              </tr>
            </thead>
            <tbody>
              {result.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-gray-400">Nenhum dado encontrado</td>
                </tr>
              ) : (
                result.map((row: LoanResultRow, idx: number) => (
                  <tr
                    key={idx}
                    className={
                      `${idx % 2 === 0 ? '' : ''}`
                    }
                  >
                    <td className="bg-blue-50 text-gray-800 px-6 py-4 border-b text-center whitespace-nowrap">{formatDateBR(row.dataCompetencia)}</td>
                    <td className="bg-blue-50 text-gray-800 px-6 py-4 border-b text-center whitespace-nowrap">{formatBRL(row.valorEmprestimo)}</td>
                    <td className="bg-blue-50 text-gray-800 px-6 py-4 border-b text-center whitespace-nowrap">{formatBRL(row.saldoDevedor)}</td>
                    <td className="bg-green-50 text-gray-800 px-6 py-4 border-b text-center whitespace-nowrap">{row.consolidada}</td>
                    <td className="bg-green-50 text-gray-800 px-6 py-4 border-b text-center whitespace-nowrap">{formatBRL(row.total)}</td>
                    <td className="bg-yellow-50 text-gray-800 px-6 py-4 border-b text-center whitespace-nowrap">{formatBRL(row.amortizacao)}</td>
                    <td className="bg-yellow-50 text-gray-800 px-6 py-4 border-b text-center whitespace-nowrap">{formatBRL(row.saldo)}</td>
                    <td className="bg-purple-50 text-gray-800 px-6 py-4 border-b text-center whitespace-nowrap">{formatBRL(row.provisao)}</td>
                    <td className="bg-purple-50 text-gray-800 px-6 py-4 border-b text-center whitespace-nowrap">{formatBRL(row.acumulado)}</td>
                    <td className="bg-purple-50 text-gray-800 px-6 py-4 border-b text-center whitespace-nowrap">{formatBRL(row.pago)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </section>
);

export default LoanResult; 