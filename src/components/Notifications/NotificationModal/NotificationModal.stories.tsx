import type { Meta, StoryObj } from '@storybook/react';
import NotificationModal from './NotificationModal';
import { NotificationDetail } from '@/types/NotificationDetail';

const mockNotification: NotificationDetail = {
  id: 1,
  title: 'Recordatorio de mantenimiento',
  message: 'No olvides revisar el sistema de filtrado de agua este viernes.',
  type: 'notification',
  isRead: false,
  isEmail: false,
  isPushNotification: true,
  isRecurrent: true,
  recurrenceIntervalValue: 1,
  recurrenceEndType: 'fecha',
  recurrenceCount: 5,
  createdAt: new Date().toISOString(),
  updatedAt: null,
  sentAt: null,
  lastSentAt: new Date().toISOString(),
  nextScheduledAt: null,
  recurrenceEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  senderUser: {
    id: 1,
    firebaseId: 'sender-firebase-id'
  },
  receiverUser: {
    id: 2,
    firebaseId: 'receiver-firebase-id'
  }
};

const meta: Meta<typeof NotificationModal> = {
  title: 'Componentes/NotificationModal',
  component: NotificationModal,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', backgroundColor: '#e6f0ef' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Muestra una notificación ampliada en forma de modal, incluyendo título, mensaje, tipo, hora y posible fecha de finalización.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NotificationModal>;

export const Default: Story = {
  args: {
    notification: mockNotification,
    onClose: () => alert('Modal cerrado'),
  },
};
