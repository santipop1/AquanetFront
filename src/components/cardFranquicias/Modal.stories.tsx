import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import React, { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Componentes/Comunes/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente modal reutilizable. Permite mostrar contenido emergente sobre una capa de fondo oscura. Se cierra al hacer clic fuera del contenido o en el botón de cierre.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button onClick={() => setOpen(true)}>Abrir modal</button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <h2 style={{ marginBottom: '1rem' }}>Título del Modal</h2>
          <p>Este es un contenido de ejemplo dentro del modal.</p>
        </Modal>
      </>
    );
  },
};
