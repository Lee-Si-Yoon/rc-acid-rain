import * as React from "react";

import { OverridableProps } from "./util-types";

/**
 * @url https://evan-moon.github.io/2020/11/28/making-your-components-extensible-with-typescript/
 */

type TextBaseProps = {
  typography?: string;
};

type TextProps<T extends React.ElementType> = OverridableProps<
  T,
  TextBaseProps
>;

function Text<T extends React.ElementType = "span">(
  { typography = "content", as, ...props }: TextProps<T>,
  ref: React.Ref<any>,
): React.JSX.Element {
  const target = as ?? "span";
  const Component = target;

  return (
    <Component ref={ref} {...props}>
      {typography}
    </Component>
  );
}

export type TextType = typeof Text;

const TextComponent = React.forwardRef(Text);

TextComponent.displayName = "Text";

export default TextComponent;
