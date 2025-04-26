import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ClientMapWrapper from './ClientMapWrapper';

const meta: Meta<typeof ClientMapWrapper> = {
  title: 'Components/Map',
  component: ClientMapWrapper,
  tags: ['autodocs'],
  argTypes: {
    useGeoLocation: { control: 'boolean' },
    fallbackCoords: {
      control: 'object',
      defaultValue: { lng: -99.1332, lat: 19.4326 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ClientMapWrapper>;

export const Default: Story = {
  args: {
    useGeoLocation: true,
  },
};

export const CDMXFallback: Story = {
  args: {
    useGeoLocation: false,
    fallbackCoords: { lng: -99.1332, lat: 19.4326 },
  },
};

export const Monterrey: Story = {
  args: {
    useGeoLocation: false,
    fallbackCoords: { lng: -100.3161, lat: 25.6866 },
  },
};
