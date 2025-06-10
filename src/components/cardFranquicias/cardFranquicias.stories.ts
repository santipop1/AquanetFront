import type { Meta, StoryObj } from '@storybook/react';
import CardFranquicias from './cardFranquicias';

const meta: Meta<typeof CardFranquicias> = {
  component: CardFranquicias,
  title: 'Componentes/CardFranquicias',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CardFranquicias>;

export const Default: Story = {
  args: {
    title: 'Purificadora Modelo A',
    brand: 'Aquanet',
    year: '2024',
    description: 'Sistema compacto ideal para zonas urbanas, incluye filtros de carbón activado y ozono.',
    imageUrl: '/logo.png',
    price: '$85,000',
    size: '20 m²',
    isActive: false,
  },
};

export const Activa: Story = {
  args: {
    title: 'Purificadora Recomendada',
    brand: 'EcoAqua',
    year: '2025',
    description: 'Sistema completo de ósmosis inversa con control automatizado y monitoreo en tiempo real.',
    imageUrl: '/logo.png',
    price: '$110,000',
    size: '25 m²',
    isActive: true,
  },
};
