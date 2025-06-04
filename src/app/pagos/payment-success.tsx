'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { verifyPayment } from '@/services/stripe';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [paymentStatus, setPaymentStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (sessionId) {
      verifyPayment(sessionId)
        .then((data) => {
          setPaymentStatus('success');
          setPaymentDetails(data);
          // Redirigir después de 5 segundos
          setTimeout(() => {
            router.push('/dashboard');
          }, 5000);
        })
        .catch((error) => {
          console.error('Error verifying payment:', error);
          setPaymentStatus('failed');
        });
    } else {
      setPaymentStatus('failed');
    }
  }, [sessionId, router]);

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          {paymentStatus === 'verifying' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <h1 className="text-2xl font-bold mb-2">Verificando tu pago...</h1>
              <p className="text-gray-600">Por favor espera un momento mientras confirmamos tu transacción.</p>
            </>
          )}

          {paymentStatus === 'success' && paymentDetails && (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-2 text-green-600">¡Pago exitoso!</h1>
              <p className="mb-4">Gracias por tu compra. Tu suscripción ha sido activada.</p>
              
              <div className="text-left bg-gray-50 p-4 rounded-md mb-4">
                <p><strong>ID de sesión:</strong> {paymentDetails.sessionId}</p>
                <p><strong>Estado:</strong> {paymentDetails.paymentStatus}</p>
                {paymentDetails.customerEmail && (
                  <p><strong>Email:</strong> {paymentDetails.customerEmail}</p>
                )}
              </div>
              
              <p className="text-gray-500 text-sm">Serás redirigido automáticamente en 5 segundos...</p>
            </>
          )}

          {paymentStatus === 'failed' && (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-2 text-red-600">Error en el pago</h1>
              <p className="mb-4">No pudimos verificar tu pago. Por favor intenta nuevamente.</p>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Volver al inicio
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}