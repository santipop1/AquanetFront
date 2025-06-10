import type { Meta, StoryObj } from '@storybook/react';
import { DocumentCard } from './DocumentCard';
import { FileText } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof DocumentCard> = {
  title: 'Componentes/Documentos/DocumentCard',
  component: DocumentCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f1f5f9' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Este componente permite cargar, revisar y validar documentos con estados como "aceptado", "pendiente", "error" o sin subir. Incluye manejo de comentarios del revisor y validación de duplicados.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DocumentCard>;

export const Default: Story = {
  args: {
    title: 'Documentación requerida para la franquicia',
    documents: [
      {
        icon: <FileText />,
        title: 'Identificación oficial',
        format: 'pdf',
        description: 'Documento que acredite la identidad del representante legal.',
        documentTypeId: 1,
        status: 'none',
        comments: 'Favor de verificar que el documento esté vigente.',
        skeletonUrl: 'https://www.africau.edu/images/default/sample.pdf',
      },
      {
        icon: <FileText />,
        title: 'Acta constitutiva',
        format: 'pdf',
        description: 'Documento legal de la constitución de la empresa.',
        documentTypeId: 2,
        status: 'pending',
      },
      {
        icon: <FileText />,
        title: 'Comprobante de domicilio',
        format: 'pdf',
        description: 'Recibo reciente de agua, luz o teléfono.',
        documentTypeId: 3,
        status: 'accepted',
      },
      {
        icon: <FileText />,
        title: 'Licencia de funcionamiento',
        format: 'pdf',
        description: 'Documento expedido por el municipio.',
        documentTypeId: 4,
        status: 'error',
        comments: 'El documento está incompleto o ilegible.',
      },
    ],
    onSubmit: async (files) => {
      console.log('Archivos subidos:', files);
      alert('Archivos recibidos para subir:\n' + files.map((f) => f?.name).join('\n'));
    },
    onCompleted: () => alert('Todos los documentos aceptados. Avanzando a pago...'),
  },
};
