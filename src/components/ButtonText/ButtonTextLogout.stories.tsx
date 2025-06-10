import type { Meta, StoryObj } from '@storybook/react';
import { ButtonTextLogout } from './ButtonTextLogout';

const meta: Meta<typeof ButtonTextLogout> = {
  title: 'Componentes/Botones/ButtonTextLogout',
  component: ButtonTextLogout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Este botón se utiliza para cerrar sesión. Es de color rojo, con estilo redondeado y ocupa el ancho completo disponible. Incluye un evento opcional al hacer clic.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonTextLogout>;

export const Default: Story = {
  args: {
    label: 'Cerrar sesión',
    onClick: () => alert('Sesión cerrada'),
  },
};
