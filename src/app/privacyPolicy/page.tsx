import React from "react";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
    <Header />
    <main className="bg-gray-50 text-gray-800 py-10 px-6 sm:px-10 lg:px-20">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6" style={{ color: "#72AAA8" }}>
          AQUANET – Aviso de Privacidad
        </h1>
        <p className="mb-4">
          Con fundamento en los artículos 15 y 16 de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, hacemos de su conocimiento que <strong>AQUANET</strong>, plataforma digital para la adquisición y gestión de franquicias de purificadoras de agua, es responsable del tratamiento de los datos personales recabados, de su uso, resguardo y protección.
        </p>
        <p className="mb-4">
          La información personal será utilizada para las siguientes finalidades:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Registrar y autenticar usuarios en la plataforma.</li>
          <li>Mostrar información geográfica sobre franquicias mediante un mapa interactivo.</li>
          <li>Procesar pagos y formalizar contratos digitales.</li>
          <li>Validar documentos oficiales requeridos por entidades regulatorias.</li>
          <li>Emitir reportes de desempeño, análisis de rentabilidad y métricas operativas.</li>
          <li>Proporcionar asistencia técnica, notificaciones automatizadas y correos informativos.</li>
          <li>Mejorar la experiencia del usuario mediante análisis internos.</li>
          <li>Cumplir con las disposiciones legales aplicables.</li>
        </ul>
        <p className="mb-4">
          Para estas finalidades, se recabarán datos como: nombre completo, correo electrónico, contraseña cifrada, teléfono celular, CURP y/o RFC, documentos de identidad, ubicación geográfica, datos financieros, firma electrónica, historial de uso y datos de operación de franquicia.
        </p>
        <p className="mb-4">
          Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales (derechos ARCO). Para ello, envíe una solicitud al correo <a className="underline" style={{ color: "#72AAA8" }} href="mailto:aquanetsoftware@gmail.com">aquanetsoftware@gmail.com</a> con su nombre, motivo y copia de identificación oficial.
        </p>
        <p className="mb-4">
          Aquanet no transfiere información personal a terceros salvo obligación legal o requerimiento de autoridad. Los datos sensibles están protegidos mediante cifrado y medidas avanzadas.
        </p>
        <p className="mb-4">
          Este aviso podrá modificarse sin previo aviso. Las actualizaciones estarán disponibles en la plataforma.
        </p>
      </section>

      <hr className="my-12 border-t-2" style={{ borderColor: "#72AAA8" }} />

      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6" style={{ color: "#72AAA8" }}>
          EULA – Acuerdo de Licencia de Usuario Final
        </h2>
        <p className="mb-4">
          El uso de la plataforma Aquanet implica la aceptación total del presente Acuerdo. Si no estás de acuerdo con alguno de los términos aquí establecidos, deberás abstenerte de utilizarla.
        </p>
        <p className="mb-4">
          Aquanet otorga al usuario una licencia limitada, revocable, no exclusiva e intransferible para acceder y utilizar la plataforma con fines legítimos relacionados con la consulta, adquisición o gestión de franquicias.
        </p>
        <p className="mb-4">
          Está prohibido compartir credenciales, modificar el software, hacer ingeniería inversa o usar la plataforma para fines ilícitos.
        </p>
        <p className="mb-4">
          Todos los derechos sobre marca, diseño, código y contenido pertenecen a Aquanet. El uso no autorizado será considerado una infracción.
        </p>
        <p className="mb-4">
          Aquanet podrá suspender cuentas por incumplimientos o vulneraciones de seguridad, sin previo aviso.
        </p>
        <p className="mb-4">
          El servicio se ofrece "tal cual", sin garantías implícitas. Aquanet no se hace responsable de fallos, interrupciones o pérdidas derivadas del uso.
        </p>
        <p className="mb-4">
          Este acuerdo y el aviso de privacidad pueden modificarse. El uso continuo implica aceptación de dichas modificaciones.
        </p>
      </section>
    </main>
    <Footer />
    </>
  );
};

export default PrivacyPolicy;
