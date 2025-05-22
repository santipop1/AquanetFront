import type { Meta, StoryObj } from '@storybook/react';
import NotificationForm from './NewNotification';

const meta: Meta<typeof NotificationForm> = {
  title: 'Componentes/NotificationForm',
  component: NotificationForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof NotificationForm>;

export const Default: Story = {};
