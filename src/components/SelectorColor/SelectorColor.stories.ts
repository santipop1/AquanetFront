import type { Meta, StoryObj } from "@storybook/react";
import SelectorColor from "./SelectorColor";

const meta: Meta<typeof SelectorColor> = {
  title: "Componentes/SelectorColor",
  component: SelectorColor,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SelectorColor>;

export const Default: Story = {
  args: {},
};
