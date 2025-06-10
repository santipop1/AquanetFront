import type { Meta, StoryObj } from "@storybook/react";
import ResetPassword from "./ResetPassword";

const meta: Meta<typeof ResetPassword> = {
  title: "Componentes/ResetPassword",
  component: ResetPassword,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Este componente muestra un modal para restablecer la contraseña de usuario mediante correo electrónico. Incluye un campo para ingresar el correo, validación y retroalimentación del estado del envío.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ResetPassword>;

export const Default: Story = {
  args: {
    onClose: () => alert("Modal cerrado"),
    emailDefault: "ejemplo@correo.com",
  },
};
