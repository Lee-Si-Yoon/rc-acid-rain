import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// import Typing, { TypingProps } from "../src/components/typing";
import TypingGame from "./typing/typing-game";

const meta = {
  component: TypingGame,
} satisfies Meta<typeof TypingGame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
