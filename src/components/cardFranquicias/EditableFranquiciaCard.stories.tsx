import type { Meta, StoryObj } from '@storybook/react';
import EditableFranquiciaCard from './EditableFranquiciaCard';
import React from 'react';

const meta: Meta<typeof EditableFranquiciaCard> = {
  title: 'Componentes/Franquicias/EditableFranquiciaCard',
  component: EditableFranquiciaCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Formulario para editar una franquicia existente. Permite modificar atributos como nombre, descripción, precio, tamaño, compañía, frecuencia de limpieza y si tiene osmosis.',
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
      name: 'Franquicia de prueba',
      description: 'Descripción de ejemplo',
      price: 12345,
      size_m2: 20,
      tank_cleaning_freq_months: 6,
      osmosis: true,
      company_id: 2,
    },
    onClose: () => alert('Edición cancelada'),
    onSaved: (updated: any) => alert('Franquicia actualizada: ' + JSON.stringify(updated)),
  },
};
