import type { Meta, StoryObj } from '@storybook/react';
import CreateFranquiciaCard from './CreateFranquiciaCard';
import React from 'react';

const meta: Meta<typeof CreateFranquiciaCard> = {
  title: 'Componentes/Franquicias/CreateFranquiciaCard',
  component: CreateFranquiciaCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Formulario para crear una nueva franquicia. Incluye campos como nombre, descripción, precio, tamaño, frecuencia de limpieza y si cuenta con osmosis.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CreateFranquiciaCard>;

export const Default: Story = {
  args: {
    onClose: () => alert('Cancelado'),
    onCreated: () => alert('Franquicia creada'),
  },
};
