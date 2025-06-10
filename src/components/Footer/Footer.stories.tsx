import type { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Componentes/Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f3f4f6',
      }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Este componente representa el pie de página de Aquanet. Contiene el logo, enlaces de navegación y redes sociales. Es adaptable a distintos tamaños de pantalla gracias al uso de `grid`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
