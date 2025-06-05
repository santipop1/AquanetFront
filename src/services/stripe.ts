import api from '../services/api';

export const createCheckoutSession = async (userId: string, planType: 'monthly' | 'annual') => {
  try {
    const res = await api.post(`/stripe/create-checkout-session/${userId}/${planType}`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const verifyPayment = async (sessionId: string, userId: string, planType: string) => {
  try {
    const res = await api.get(
      `/stripe/checkout-success?session_id=${sessionId}&user_id=${userId}&plan_type=${planType}`
    );
    return res.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};