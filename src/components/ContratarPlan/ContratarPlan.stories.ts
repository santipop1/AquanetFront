import type { Meta, StoryObj } from "@storybook/react";
import ContratarPlan from "./ContratarPlan";

const meta: Meta<typeof ContratarPlan> = {
  title: "Componentes/ContratarPlan",
  component: ContratarPlan,
  tags: ["autodocs"],
  argTypes: {
    titulo: { control: "text" },
    precio: { control: "text" },
    periodicidad: { control: "text" },
    notaAdicional: { control: "text" },
    onContratar: { action: "contratar" },
  },
};

export default meta;
type Story = StoryObj<typeof ContratarPlan>;

export const PlanMensual: Story = {
  args: {
    titulo: "Plan Mensual",
    precio: "$699",
    periodicidad: "al mes",
  },
};

export const PlanAnual: Story = {
  args: {
    titulo: "Plan Anual",
    precio: "$579",
    periodicidad: "al mes",
    notaAdicional: "un solo pago de $6948",
  },
};
