import type { Meta, StoryObj } from '@storybook/react';
import MapComponent from './MapComponent';

const meta: Meta<typeof MapComponent> = {
  title: 'Componentes/Mapas/MapComponent',
  component: MapComponent,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        backgroundColor: '#f9fafb',
        padding: '2rem',
        width: '100%',
      }}>
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <Story />
        </div>
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Este componente renderiza un mapa interactivo usando Mapbox GL JS. Permite centrarse en una ubicación dada (`lng`, `lat`), agregar datos GeoJSON y enfocar un área con `focusedFeature`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MapComponent>;

export const Default: Story = {
  args: {
    lng: -99.1332,
    lat: 19.4326,
    zoom: 13,
  },
};

export const WithGeoJSON: Story = {
  args: {
    lng: -99.1332,
    lat: 19.4326,
    zoom: 12,
    geojsonData: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-99.15, 19.44],
                [-99.13, 19.44],
                [-99.13, 19.42],
                [-99.15, 19.42],
                [-99.15, 19.44],
              ],
            ],
          },
          properties: {},
        },
      ],
    },
  },
};

export const WithFocusedFeature: Story = {
  args: {
    lng: -99.1332,
    lat: 19.4326,
    zoom: 12,
    geojsonData: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-99.14, 19.435],
                [-99.13, 19.435],
                [-99.13, 19.425],
                [-99.14, 19.425],
                [-99.14, 19.435],
              ],
            ],
          },
          properties: {},
        },
      ],
    },
    focusedFeature: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-99.14, 19.435],
            [-99.13, 19.435],
            [-99.13, 19.425],
            [-99.14, 19.425],
            [-99.14, 19.435],
          ],
        ],
      },
      properties: {},
    },
  },
};
