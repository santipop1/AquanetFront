import type { Meta, StoryObj } from "@storybook/react";
import RestablecerContrasena from "./RestablecerContrasena";

const meta: Meta<typeof RestablecerContrasena> = {
  title: "Componentes/RestablecerContrasena",
  component: RestablecerContrasena,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RestablecerContrasena>;

export const Default: Story = {
  args: {},
};
