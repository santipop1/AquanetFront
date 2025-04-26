import type { Meta, StoryObj } from "@storybook/react";
import MetodoPago from "./MetodoPago";

const meta: Meta<typeof MetodoPago> = {
  title: "Componentes/MetodoPago",
  component: MetodoPago,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MetodoPago>;

export const Default: Story = {
  args: {},
};
