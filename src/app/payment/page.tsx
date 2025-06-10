'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import createCheckoutSession from '@/services/stripehook';
import { GetWaterPlantTypeById } from '@/services/waterPlantTypes';

// Declarar el tipo para Stripe
declare global {
  interface Window {
    Stripe: any;
  }
}

function PaymentContent() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const searchParams = useSearchParams();
  const wpid = searchParams ? Number(searchParams.get('wpid')) : 1;
  const [waterPlantType, setWaterPlantType] = useState<any | null>(null);
  const [waterPlantLoading, setWaterPlantLoading] = useState(false);
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

  useEffect(() => {
    if (wpid) {
      setWaterPlantLoading(true);
      GetWaterPlantTypeById(wpid)
        .then((data) => {
          setWaterPlantType(data);
          // Set selectedPlan to the first word of the plant name
          if (data && data.name) {
            setSelectedPlan(data.name.split(' ')[0]);
          }
        })
        .finally(() => setWaterPlantLoading(false));
    } else {
      setWaterPlantType(null);
      setSelectedPlan('monthly');
    }
  }, [wpid]);

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
      console.log('Plan seleccionado:', selectedPlan);
      
      // Crear la sesión de checkout con el plan seleccionado
      const response = await createCheckoutSession(user.uid, selectedPlan);
      
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

  if (loading || !stripeLoaded || (wpid && waterPlantLoading)) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        {loading ? 'Cargando usuario...' : wpid && waterPlantLoading ? 'Cargando información de la planta...' : 'Cargando Stripe...'}
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
      maxWidth: '800px',
      margin: '50px auto',
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>
        {wpid && waterPlantType ? 'Pago de Purificadora' : 'Elige tu Plan de Suscripción'}
      </h2>
      <div style={{ 
        backgroundColor: '#fff', 
        padding: '20px', 
        marginBottom: '30px',
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

      {/* Selector de planes o pago de planta */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {wpid && waterPlantType ? (
          <div
            onClick={() => setSelectedPlan(waterPlantType.name.split(' ')[0])}
            style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '8px',
              border: '3px solid #007bff',
              boxShadow: '0 4px 12px rgba(0, 123, 255, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              minWidth: '300px',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              ✓
            </div>
            <h3 style={{ color: '#007bff', marginBottom: '15px' }}>{waterPlantType.name}</h3>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              ${waterPlantType.price?.toFixed(2) ?? '0.00'}
            </div>
            <p style={{ color: '#666', marginBottom: '20px', fontSize: '16px' }}>{waterPlantType.description}</p>
            <p style={{ color: '#999', fontSize: '14px', marginBottom: '15px' }}>
              Pago único por la purificadora seleccionada
            </p>
          </div>
        ) : (
          <>
            {/* Plan Mensual */}
            <div 
              onClick={() => setSelectedPlan('monthly')}
              style={{
                backgroundColor: '#fff',
                padding: '30px',
                borderRadius: '8px',
                border: selectedPlan === 'monthly' ? '3px solid #007bff' : '2px solid #ddd',
                boxShadow: selectedPlan === 'monthly' ? '0 4px 12px rgba(0, 123, 255, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                minWidth: '300px',
                position: 'relative'
              }}
            >
              {selectedPlan === 'monthly' && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </div>
              )}

              
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
                marginBottom: '20px',
                fontSize: '16px'
              }}>
                por mes
              </p>
              <p style={{ 
                color: '#999', 
                fontSize: '14px',
                marginBottom: '15px'
              }}>
                Renovación automática mensual
              </p>
            </div>
            {/* Plan Anual */}
            <div 
              onClick={() => setSelectedPlan('annual')}
              style={{
                backgroundColor: '#fff',
                padding: '30px',
                borderRadius: '8px',
                border: selectedPlan === 'annual' ? '3px solid #28a745' : '2px solid #ddd',
                boxShadow: selectedPlan === 'annual' ? '0 4px 12px rgba(40, 167, 69, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                minWidth: '300px',
                position: 'relative'
              }}
            >
              {selectedPlan === 'annual' && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </div>
              )}
              {/* Badge de ahorro */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: '#28a745',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '15px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                ¡AHORRA!
              </div>
              
              <h3 style={{ color: '#28a745', marginBottom: '15px' }}>
                Plan Anual
              </h3>
              <div style={{ 
                fontSize: '48px', 
                fontWeight: 'bold', 
                color: '#333',
                marginBottom: '5px'
              }}>
                $80.00
              </div>
              <p style={{ 
                color: '#666', 
                marginBottom: '10px',
                fontSize: '16px'
              }}>
                por año
              </p>
              <p style={{ 
                color: '#28a745', 
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '15px'
              }}>
                Equivale a $8.33/mes
              </p>
              <p style={{ 
                color: '#999', 
                fontSize: '14px',
                marginBottom: '15px'
              }}>
                Pago recurrente anual
              </p>
            </div>
          </>
        )}
      </div>
      {/* Botón de suscripción */}
      <button 
        onClick={handleSubscription}
        disabled={processingPayment}
        style={{
          backgroundColor: processingPayment ? '#ccc' : 
            (wpid && waterPlantType) ? '#007bff' : (selectedPlan === 'annual' ? '#28a745' : '#007bff'),
          color: 'white',
          border: 'none',
          padding: '15px 40px',
          fontSize: '20px',
          borderRadius: '8px',
          cursor: processingPayment ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s',
          fontWeight: 'bold',
          minWidth: '300px'
        }}
      >
        {processingPayment ? 'Procesando...' : 
         (wpid && waterPlantType)
           ? `Pagar purificadora (${waterPlantType.name})`
           : `Suscribirse al Plan ${selectedPlan === 'monthly' ? 'Mensual' : 'Anual'}`}
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
      
      {/* Información adicional */}
      <div style={{ 
        marginTop: '30px', 
        fontSize: '12px', 
        color: '#999',
        textAlign: 'left',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h4 style={{ marginBottom: '15px', color: '#333' }}>
          Incluido en ambos planes:
        </h4>
        <p>✓ Acceso completo a todas las funciones</p>
        <p>✓ Soporte técnico incluido</p>
        <p>✓ Pago seguro con Stripe</p>
        {selectedPlan === 'monthly' && (
          <p>✓ Cancela en cualquier momento</p>
        )}
        {selectedPlan === 'annual' && (
          <>
            <p>✓ Ahorra $20 al año</p>
            <p>✓ Sin preocupaciones por 12 meses</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentComponent() {
  return (
    <Suspense>
      <PaymentContent />
    </Suspense>
  );
}