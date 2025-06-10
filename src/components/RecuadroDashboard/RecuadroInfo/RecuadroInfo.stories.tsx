import type { Meta, StoryObj } from '@storybook/react';
import RecuadroInfo from './RecuadroInfo';

const meta: Meta<typeof RecuadroInfo> = {
  title: 'Componentes/RecuadroInfo',
  component: RecuadroInfo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', backgroundColor: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Formulario de edición de precios y gastos de una franquicia. Permite actualizar los valores como precio por litro, garrafón, renta mensual, entre otros.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof RecuadroInfo>;

export const Default: Story = {
  args: {
    franquiciaId: 1,
  },
};
