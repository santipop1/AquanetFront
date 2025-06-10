import type { Meta, StoryObj } from "@storybook/react";
import RecuadroRefacciones from "./RecuadroRefacciones";

const meta: Meta<typeof RecuadroRefacciones> = {
  title: "Componentes/RecuadroRefacciones",
  component: RecuadroRefacciones,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Este componente muestra una tabla con las refacciones de una planta de agua, indicando cuándo debe hacerse el siguiente cambio. Incluye un botón para registrar manualmente un cambio.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RecuadroRefacciones>;

export const Default: Story = {
  args: {
    waterPlantId: 1,
  },
};
