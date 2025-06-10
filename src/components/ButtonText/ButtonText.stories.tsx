// components/FancyButton/FancyButton.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonText } from './ButtonText';

const meta: Meta<typeof ButtonText> = {
  title: 'Example/ButtonText',
  component: ButtonText,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof ButtonText>;

export const Variante1: Story = {
  args: {
    variant: 'variant1',
    label: 'Seleccionar',
  },
};

export const Variante2: Story = {
  args: {
    variant: 'variant2',
    label: 'Seleccionar',
  },
};

export const Variante3: Story = {
  args: {
    variant: 'variant3',
    label: 'Seleccionar',
  },
};

export const Variante4: Story = {
  args: {
    variant: 'variant4',
    label: 'Contratar',
  },
};

export const Variante5: Story = {
  args: {
    variant: 'variant5',
    label: 'Borrar franquicia',
  },
};
