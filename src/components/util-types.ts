import * as React from "react";

type Combine<T, K> = T & Omit<K, keyof T>;

type CombineElementProps<T extends React.ElementType, K = unknown> = Combine<
  K,
  React.ComponentPropsWithoutRef<T>
>;

type OverridableProps<T extends React.ElementType, K = unknown> = {
  as?: T;
} & CombineElementProps<T, K>;

export { OverridableProps, CombineElementProps, Combine };
