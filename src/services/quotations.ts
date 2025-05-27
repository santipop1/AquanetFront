import api from './api';

export const createQuotation = async (payload: any) => {
  try {
    const res = await api.post('/Quotations', payload);
    return res.data;
  } catch (error) {
    console.error(' Error creando quotations:', error);

    throw error;
  }
};