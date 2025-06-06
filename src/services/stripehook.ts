import { User as FirebaseUser, getAuth, getIdToken, onAuthStateChanged, signOut } from "firebase/auth";
import api from './api';
import getUserByFirebaseId from "./user/getUserByFirebaseId";

const createCheckoutSession = async (userId: string, planType: 'monthly' | 'annual') => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const email = user.email;
    const firebaseUserId = user.uid; // Este es el ID que necesitamos

    // Obtener el token de Firebase actualizado
    const token = await getIdToken(user, true);

    console.log('Enviando datos a Stripe:', {
      userId: firebaseUserId,
      email: email,
      planType: planType
    });

    const res = await api.post(
      '/stripe/create-checkout-session',
      { 
        userId: firebaseUserId, // Enviamos el Firebase UID
        gmail: email,           // Email del usuario
        id: null,     
        planType: planType           // Este campo puede ser null si no lo necesitas
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Usamos el token actualizado
          'Content-Type': 'application/json'
        },timeout: 15000
      }
    );

    console.log('Respuesta de Stripe:', res.data);
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

// Función auxiliar para obtener el usuario actual de Firebase
export const getCurrentFirebaseUser = (): Promise<FirebaseUser | null> => {
  return new Promise((resolve) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

export default createCheckoutSession;