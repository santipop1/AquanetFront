import { User as FirebaseUser, getAuth, getIdToken, onAuthStateChanged, signOut } from "firebase/auth";
import api from './api';
import getUserByFirebaseId from "./user/getUserByFirebaseId";

// Tipos TypeScript para mejor tipado
interface SubscriptionStatus {
  hasActiveSubscription: boolean;
  subscriptionType?: 'monthly' | 'annual';
  nextPayment?: string;
  lastPayment?: string;
  daysUntilNextPayment?: number;
  canRenew?: boolean;
  status?: string;
  message?: string;
  error?: string;
}

interface CheckoutSessionResponse {
  sessionId: string;
  publicKey: string;
  userId: string;
  checkoutUrl: string;
  successUrl: string;
  cancelUrl: string;
  hasActiveSubscription: boolean;
}

interface PaymentVerificationResponse {
  status: string;
  sessionId: string;
  paymentStatus: string;
  sessionStatus: string;
  userId: string;
  planType: string;
  message: string;
}

// Función para verificar el estado de suscripción del usuario
export const checkSubscriptionStatus = async (): Promise<SubscriptionStatus> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const token = await getIdToken(user, true);
    const firebaseUserId = user.uid;

    console.log('🔍 Verificando estado de suscripción para:', firebaseUserId);

    const res = await api.get(
      `/stripe/subscription-status/${firebaseUserId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    console.log('✅ Estado de suscripción obtenido:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('❌ Error checking subscription status:', error);
    
    // Si es un error 404, significa que no hay suscripción
    if (error.response?.status === 404) {
      return {
        hasActiveSubscription: false,
        message: 'No se encontró información de suscripción'
      };
    }
    
    // Si es un error 401, el usuario no está autenticado
    if (error.response?.status === 401) {
      throw new Error('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
    }
    
    throw error;
  }
};

// Función principal para crear sesión de checkout con validación previa
const createCheckoutSessionWithValidation = async (
  userId: string, 
  planType: 'monthly' | 'annual' = 'monthly'
): Promise<CheckoutSessionResponse> => {
  try {
    console.log('🚀 Iniciando proceso de checkout con validación...');
    
    // Primero verificar si ya tiene suscripción activa
    const subscriptionStatus = await checkSubscriptionStatus();
    console.log('📊 Estado de suscripción:', subscriptionStatus);
    
    if (subscriptionStatus.hasActiveSubscription && !subscriptionStatus.canRenew) {
      // Mostrar mensaje de que ya tiene suscripción activa
      const nextPaymentDate = subscriptionStatus.nextPayment 
        ? new Date(subscriptionStatus.nextPayment).toLocaleDateString('es-ES')
        : 'fecha no disponible';
        
      const errorMessage = 
        `Ya tienes una suscripción ${subscriptionStatus.subscriptionType} activa.\n` +
        `Tu próximo pago es el: ${nextPaymentDate}\n` +
        `No necesitas realizar un nuevo pago en este momento.`;
      
      console.log('⚠️ Suscripción activa detectada:', errorMessage);
      throw new Error(errorMessage);
    }

    if (subscriptionStatus.hasActiveSubscription && subscriptionStatus.canRenew) {
      // Confirmar si quiere renovar anticipadamente
      const daysLeft = subscriptionStatus.daysUntilNextPayment || 0;
      const confirm = window.confirm(
        `Tienes una suscripción activa que vence en ${daysLeft} días.\n` +
        `¿Deseas renovarla ahora?`
      );
      
      if (!confirm) {
        throw new Error('Renovación cancelada por el usuario');
      }
      
      console.log('✅ Usuario confirmó renovación anticipada');
    }

    // Proceder con la creación de la sesión de checkout
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const email = user.email;
    const firebaseUserId = user.uid;
    const token = await getIdToken(user, true);

    console.log('💳 Creando sesión de checkout:', {
      userId: firebaseUserId,
      email: email,
      planType: planType
    });

    const res = await api.post(
      '/stripe/create-checkout-session',
      { 
        userId: firebaseUserId,
        gmail: email,
        id: null,     
        planType: planType
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    console.log('✅ Sesión de checkout creada:', res.data);
    return res.data;
    
  } catch (error: any) {
    console.error('❌ Error creating checkout session:', error);
    
    // Manejar error de suscripción activa (HTTP 409)
    if (error.response?.status === 409) {
      const errorData = error.response.data;
      throw new Error(errorData.message || 'Ya tienes una suscripción activa');
    }
    
    // Manejar otros errores HTTP
    if (error.response?.status === 401) {
      throw new Error('Usuario no autenticado. Por favor, inicia sesión nuevamente.');
    }
    
    if (error.response?.status === 404) {
      throw new Error('Usuario no encontrado en el sistema.');
    }
    
    if (error.response?.status === 400) {
      throw new Error('Datos de solicitud inválidos: ' + (error.response.data?.error || 'Error desconocido'));
    }
    
    throw error;
  }
};

// Función para verificar el pago después del checkout
export const verifyPayment = async (
  sessionId: string, 
  userId?: string, 
  planType?: string
): Promise<PaymentVerificationResponse> => {
  try {
    console.log('🔍 Verificando pago para sesión:', sessionId);
    
    const res = await api.get(
      `/stripe/checkout-success?session_id=${sessionId}` +
      (userId ? `&user_id=${userId}` : '') +
      (planType ? `&plan_type=${planType}` : '')
    );
    
    console.log('✅ Verificación de pago completada:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('❌ Error verifying payment:', error);
    throw error;
  }
};

// Función para obtener el estado de una sesión específica
export const getSessionStatus = async (sessionId: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const token = await getIdToken(user, true);

    console.log('🔍 Obteniendo estado de sesión:', sessionId);

    const res = await api.get(
      `/stripe/session-status/${sessionId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    console.log('✅ Estado de sesión obtenido:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('❌ Error getting session status:', error);
    throw error;
  }
};

// Función para procesar manualmente una suscripción
export const manualProcessSubscription = async (sessionId: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const token = await getIdToken(user, true);

    console.log('🔧 Procesando manualmente suscripción:', sessionId);

    const res = await api.post(
      `/stripe/manual-process/${sessionId}`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    console.log('✅ Suscripción procesada manualmente:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('❌ Error en procesamiento manual:', error);
    throw error;
  }
};

// Función para mostrar información de suscripción en formato legible
export const displaySubscriptionInfo = async (): Promise<string> => {
  try {
    const status = await checkSubscriptionStatus();
    
    if (status.hasActiveSubscription) {
      const nextPayment = status.nextPayment 
        ? new Date(status.nextPayment).toLocaleDateString('es-ES')
        : 'No disponible';
        
      const lastPayment = status.lastPayment 
        ? new Date(status.lastPayment).toLocaleDateString('es-ES')
        : 'No disponible';
      
      const planName = status.subscriptionType === 'monthly' ? 'Mensual' : 'Anual';
      
      return `
        🎉 Tienes una suscripción ${planName} activa
        📅 Último pago: ${lastPayment}
        🔄 Próximo pago: ${nextPayment}
        ⏰ Días restantes: ${status.daysUntilNextPayment || 'No calculado'}
        ${status.canRenew ? '\n⚠️ Puedes renovar anticipadamente' : ''}
      `.trim();
    } else {
      return '❌ No tienes una suscripción activa';
    }
  } catch (error) {
    console.error('❌ Error displaying subscription info:', error);
    return '⚠️ Error al obtener información de suscripción';
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

// Función para redirigir a checkout con validación
export const redirectToCheckout = async (planType: 'monthly' | 'annual' = 'monthly') => {
  try {
    const user = await getCurrentFirebaseUser();
    
    if (!user) {
      throw new Error('Debes iniciar sesión para continuar');
    }

    const checkoutData = await createCheckoutSessionWithValidation(user.uid, planType);
    
    // Redirigir a la URL de checkout de Stripe
    if (checkoutData.checkoutUrl) {
      console.log('🔗 Redirigiendo a checkout:', checkoutData.checkoutUrl);
      window.location.href = checkoutData.checkoutUrl;
    } else {
      throw new Error('No se pudo obtener la URL de checkout');
    }
    
    return checkoutData;
    
  } catch (error: any) {
    console.error('❌ Error en redirección a checkout:', error);
    
    // Mostrar mensaje de error al usuario
    alert(error.message || 'Error al procesar la solicitud de pago');
    throw error;
  }
};

// Función para cancelar suscripción (si implementas esta funcionalidad)
export const cancelSubscription = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const token = await getIdToken(user, true);
    
    // Nota: Necesitarías implementar este endpoint en el backend
    const res = await api.post(
      '/stripe/cancel-subscription',
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    console.log('✅ Suscripción cancelada:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('❌ Error cancelando suscripción:', error);
    throw error;
  }
};

// Función para obtener estadísticas de pagos (solo para administradores)
export const getPaymentStatistics = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const token = await getIdToken(user, true);

    const res = await api.get(
      '/stripe/payment-stats',
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    console.log('📊 Estadísticas de pagos:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('❌ Error obteniendo estadísticas:', error);
    throw error;
  }
};

// Función utilitaria para formatear fechas
export const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return 'Fecha no válida';
  }
};

// Función utilitaria para formatear precio según el plan
export const getPlanPrice = (planType: 'monthly' | 'annual'): string => {
  return planType === 'monthly' ? '$10.00 USD/mes' : '$100.00 USD/año';
};

// Función utilitaria para obtener descripción del plan
export const getPlanDescription = (planType: 'monthly' | 'annual'): string => {
  return planType === 'monthly' 
    ? 'Plan Mensual - Facturación cada mes' 
    : 'Plan Anual - Facturación cada año (2 meses gratis)';
};

// Exportar la función principal como default
export default createCheckoutSessionWithValidation;

// Exportar también como createCheckoutSession para compatibilidad
export const createCheckoutSession = createCheckoutSessionWithValidation;