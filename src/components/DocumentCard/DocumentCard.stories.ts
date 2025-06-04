import type { Meta, StoryObj } from '@storybook/react';
import { DocumentCard } from './DocumentCard';
import { FileText } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof DocumentCard> = {
  title: 'Components/DocumentCard',
  component: DocumentCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DocumentCard>;

export const Default: Story = {
  args: {
    title: 'Documentos requeridos',
    documents: [
      {
        icon: React.createElement(FileText),
        title: 'INE Frente',
        format: 'Formato: JPG o PNG',
        description: 'Fotografía legible de tu INE por el frente',
        status: 'none',
      },
      {
        icon: React.createElement(FileText),
        title: 'Comprobante de domicilio',
        format: 'Formato: PDF',
        description: 'Documento no mayor a 3 meses',
        status: 'accepted',
      },
      {
        icon: React.createElement(FileText),
        title: 'Acta constitutiva',
        format: 'Formato: PDF',
        description: 'Solo para personas morales',
        status: 'error',
        message: 'El archivo está borroso. Intenta con otra foto.',
      },
    ],
  },
};
