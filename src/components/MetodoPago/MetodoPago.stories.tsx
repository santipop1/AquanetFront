import type { Meta, StoryObj } from '@storybook/react';
import MetodoPago from './MetodoPago';

const meta: Meta<typeof MetodoPago> = {
  title: 'Componentes/Formularios/MetodoPago',
  component: MetodoPago,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9fafb',
      }}>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Este componente representa un formulario de método de pago con campos para número de tarjeta, nombre del titular, fecha de expiración y CVV. Está diseñado con un enfoque limpio, centrado y con una estética amigable.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetodoPago>;

export const Default: Story = {};
