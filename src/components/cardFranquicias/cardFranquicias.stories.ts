import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CardFranquicias from './cardFranquicias';

const meta: Meta<typeof CardFranquicias> = {
  title: 'Components/CardFranquicias',
  component: CardFranquicias,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CardFranquicias>;

export const Default: Story = {
  args: {
    pretitle: 'Pretitle',
    title: 'Card component',
    description: 'A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, contextual background colors and powerful display options.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    onPrimaryClick: () => alert('Primary clicked'),
    onSecondaryClick: () => alert('Secondary clicked'),
  },
};
