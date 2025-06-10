import type { Meta, StoryObj } from '@storybook/react';
import ClientMapWrapper from './ClientMapWrapper';

const meta: Meta<typeof ClientMapWrapper> = {
  title: 'Componentes/Mapas/ClientMapWrapper',
  component: ClientMapWrapper,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        backgroundColor: '#f9fafb',
        padding: '2rem',
      }}>
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Este componente detecta la ubicación del usuario mediante `navigator.geolocation` y la pasa a un componente de mapa (`MapComponent`). Si la geolocalización no está disponible, utiliza coordenadas de respaldo (por defecto, Ciudad de México).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClientMapWrapper>;

export const Default: Story = {
  args: {
    useGeoLocation: false, 
    fallbackCoords: { lng: -99.1332, lat: 19.4326 }, 
  },
};
