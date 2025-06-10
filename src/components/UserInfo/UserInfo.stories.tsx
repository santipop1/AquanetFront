import type { Meta, StoryObj } from '@storybook/react';
import UserInfo from './UserInfo';
import { User } from '@/types/User';

const meta: Meta<typeof UserInfo> = {
  title: 'Componentes/Admin/UserInfo',
  component: UserInfo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserInfo>;

export const Default: Story = {
  args: {
    user: {
      id: 1,
      firstName: 'Juan',
      middleName: 'Carlos',
      firstLastName: 'Pérez',
      secondLastName: 'López',
      firebaseId: 'abc123',
      birthday: new Date('1990-05-15'),
      phoneNumber: '5551234567',
      curp: 'JCPA900515HDFRZN01',
      rfc: 'JCPA900515ABC',
      profilePictureUrl: '',
      role: {
        id: 1,
        name: 'admin',
        gatename: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
};
