import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import React from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Componentes/Interfaz/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
        height: '100vh',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Este componente muestra una ventana modal superpuesta con título, contenido personalizado y botones de confirmación o cierre. También adapta el contenido si el título es "Comentarios del Documento".',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const ConfirmModal: Story = {
  args: {
    title: '¿Estás seguro de eliminar este elemento?',
    onClose: () => alert('Modal cerrado'),
    onConfirm: () => alert('Confirmado'),
    children: <p>Esta acción no se puede deshacer.</p>,
  },
};

export const ComentarioDocumento: Story = {
  args: {
    title: 'Comentarios del Documento',
    onClose: () => alert('Modal de comentario cerrado'),
    onConfirm: () => {}, // No se usa en esta variante
    children: <p>El documento tiene observaciones que debes revisar.</p>,
  },
};
