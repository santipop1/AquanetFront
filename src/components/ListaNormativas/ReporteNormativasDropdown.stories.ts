import type { Meta, StoryObj } from '@storybook/react';
import { ReporteNormativasDropdown } from './ReporteNormativasDropdown';

const meta: Meta<typeof ReporteNormativasDropdown> = {
  title: 'Componentes/ReporteNormativasDropdown',
  component: ReporteNormativasDropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ReporteNormativasDropdown>;

export const Default: Story = {
  args: {},
};
