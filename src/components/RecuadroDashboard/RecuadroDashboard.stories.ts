// src/components/RecuadroDashboard/RecuadroDashboard.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import RecuadroDashboard from "./RecuadroDashboard";

const meta: Meta<typeof RecuadroDashboard> = {
  title: "Componentes/RecuadroDashboard",
  component: RecuadroDashboard,
  tags: ["autodocs"],
  argTypes: {
    variante: {
      control: { type: "select" },
      options: ["refacciones", "info", "ventas"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RecuadroDashboard>;

export const Refacciones: Story = {
  args: {
    variante: "refacciones",
  },
};

export const Info: Story = {
  args: {
    variante: "info",
  },
};

export const Ventas: Story = {
  args: {
    variante: "ventas",
  },
};
