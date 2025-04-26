import type { Meta, StoryObj } from "@storybook/react";
import RecuadroFranquicias from "./RecuadroFranquicias";

const meta: Meta<typeof RecuadroFranquicias> = {
  title: "Componentes/RecuadroFranquicias",
  component: RecuadroFranquicias,
  tags: ["autodocs"],
  argTypes: {
    nombre: { control: "text" },
    logoSrc: { control: "text" },
    onEditar: { action: "editarClicked" },
  },
};

export default meta;
type Story = StoryObj<typeof RecuadroFranquicias>;

export const Default: Story = {
  args: {
    nombre: "Agua Pura CDMX",
    logoSrc: "/gotita.png",
  },
};
