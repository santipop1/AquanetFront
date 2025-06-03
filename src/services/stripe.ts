import api from '../services/api';

export const createCheckoutSession = async () => {
  try {
    const res = await api.post('/stripe/create-checkout-session', {}, {
    });
    return res.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};