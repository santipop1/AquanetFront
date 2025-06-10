import type { Meta, StoryObj } from '@storybook/react';
import { ReporteNormativasDropdown } from './ReporteNormativasDropdown';

const meta: Meta<typeof ReporteNormativasDropdown> = {
  title: 'Componentes/Popups/ReporteNormativasDropdown',
  component: ReporteNormativasDropdown,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f3f4f6'
      }}>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Este componente muestra un botón que al hacer clic despliega un popup con un reporte de cumplimiento de normativas sanitarias y ambientales vigentes. Ideal para validaciones dentro de la plataforma Aquanet.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReporteNormativasDropdown>;

export const Default: Story = {};
