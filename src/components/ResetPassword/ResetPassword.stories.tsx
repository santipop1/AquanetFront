import type { Meta, StoryObj } from '@storybook/react';
import ResetPassword from './ResetPassword';

const meta: Meta<typeof ResetPassword> = {
  title: 'Componentes/Modales/ResetPassword',
  component: ResetPassword,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal para enviar un correo de restablecimiento de contraseña usando Firebase Auth.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResetPassword>;

export const Default: Story = {
  args: {
    onClose: () => alert('Modal cerrado'),
    emailDefault: 'ejemplo@correo.com',
  },
};
