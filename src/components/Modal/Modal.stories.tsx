import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import React, { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Componentes/Comunes/ModalConfirmación',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal reutilizable con botones de confirmación y cancelación. Adapta su contenido si el título es "Comentarios del Documento".',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const ConfirmaciónGeneral: Story = {
  render: () => {
    function ModalExample() {
      const [open, setOpen] = useState(true);
      return (
        <>
          <button onClick={() => setOpen(true)}>Abrir modal</button>
          {open && (
            <Modal
              title="¿Deseas continuar?"
              onClose={() => setOpen(false)}
              onConfirm={() => {
                alert('Confirmado');
                setOpen(false);
              }}
            >
              <p>Esta acción no se puede deshacer.</p>
            </Modal>
          )}
        </>
      );
    }
    return <ModalExample />;
  },
};

export const ComentariosDelDocumento: Story = {
  render: () => {
    function ComentarioExample() {
      const [open, setOpen] = useState(true);
      return (
        <>
          <button onClick={() => setOpen(true)}>Abrir comentarios</button>
          {open && (
            <Modal
              title="Comentarios del Documento"
              onClose={() => setOpen(false)}
              onConfirm={() => {}}
            >
              <p>Aquí puedes ver y añadir comentarios relacionados con el documento.</p>
            </Modal>
          )}
        </>
      );
    }
    return <ComentarioExample />;
  },
};
