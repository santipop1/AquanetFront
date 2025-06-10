import type { Meta, StoryObj } from '@storybook/react';
import NotificationCard from './NotificationCard';
import type { NotificationDetail } from '@/types/NotificationDetail';
import React from 'react';

const meta: Meta<typeof NotificationCard> = {
  title: 'Componentes/Notificaciones/NotificationCard',
  component: NotificationCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tarjeta visual para mostrar notificaciones con título, mensaje, tipo, estado de lectura y si es recurrente o única.',
      },
    },
  },
};

export default meta;

// Definimos un tipo auxiliar para facilitar el Template
type Props = React.ComponentProps<typeof NotificationCard>;

const Template: StoryObj<typeof NotificationCard> = {
  render: (args: Props) => <NotificationCard {...args} />,
};

export const Ejemplo = {
  ...Template,
  args: {
    notification: {
      id: 1,
      title: 'Mantenimiento programado',
      message: 'La planta será revisada el próximo lunes',
      type: 'alert',
      isRead: false,
      isRecurrent: true,
      lastSentAt: new Date().toISOString(),
    } as NotificationDetail,
    onClick: () => alert('Notificación seleccionada'),
  },
};
