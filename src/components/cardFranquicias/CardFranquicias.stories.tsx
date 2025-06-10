import type { Meta, StoryObj } from '@storybook/react';
import CardFranquicias from './cardFranquicias'; 

const meta: Meta<typeof CardFranquicias> = {
  title: 'Componentes/Cards/CardFranquicias',
  component: CardFranquicias,
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
          'Este componente muestra una tarjeta visual para una franquicia, incluyendo título, marca, imagen y un botón para ver más detalles en un modal. Ideal para catálogos o dashboards de franquicias.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardFranquicias>;

export const Default: Story = {
  args: {
    title: 'Purificadora AquaTop',
    brand: 'AquaTech',
    year: '2023',
    description:
      'Franquicia especializada en sistemas de purificación de agua de alta tecnología. Ideal para zonas urbanas y rurales. Cuenta con soporte técnico y capacitación.',
    imageUrl: 'https://via.placeholder.com/200x200.png?text=AquaTop',
    price: '$150,000 MXN',
    size: '15 m²',
    isActive: true,
    onClick: () => console.log('Tarjeta clickeada'),
  },
};
