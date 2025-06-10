"use client";

import "./Inicio.css";
import Image from "next/image";
import Link from "next/link";
import ContratarPlan from "@/components/ContratarPlan/ContratarPlan";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect } from "react";
import { UseAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    watsonAssistantChatOptions?: {
      integrationID: string;
      region: string;
      serviceInstanceID: string;
      showLauncher: boolean;
      greeting: Array<{ delay: number; message: string; is_enabled: boolean }>;
      onLoad: (instance: {
        updateCSSVariables: (vars: Record<string, string>) => void;
        render: () => void;
      }) => void;
    };
  }
}

export default function HomePage() {
  const { user } = UseAuth();
  const router = useRouter();

  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "9aa77c57-a1c6-44aa-9184-f937eb1cd57e",
      region: "us-south",
      serviceInstanceID: "f0d6142e-e0bd-48cc-bfee-14d7ea2a6525",
      showLauncher: true,
      greeting: [{ delay: 0, message: "", is_enabled: false }],
      onLoad: (instance) => {
        instance.updateCSSVariables({
          "launcher-icon-size": "0px",
          "launcher-background-image": "url(/animation.gif)",
          "launcher-background-size": "cover",
          "launcher-width": "80px",
          "launcher-height": "80px",
          "launcher-box-shadow": "none",
          "launcher-border-radius": "50%",
          "launcher-background-color": "transparent",
          "launcher-border": "2px solid #05b852",
        });
        const cleanLauncher = () => {
          document.querySelector(".WACLauncher__Button")?.replaceChildren();
          document.querySelector(".WACLauncherComplex__Text")?.remove();
        };
        cleanLauncher();
        const interval = setInterval(cleanLauncher, 1000);
        setTimeout(() => clearInterval(interval), 5000);
        instance.render();
      },
    };

    const script = document.createElement("script");
    script.src =
      "https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js";
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="pagina-prueba">
        <section className="hero">
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-text">
              <h1>Soluciones inteligentes en purificación de agua</h1>
              <p>
                Con{" "}
                <span className="inline-logo">
                  <Image src="/logo.png" alt="aquanet" width={90} height={30} />
                </span>
                , llevamos el acceso a agua purificada al siguiente nivel con un
                modelo de franquicias rentable, sustentable y automatizado.
              </p>
              <div className="hero-buttons">
                {!user && (
                  <Link href="/registro" className="btn-primary">
                    Regístrate
                  </Link>
                )}
              </div>
            </div>
            <div className="hero-image">
              <Image src="/agua.jpg" alt="Agua pura" width={500} height={400} />
            </div>
          </div>
        </section>
        <section className="contenido">
          <h2>¡Purifica tu futuro!</h2>
          <div className="video">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/Tiq__hBosMg"
              title="Video Aquanet"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ borderRadius: "8px", boxShadow: "0 30px 50px rgba(0, 0, 0, 0.2)" }}
            ></iframe>
          </div>

          <p className="promo-text">
            Purifica tu futuro comprando una franquicia purificadora con{" "}
            <span className="inline-logo">
              <Image src="/logo.png" alt="aquanet" width={80} height={30} />
            </span>{" "}
            ! Nuestro avanzado algoritmo te ayudará a encontrar la purificadora
            de tus sueños, asegurando que tu inversión esté en el lugar ideal,
            maximizando su impacto y rentabilidad. Y disfruta...
          </p>
          <p className="bonus-text">
            ¡Incluye 2 años de{" "}
            <span className="inline-logo">

              <Image src="/aquanetplus.png" alt="aquanet+" width={100} height={30} />

  
            </span>{" "}
            totalmente gratis!
          </p>
          <div className="registro-redirect">
            <Link href="/formulario">
              <button className="cta-franquicia">
                ¡QUIERO COMPRAR UNA FRANQUICIA!
              </button>
            </Link>
          </div>
          <div className="registro-redirect">
            <Link href="/comparar-franquicias">
              <button className="cta-franquicia">
                ¡CONOCE NUESTRAS FRANQUICIAS!
              </button>
            </Link>
          </div>
        </section>

        {/* Planes */}
        <section className="planes">
          <h2 className="titulo-planes">Elige tu plan</h2>
          <div className="contenedor-planes">
            <div className="card-plan">
              <ContratarPlan
                planType="monthly"
                clickFunc={() => router.push(`/payment`)}
              />
            </div>
            <div className="card-plan">
              <ContratarPlan
                planType="anual"
                clickFunc={() => router.push(`/payment`)}
              />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
