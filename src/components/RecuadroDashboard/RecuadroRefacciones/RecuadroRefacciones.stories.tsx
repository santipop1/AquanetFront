import type { Meta, StoryObj } from '@storybook/react';
import RecuadroRefacciones from './RecuadroRefacciones';
import * as sparePartsService from '@/services/spareParts';

const meta: Meta<typeof RecuadroRefacciones> = {
  title: 'Componentes/Franquicia/RecuadroRefacciones',
  component: RecuadroRefacciones,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      (sparePartsService as any).getSpareParts = async (plantId: number) => {
        console.log(`Mock getSpareParts para planta ${plantId}`);
        return [
          {
            id: 1,
            name: 'Filtro de Carbón Activado',
            nextChangeDate: new Date(Date.now() + 20 * 86400000).toISOString(), 
          },
          {
            id: 2,
            name: 'Membrana de osmosis',
            nextChangeDate: new Date(Date.now() + 75 * 86400000).toISOString(), 
          },
          {
            id: 3,
            name: 'UV',
            nextChangeDate: null, 
          },
        ];
      };

      (sparePartsService as any).UpdatedSparePart = async (id: number) => {
        alert(`Cambio registrado para refacción ID ${id} (mock)`);
      };

      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: '100vh',
          backgroundColor: '#f3f4f6',
          padding: '2rem'
        }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Este componente muestra las refacciones asociadas a una planta de agua, incluyendo el tiempo estimado para el siguiente cambio y un botón para registrar dicho cambio. Se adapta a modo claro y oscuro.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RecuadroRefacciones>;

export const Default: Story = {
  args: {
    waterPlantId: 1, 
  },
};
