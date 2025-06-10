import type { Meta, StoryObj } from '@storybook/react';
import ContratarPlan from './ContratarPlan';

const meta: Meta<typeof ContratarPlan> = {
  title: 'Componentes/Planes/ContratarPlan',
  component: ContratarPlan,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f1f5f9' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Este componente muestra una tarjeta de suscripción para un plan mensual o anual. Ofrece distintas variantes visuales como default, small y subscribed. Incluye botones de acción como "Contratar", "Cambiar método de pago" o "Cancelar suscripción".',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContratarPlan>;

export const MensualDefault: Story = {
  args: {
    variant: 'default',
    planType: 'monthly',
    size: 'default',
    clickFunc: () => alert('Plan mensual contratado'),
  },
};

export const AnualDefault: Story = {
  args: {
    variant: 'default',
    planType: 'anual',
    size: 'default',
    clickFunc: () => alert('Plan anual contratado'),
  },
};

export const MensualSmall: Story = {
  args: {
    variant: 'default',
    planType: 'monthly',
    size: 'small',
    clickFunc: () => alert('Plan mensual pequeño contratado'),
  },
};

export const SubscribedPlan: Story = {
  args: {
    variant: 'subscribed',
    planType: 'anual',
    size: 'default',
  },
};
