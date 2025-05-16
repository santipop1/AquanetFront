'use client';

import './Inicio.css';
import Image from 'next/image';
import Link from 'next/link';
import ContratarPlan from '@/components/ContratarPlan/ContratarPlan';
import Footer from '@/components/Footer/Footer';
import { useEffect } from 'react';



declare global {
  interface Window {
    watsonAssistantChatOptions: {
      integrationID: string;
      region: string;
      serviceInstanceID: string;
      onLoad: (instance: any) => void;
      clientVersion?: string;
      showLauncher?: boolean;
    };
  }
}

export default function Inicio() {
  useEffect(() => {
    // Configuración del bot de Watson con personalización
    window.watsonAssistantChatOptions = {
      integrationID: "9aa77c57-a1c6-44aa-9184-f937eb1cd57e",
      region: "us-south",
      serviceInstanceID: "f0d6142e-e0bd-48cc-bfee-14d7ea2a6525",
      showLauncher: true,
      onLoad: (instance) => { 
        // Personalización del launcher
        instance.updateCSSVariables({
            'launcher-icon-size': '0px',
            'launcher-background-image': 'url(/animation.gif)', // Cambia esta línea
            'launcher-background-size': 'cover',
            'launcher-width': '80px',
            'launcher-height': '80px',
            'launcher-box-shadow': 'none',
            'launcher-border-radius': '50%',
            'launcher-background-color': 'transparent',
            'launcher-border': '2px solid #05b852'
});
        
        // Esperar a que el launcher se cargue para aplicar estilos adicionales
        setTimeout(() => {
          const launcher = document.querySelector('.MACLauncher__Button');
          if (launcher) {
            launcher.innerHTML = ''; // Eliminar el contenido SVG existente
          }
        }, 1000);
        
        instance.render();
      }
    };

    // Crear y cargar el script
    const script = document.createElement('script');
    script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + 
      (window.watsonAssistantChatOptions.clientVersion || 'latest') + 
      "/WatsonAssistantChatEntry.js";
    document.head.appendChild(script);

    return () => {
      // Limpieza: eliminar el script cuando el componente se desmonte
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);


  return (
    <section className="inicio">
      <header className="hero">
        <div className="logo-container">
          <Image src="/logo.png" alt="Logo aquanet" width={500} height={80} />
        </div>
        <p>
          En <span className="logo-inline"><Image src="/logo.png" alt="aquanet" width={90} height={30} /></span>, revolucionamos el emprendimiento con un modelo inteligente de franquicias de purificadoras de agua, el cual además facilita el acceso de la población a agua potable y ¡fomenta el consumo sustentable!
        </p>
        <p>
          Nuestra plataforma analiza múltiples variables para asegurar que cada purificadora se instale en el <strong>lugar ideal</strong>, maximizando su rentabilidad y alcance. Además, con{' '}
          <span className="aquanetplus-inline">
            <Image src="/aquanetplus.png" alt="aquanet+" width={100} height={30} />
          </span>{' '}
          ofrecemos un software de gestión avanzada que te permite monitorear y administrar tu purificadora en tiempo real.
        </p>

        <div className="registro-redirect">
          <Link href="/registro" className="btn-ir-a-registro underline" style={{ color: '#05b852' }}>
            Ir a Registro
          </Link>
        </div>
      </header>

      <div className="wave">
        <img src="/top-wave.svg" alt="Wave decoration" />
      </div>

      <div className="contenido">
        <video controls className="video">
          <source src="/videoaquanet.mp4" type="video/mp4" />
          Tu navegador no soporta este video.
        </video>

        <section className="cta">
          <h2>¡Purifica tu futuro!</h2>
          <p>
            Purifica tu futuro comprando una franquicia purificadora con{' '}
            <span className="logo-inline">
              <Image src="/logo.png" alt="aquanet" width={90} height={30} />
            </span>! Nuestro avanzado algoritmo te ayudará a encontrar la purificadora de tus sueños, asegurando que tu inversión esté en el lugar ideal, maximizando su impacto y rentabilidad. Y disfruta...
          </p>
          <p className="bonus">
            ¡Incluye 2 años de{' '}
            <span className="aquanetplus-inline">
              <Image src="/aquanetplus.png" alt="aquanet+" width={100} height={30} />
            </span>{' '}
            totalmente gratis
          </p>
          <a href="#aplica" className="apply-link">Aplica ahora</a>
        </section>
      </div>

      <div className="wave">
        <img src="/bottom-wave.svg" alt="Wave decoration" />
      </div>

      <section className="franquicia">
        <div className="logo-aquanet-plus-img">
          <Image src="/aquanetplus.png" alt="aquanet+" width={200} height={80} />
        </div>
        <h3 className="franquicia-titulo">¿Ya tienes una franquicia purificadora?</h3>
        <p className="franquicia-descripcion">
          Lleva tu negocio al siguiente nivel con{' '}
          <span className="aquanetplus-inline">
            <Image src="/aquanetplus.png" alt="aquanet+" width={100} height={30} />
          </span>{' '}
          y simplifica la administración de tu purificadora, con tecnología de monitoreo en tiempo real, reportes inteligentes y gestión eficiente de insumos, te ayudamos a maximizar la productividad y rentabilidad de tu franquicia.
        </p>
        <ul className="franquicia-beneficios">
          <li>Gestión de ventas e inventario</li>
          <li>Monitoreo en tiempo real</li>
          <li>Reportes inteligentes</li>
        </ul>
      </section>

      <section className="planes">
        <h2 className="titulo-planes">Elige tu plan</h2>
        <div className="contenedor-planes flex items-center">
          <ContratarPlan
            titulo="Plan Mensual"
            precio="$699"
            periodicidad="al mes"
            onContratar={() => alert("Plan mensual contratado")}
          />
          <ContratarPlan
            titulo="Plan Anual"
            precio="$579"
            periodicidad="al mes"
            notaAdicional="un solo pago de $6,948"
            onContratar={() => alert("Plan anual contratado")}
          />
        </div>
      </section>

      <Footer />
    </section>
  );
}