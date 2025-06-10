import type { Meta, StoryObj } from "@storybook/react";
import RecuadroVentas from "./RecuadroVentas";

const meta: Meta<typeof RecuadroVentas> = {
  title: "Componentes/RecuadroVentas",
  component: RecuadroVentas,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Este componente muestra un gráfico de barras con las ventas proyectadas mensuales por año de una planta de agua. Permite seleccionar el año y registrar nuevas ventas a través de un formulario emergente.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RecuadroVentas>;

export const Default: Story = {
  args: {
    waterPlantId: 1,
  },
};
