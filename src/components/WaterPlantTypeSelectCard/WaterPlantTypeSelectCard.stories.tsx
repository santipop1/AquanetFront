import type { Meta, StoryObj } from '@storybook/react';
import WaterPlantTypeSelectCard from './WaterPlantTypeSelectCard';
import type { WaterPlantType } from '@/types/WaterPlantType';

const meta: Meta<typeof WaterPlantTypeSelectCard> = {
  title: 'Componentes/Franquicias/WaterPlantTypeSelectCard',
  component: WaterPlantTypeSelectCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof WaterPlantTypeSelectCard>;

const mockData: Partial<WaterPlantType> & {
  userFirstName: string;
  userProfilePictureUrl: string;
} = {
  id: 1,
  name: 'Tipo Premium',
  description: 'Sistema completo de purificación con osmosis inversa.',
  price: 125000,
  sizeM2: 25,
  userFirstName: 'Aquanet',
  userProfilePictureUrl: '/logo.png',
};

export const Default: Story = {
  args: {
    waterPlantType: mockData as any,
    isRecommended: false,
    clickFunc: () => alert('Seleccionado'),
  },
};

export const Recommended: Story = {
  args: {
    waterPlantType: mockData as any,
    isRecommended: true,
    clickFunc: () => alert('Seleccionado recomendado'),
  },
};
