export function handleApiError(err: any): string {
  let errorMsg = 'Erro ao calcular parcelas';
  
  if (err?.response?.data?.message) {
    errorMsg = err.response.data.message;
  } else if (typeof err?.response?.data === 'string') {
    errorMsg = err.response.data;
  } else if (err?.response?.status === 400) {
    errorMsg = 'Dados inválidos. Verifique os campos.';
  } else if (err?.request) {
    errorMsg = 'Não foi possível conectar ao servidor. Tente novamente.';
  } else if (err?.message) {
    errorMsg = err.message;
  }
  
  return errorMsg;
} 