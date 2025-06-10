import type { Meta, StoryObj } from '@storybook/react';
import CreateFranquiciaCard from './CreateFranquiciaCard';

const meta: Meta<typeof CreateFranquiciaCard> = {
  title: 'Componentes/Formularios/CreateFranquiciaCard',
  component: CreateFranquiciaCard,
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
        component:
          'Este componente muestra un formulario para registrar una nueva franquicia. Incluye validaciones básicas, opciones de osmosis, y campos como precio, tamaño y frecuencia de limpieza del tanque.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CreateFranquiciaCard>;

export const Default: Story = {
  args: {
    onClose: () => alert('Formulario cerrado'),
    onCreated: () => alert('Franquicia creada'),
  },
};
