
import {InformationField} from "@/components/InformationField/InformationField"

export default function Home() {
  return (
      <section>
        <InformationField
          variant = "text"
          label = "Texto"
        />
        <InformationField
          variant = "date"
          label = "Fecha"
        />
        <InformationField
          variant = "select"
          label = "Seleccionar"
          options={["30 mil - 50 mil", "50 mil - 1 millon"]}
        />
        <InformationField
          variant = "password"
          label = "Contraseña"
        />
        <InformationField
          variant = "readonly"
          label = "Solo leer"
          value="Prueba"
        />
      </section>
  );
}
