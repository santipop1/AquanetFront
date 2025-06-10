import type { Meta, StoryObj } from '@storybook/react';
import EditableFranquiciaCard from './EditableFranquiciaCard';

const meta: Meta<typeof EditableFranquiciaCard> = {
  title: 'Componentes/Formularios/EditableFranquiciaCard',
  component: EditableFranquiciaCard,
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
          'Este componente permite editar los datos de una franquicia en un formulario. Muestra campos como nombre, descripción, tamaño, precio y más. Ideal para paneles de administración o dashboards.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EditableFranquiciaCard>;

export const Default: Story = {
  args: {
    franquicia: {
      id: 1,
      name: 'AquaPlus Pro',
      description: 'Franquicia con sistema de ósmosis inversa avanzada y soporte técnico 24/7.',
      company_id: 101,
      price: 200000,
      size_m2: 20,
      tank_cleaning_freq_months: 3,
      osmosis: true,
    },
    onClose: () => alert('Modal cerrado'),
    onSaved: (updated) => alert('Cambios guardados:\n' + JSON.stringify(updated, null, 2)),
  },
};

