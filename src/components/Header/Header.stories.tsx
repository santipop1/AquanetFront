import type { Meta, StoryObj } from '@storybook/react';
import HeaderMini from './Header';
import React from 'react';
import * as nextNavigation from 'next/navigation';
import * as authProvider from '@/providers/AuthProvider';

const mockRouter = {
  push: (url: string) => alert(`Redirigiendo a: ${url}`),
};

const meta: Meta<typeof HeaderMini> = {
  title: 'Componentes/Layout/Header',
  component: HeaderMini,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      (nextNavigation as any).usePathname = () => '/';
      (nextNavigation as any).useRouter = () => mockRouter;
      (authProvider as any).UseAuth = () => ({
        user: { name: 'Usuario de prueba', id: 1 },
        logout: () => alert('Sesión cerrada'),
      });

      return (
        <div style={{ width: '100%', backgroundColor: '#f1f5f9', paddingTop: '2rem' }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Este componente representa la cabecera principal del sitio Aquanet. Contiene el logo, enlaces de navegación, símbolo de usuario y funciones de sesión. Adaptable a móviles y tablets.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeaderMini>;

export const Default: Story = {};
