import type { Meta, StoryObj } from '@storybook/react';
import { InformationField } from './InformationField';

// Default export
const meta = {
  title: 'Components/InformationField',
  component: InformationField,
  parameters: {
    layout: 'centered', // Opcional: centra el componente en Canvas
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InformationField>;

export default meta;

type Story = StoryObj<typeof meta>;

// Stories
export const Text: Story = {
  args: {
    variant: 'text',
    label: 'Nombre completo (como aparece en tu INE)',
    placeholder: 'Juan Pérez',
    value: '',
    onChange: () => {}, // Necesario para que no truene en Canvas
  },
};

export const Date: Story = {
  args: {
    variant: 'date',
    label: 'Fecha de nacimiento',
    value: '1992-10-01',
    onChange: () => {},
  },
};

export const Options: Story = {
  args: {
    variant: 'select',
    label: 'Seleccionar presupuesto',
    value: '',
    options: ['Menos de $10,000', '$10,000 - $50,000', 'Más de $50,000'],
    onChange: () => {},
  },
};

export const Password: Story = {
  args: {
    variant: 'password',
    label: 'Ingresar nueva contraseña',
    placeholder: '••••••••',
    value: 'password',
    onChange: () => {},
  },
};

export const ReadOnly: Story = {
  args: {
    variant: 'readonly',
    label: 'Dirección',
    value: 'Calle Ejemplo #123',
  },
};
