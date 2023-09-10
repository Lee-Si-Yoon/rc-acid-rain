import { mergeConfig } from "vite";
import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react-vite", // Your framework name here.
  core: {
    builder: "@storybook/builder-vite",
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    reactDocgen: "react-docgen",
  },
  async viteFinal(config, { configType }) {
    // Be sure to return the customized config
    return mergeConfig(config, {
      // Customize the Vite config for Storybook
      plugins: [tsconfigPaths({ root: "../" })],
    });
  },
};

export default config;
