import type { Meta, StoryObj } from '@storybook/react';
import RecuadroInfo from './RecuadroInfo';
import * as service from '@/services/waterPlants';

const meta: Meta<typeof RecuadroInfo> = {
  title: 'Componentes/Franquicia/RecuadroInfo',
  component: RecuadroInfo,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      (service as any).GetPrices = async (id: number) => {
        console.log('Mock GetPrices para franquicia', id);
        return {
          pricePerJug: '30',
          pricePerLiter: '2.5',
          pricePerGallon: '10',
          rentPerMonth: '1500',
          waterPricePerBimester: '1200',
          lightPricePerBimester: '900',
          pelletsPrice: '250',
          pelletsKg: '50',
          pelletsKgPerMonth: '30'
        };
      };

      (service as any).UpdatePrices = async (data: any) => {
        alert('Precios actualizados (mock):\n' + JSON.stringify(data, null, 2));
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
    }
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Este componente muestra los precios y gastos asociados a una franquicia de purificadora. Permite editar valores y guardarlos mediante un botón, con validación y detección de cambios.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RecuadroInfo>;

export const Default: Story = {
  args: {
    franquiciaId: 1, // ✅ ID fijo para mock
  },
};
