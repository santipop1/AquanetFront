import type { Meta, StoryObj } from '@storybook/react';
import { ProfilePicture } from './ProfilePicture';

// Default export
const meta = {
  title: 'Components/ProfilePicture',
  component: ProfilePicture,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfilePicture>;

export default meta;

type Story = StoryObj<typeof meta>;

// Stories
export const WithPicture: Story = {
  args: {
    picture: 'https://e.rpp-noticias.io/xlarge/2025/01/10/275427_1691067.webp', // Imagen de ejemplo
  },
};

export const WithoutPicture: Story = {
  args: {
    picture: undefined, // Para mostrar el icono por defecto
  },
};
