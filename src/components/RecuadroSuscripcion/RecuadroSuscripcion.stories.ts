import type { Meta, StoryObj } from "@storybook/react";
import RecuadroSuscripcion from "./RecuadroSuscripcion";

const meta: Meta<typeof RecuadroSuscripcion> = {
  title: "Componentes/RecuadroSuscripcion",
  component: RecuadroSuscripcion,
  tags: ["autodocs"],
  argTypes: {
    variante: {
      control: { type: "select" },
      options: ["variant1", "variant2"],
    },
    logoSrc: { control: "text" },
    nombre: { control: "text" },
    descripcion: { control: "text" },
    botonTexto: { control: "text" },
    precio: { control: "text" },
    nota: { control: "text" },
    fechaInicio: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof RecuadroSuscripcion>;

export const Suscripcion: Story = {
  args: {
    variante: "variant1",
    logoSrc: "/aquanet_plus.png",
    nombre: "Aquanet+",
    descripcion: "Plan Mensual",
    botonTexto: "Suscribirse",
    precio: "$699.00 / mes",
    nota: "*Hasta cancelar suscripción",
    fechaInicio: "12/03/2027",
  },
};

export const CompraUnica: Story = {
  args: {
    variante: "variant2",
    logoSrc: "/aquanet_plus.png",
    nombre: "Franquicia purificadora de agua",
    descripcion: "Compra de franquicia",
    botonTexto: "Total Compra",
    precio: "$700,000.00",
  },
};
