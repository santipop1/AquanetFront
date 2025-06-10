import type { Meta, StoryObj } from '@storybook/react';
import RecuadroVentas from './RecuadroVentas';
import * as salesService from '@/services/sales';

const meta: Meta<typeof RecuadroVentas> = {
  title: 'Componentes/Franquicia/RecuadroVentas',
  component: RecuadroVentas,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      (salesService as any).getSales = async (plantId: number) => {
        console.log(`Mock getSales para planta ${plantId}`);
        return [
          {
            year: 2024,
            salesByMonth: [
              { month: 1, totalLiters: 1200 },
              { month: 2, totalLiters: 1350 },
              { month: 3, totalLiters: 1600 },
              { month: 4, totalLiters: 1800 },
              { month: 5, totalLiters: 2000 },
              { month: 6, totalLiters: 1950 },
              { month: 7, totalLiters: 2200 },
              { month: 8, totalLiters: 2100 },
              { month: 9, totalLiters: 2300 },
              { month: 10, totalLiters: 2500 },
              { month: 11, totalLiters: 2450 },
              { month: 12, totalLiters: 2600 },
            ],
          },
        ];
      };

      (salesService as any).createSale = async (data: any) => {
        alert('Venta registrada (mock):\n' + JSON.stringify(data, null, 2));
      };

      return (
        <div style={{
          backgroundColor: '#f3f4f6',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '3rem',
          paddingInline: '2rem',
        }}>
          <Story />
        </div>
      );
    }
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Este componente muestra un gráfico de barras de las ventas mensuales de una planta de agua. Permite registrar una nueva venta del mes mediante un formulario emergente.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RecuadroVentas>;

export const Default: Story = {
  args: {
    waterPlantId: 1,
  },
};
