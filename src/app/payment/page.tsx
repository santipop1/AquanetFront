'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import createCheckoutSession, { getCurrentFirebaseUser } from '@/services/stripehook';

// Declarar el tipo para Stripe
declare global {
  interface Window {
    Stripe: any;
  }
}

export default function PaymentComponent() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const router = useRouter();

  // Función para cargar Stripe dinámicamente
  const loadStripe = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.Stripe) {
        setStripeLoaded(true);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => {
        setStripeLoaded(true);
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Failed to load Stripe'));
      };
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    // Cargar Stripe
    loadStripe().catch(error => {
      console.error('Error loading Stripe:', error);
    });

    // Configurar autenticación
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      
      if (!firebaseUser) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubscription = async () => {
    if (!user) {
      alert('Debes estar autenticado para realizar un pago');
      return;
    }

    if (!stripeLoaded || !window.Stripe) {
      alert('Stripe no está cargado. Por favor, recarga la página e intenta de nuevo.');
      return;
    }

    setProcessingPayment(true);

    try {
      console.log('Iniciando proceso de pago para usuario:', user.uid);
      
      // Crear la sesión de checkout con el userId de Firebase (solo plan mensual)
      const response = await createCheckoutSession(user.uid, 'monthly');
      
      console.log('Sesión creada:', response);

      // Redirigir a Stripe Checkout
      if (response.sessionId) {
        const stripe = window.Stripe(response.publicKey);
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.sessionId,
        });

        if (error) {
          console.error('Error al redirigir a Stripe:', error);
          alert('Error al procesar el pago: ' + error.message);
        }
      } else {
        throw new Error('No se recibió sessionId del servidor');
      }
    } catch (error: any) {
      console.error('Error en el proceso de pago:', error);
      alert('Error al procesar el pago: ' + (error.message || 'Error desconocido'));
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading || !stripeLoaded) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        {loading ? 'Cargando usuario...' : 'Cargando Stripe...'}
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Redirigiendo al login...
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '50px auto',
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>
        Plan de Suscripción
      </h2>
      
      <div style={{ 
        backgroundColor: '#fff', 
        padding: '20px', 
        marginBottom: '20px',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <p style={{ margin: '10px 0', color: '#666' }}>
          <strong>Usuario:</strong> {user.email}
        </p>
        <p style={{ margin: '10px 0', color: '#666', fontSize: '12px' }}>
          ID: {user.uid}
        </p>
      </div>
      
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        border: '2px solid #007bff',
        boxShadow: '0 2px 4px rgba(0, 123, 255, 0.1)'
      }}>
        <h3 style={{ color: '#007bff', marginBottom: '15px' }}>
          Plan Mensual
        </h3>
        <div style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          color: '#333',
          marginBottom: '10px'
        }}>
          $10.00
        </div>
        <p style={{ 
          color: '#666', 
          marginBottom: '25px',
          fontSize: '16px'
        }}>
          por mes
        </p>
        
        <button 
          onClick={handleSubscription}
          disabled={processingPayment}
          style={{
            backgroundColor: processingPayment ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            fontSize: '18px',
            borderRadius: '5px',
            cursor: processingPayment ? 'not-allowed' : 'pointer',
            width: '100%',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => {
            if (!processingPayment) {
              e.currentTarget.style.backgroundColor = '#0056b3';
            }
          }}
          onMouseOut={(e) => {
            if (!processingPayment) {
              e.currentTarget.style.backgroundColor = '#007bff';
            }
          }}
        >
          {processingPayment ? 'Procesando...' : 'Suscribirse Ahora'}
        </button>
        
        {processingPayment && (
          <p style={{ 
            marginTop: '15px', 
            color: '#666',
            fontSize: '14px'
          }}>
            Redirigiendo a la página de pago seguro...
          </p>
        )}
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        fontSize: '12px', 
        color: '#999',
        textAlign: 'left'
      }}>
        <p>✓ Acceso completo a todas las funciones</p>
        <p>✓ Soporte técnico incluido</p>
        <p>✓ Cancela en cualquier momento</p>
        <p>✓ Pago seguro con Stripe</p>
      </div>
    </div>
  );
}