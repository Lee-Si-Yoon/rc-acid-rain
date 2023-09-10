import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import Text from "../src/components/polymorphic-button";

const meta: Meta<typeof Text> = {
  component: Text,
};

export default meta;

type Story = StoryObj<typeof Text>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <Text />,
};
