'use client';

import './Inicio.css';
import Image from 'next/image';
import Link from 'next/link';
import ContratarPlan from '@/components/ContratarPlan/ContratarPlan';
import HeaderMini from '@/components/HeaderMini/HeaderMini';
import Footer from '@/components/Footer/Footer';
import { useEffect } from 'react';

export default function Prueba() {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: '9aa77c57-a1c6-44aa-9184-f937eb1cd57e',
      region: 'us-south',
      serviceInstanceID: 'f0d6142e-e0bd-48cc-bfee-14d7ea2a6525',
      showLauncher: true,
      greeting: [{
        delay: 0,
        message: "",
        is_enabled: false
      }],
      onLoad: (instance) => {
        instance.updateCSSVariables({
          'launcher-icon-size': '0px',
          'launcher-background-image': 'url(/animation.gif)',
          'launcher-background-size': 'cover',
          'launcher-width': '80px',
          'launcher-height': '80px',
          'launcher-box-shadow': 'none',
          'launcher-border-radius': '50%',
          'launcher-background-color': 'transparent',
          'launcher-border': '2px solid #05b852'
        });
        const cleanLauncher = () => {
          document.querySelector('.WACLauncher__Button')?.replaceChildren();
          document.querySelector('.WACLauncherComplex__Text')?.remove();
        };
        cleanLauncher();
        const interval = setInterval(cleanLauncher, 1000);
        setTimeout(() => clearInterval(interval), 5000);
        instance.render();
      }
    };

    const script = document.createElement('script');
    script.src = 'https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js';
    document.head.appendChild(script);
    return () => {
      document.head.contains(script) && document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <HeaderMini />
      <main className="pagina-prueba">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-text">
            <h1>Agua pura y saludable para tu hogar</h1>
            <p className="justificado">
              En <span className="inline-logo"><Image src="/logo.png" alt="aquanet" width={90} height={30} /></span>, revolucionamos el emprendimiento con un modelo inteligente de franquicias de purificadoras de agua, el cual además facilita el acceso de la población a agua potable y ¡fomenta el consumo sustentable!<br />
              Nuestra plataforma analiza múltiples variables para asegurar que cada purificadora se instale en el <strong>lugar ideal</strong>, maximizando su rentabilidad y alcance. Además, con <span className="inline-logo"><Image src="/aquanetplus.png" alt="aquanet+" width={100} height={30} /></span> ofrecemos un software de gestión avanzada que te permite monitorear y administrar tu purificadora en tiempo real.
            </p>

            <Link href="/registro" className="boton">Regístrate</Link>
          </div>
           {/* AQUÍ CAMBIAR POR IMAGEN ADOCK A LAS PURIFICADORAS */}
          <div className="hero-image">
            <Image src="/agua.jpg" alt="Agua pura" width={500} height={400} />
          </div>
        </section>

        {/* Video + CTA */}
        <section className="contenido">
          <h2>¡Purifica tu futuro!</h2>
          <video controls className="video">
            <source src="/videoaquanet.mp4" type="video/mp4" />
            Tu navegador no soporta este video.
          </video>
          <p className="promo-text">
            Purifica tu futuro comprando una franquicia purificadora con{' '}
            <span className="inline-logo">
                <Image src="/logo.png" alt="aquanet" width={80} height={30} />
                </span>{' '} ! Nuestro avanzado algoritmo te ayudará a encontrar la purificadora de tus sueños, asegurando que tu inversión esté en el lugar ideal, maximizando su impacto y rentabilidad. Y disfruta...
            </p>
        <p className="bonus-text">
            ¡Incluye 2 años de{' '}
            <span className="inline-logo">
                <Image src="/aquanetplus.png" alt="aquanet+" width={100} height={30} />
                </span>{' '} totalmente gratis!
        </p>
<div className="registro-redirect">
  <Link href="/formulario">
    <button className="cta-franquicia">¡QUIERO COMPRAR UNA FRANQUICIA!</button>
  </Link>
</div>

        </section>

        {/* Planes */}
        <section className="planes">
          <h2 className="titulo-planes">Elige tu plan</h2>
          <div className="contenedor-planes">
            <div className="card-plan">
              <ContratarPlan
                titulo="Plan Mensual"
                precio="$699"
                periodicidad="al mes"
                onContratar={() => alert("Plan mensual contratado")}
              />
            </div>
            <div className="card-plan">
              <ContratarPlan
                titulo="Plan Anual"
                precio="$579"
                periodicidad="al mes"
                notaAdicional="un solo pago de $6,948"
                onContratar={() => alert("Plan anual contratado")}
              />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
