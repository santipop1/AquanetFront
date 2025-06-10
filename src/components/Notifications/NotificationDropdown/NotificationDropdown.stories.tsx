import type { Meta, StoryObj } from '@storybook/react';
import { NotificationDropdown } from './NotificationDropdown';

const meta: Meta<typeof NotificationDropdown> = {
  title: 'Componentes/NotificationDropdown',
  component: NotificationDropdown,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Este componente muestra un botón de notificaciones que al hacer hover despliega una lista con notificaciones obtenidas desde el servidor. Ideal para dashboards o paneles administrativos.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NotificationDropdown>;

export const Default: Story = {};
