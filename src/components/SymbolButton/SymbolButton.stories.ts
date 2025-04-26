import type { Meta, StoryObj } from '@storybook/react';
import { SymbolButton } from './SymbolButton';

const meta = {
  title: 'Components/SymbolButton',
  component: SymbolButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SymbolButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const User: Story = {
  args: {
    variant: 'user',
  },
};

export const Back: Story = {
  args: {
    variant: 'back',
  },
};

export const Download: Story = {
  args: {
    variant: 'download',
  },
};

export const Edit: Story = {
  args: {
    variant: 'edit',
  },
};

export const Calendar: Story = {
  args: {
    variant: 'calendar',
  },
};

export const ArrowDown: Story = {
  args: {
    variant: 'arrow-down',
  },
};

export const Add: Story = {
  args: {
    variant: 'add',
  },
};

export const OpenedEye: Story = {
  args: {
    variant: 'opened-eye',
  },
};

export const ClosedEye: Story = {
  args: {
    variant: 'closed-eye',
  },
};
