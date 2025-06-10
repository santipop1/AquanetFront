import type { Meta, StoryObj } from '@storybook/react';
import { InformationField } from './InformationField';
import React, { useState } from 'react';

const meta: Meta<typeof InformationField> = {
  title: 'Componentes/Formularios/InformationField',
  component: InformationField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ width: '300px' }}>
          <Story />
        </div>
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Este componente representa un campo de formulario versátil. Soporta texto, fechas, selección (select), contraseñas con vista previa y campos de solo lectura. Ideal para formularios complejos y adaptables.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InformationField>;

export const Text: Story = {
  args: {
    variant: 'text',
    label: 'Nombre completo',
    placeholder: 'Escribe tu nombre',
    value: 'Juan Pérez',
    onChange: (val) => console.log('Texto:', val),
  },
};

export const Date: Story = {
  args: {
    variant: 'date',
    label: 'Fecha de nacimiento',
    value: '2000-01-01',
    onChange: (val) => console.log('Fecha:', val),
  },
};

export const Select: Story = {
  args: {
    variant: 'select',
    label: 'Selecciona tu estado',
    value: '',
    options: [
      { label: 'CDMX', value: 1 },
      { label: 'Jalisco', value: 2 },
      { label: 'Nuevo León', value: 3 },
    ],
    onChange: (val) => console.log('Opción:', val),
  },
};

export const Password: Story = {
  args: {
    variant: 'password',
    label: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    value: '12345678',
    onChange: (val) => console.log('Contraseña:', val),
  },
};

export const Readonly: Story = {
  args: {
    variant: 'readonly',
    label: 'Correo registrado',
    value: 'usuario@ejemplo.com',
  },
};
