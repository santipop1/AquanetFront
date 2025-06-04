'use client';

import './dashboard.css';
import Image from 'next/image';
import Link from 'next/link';
import RecuadroFranquicias from '@/components/RecuadroFranquicias/RecuadroFranquicias';
import RecuadroDashboard from '@/components/RecuadroDashboard/RecuadroDashboard';
import { useState, useEffect } from 'react';
import { createCheckoutSession, verifyPayment } from '@/services/stripe';
import { loadStripe } from '@stripe/stripe-js';

export default function DashboardPage() {
  const franquicias = [
    { nombre: 'Franquicia 1', logoSrc: '/gotita.png' },
    { nombre: 'Franquicia 2', logoSrc: '/gotita.png' },
    { nombre: 'Franquicia 3', logoSrc: '/gotita.png' }
  ];

  const [franquiciaActiva, setFranquiciaActiva] = useState(franquicias[0]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    setUserId(id);

    const searchParams = new URLSearchParams(window.location.search);
    const sessionId = searchParams.get('session_id');
    const planType = searchParams.get('plan_type');
    
    if (sessionId && planType && id) {
      verifyPaymentStatus(sessionId, id, planType as 'monthly' | 'annual');
    }
  }, []);

  const verifyPaymentStatus = async (
    sessionId: string, 
    userId: string, 
    planType: 'monthly' | 'annual'
  ) => {
    try {
      setIsLoading(true);
      const result = await verifyPayment(sessionId, userId, planType);
      if (result.status === 'success') {
        setPaymentStatus('completed');
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setPaymentStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    setPaymentStatus(null);
    
    try {
      const { sessionId, publicKey } = await createCheckoutSession(userId, selectedPlan);
      
      const stripe = await loadStripe(publicKey);
      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: sessionId
        });
        
        if (result.error) {
          console.error(result.error.message);
          setPaymentStatus('failed');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h1 className="dashboard-logo">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo aquanet"
              width={150}
              height={150}
              priority
            />
          </Link>
        </h1>
        <h2 className="dashboard-subtitle">Mis Franquicias</h2>
        <div className="dashboard-franquicias-list">
          {franquicias.map((f, i) => (
            <RecuadroFranquicias
              key={i}
              nombre={f.nombre}
              logoSrc={f.logoSrc}
              onClick={() => setFranquiciaActiva(f)}
            />          
          ))}
        </div>
      </aside>

      <main className="dashboard-main">
        <h2 className="dashboard-titulo">{franquiciaActiva.nombre}</h2>
        
        {paymentStatus === 'completed' && (
          <div className="payment-success">
            <p>¡Pago completado con éxito!</p>
            <p>Plan: {selectedPlan === 'monthly' ? 'Mensual' : 'Anual'}</p>
          </div>
        )}
        
        {paymentStatus === 'failed' && (
          <div className="payment-error">
            <p>Error en el pago. Por favor intenta nuevamente.</p>
          </div>
        )}

        <div className="dashboard-grid">
          <RecuadroDashboard variante="info" />
          <RecuadroDashboard variante="ventas" />
          <RecuadroDashboard variante="refacciones" />
        </div>

        <div className="subscription-section">
          <h3>Selecciona tu plan de suscripción</h3>
          
          <div className="plan-selector">
            <label className={`plan-option ${selectedPlan === 'monthly' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="plan"
                checked={selectedPlan === 'monthly'}
                onChange={() => setSelectedPlan('monthly')}
              />
              <div className="plan-content">
                <span className="plan-name">Plan Mensual</span>
                <span className="plan-price">$70.00 USD/mes</span>
              </div>
            </label>
            
            <label className={`plan-option ${selectedPlan === 'annual' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="plan"
                checked={selectedPlan === 'annual'}
                onChange={() => setSelectedPlan('annual')}
              />
              <div className="plan-content">
                <span className="plan-name">Plan Anual</span>
                <span className="plan-price">$69.48 USD/año</span>
                <span className="plan-savings">(Ahorras 1.7%)</span>
              </div>
            </label>
          </div>

          <button 
            onClick={handlePayment} 
            disabled={isLoading || !userId}
            className="stripe-button"
          >
            {isLoading ? 'Procesando...' : `Suscribirse ${selectedPlan === 'monthly' ? 'Mensualmente' : 'Anualmente'}`}
          </button>
        </div>
      </main>
    </div>
  );
}