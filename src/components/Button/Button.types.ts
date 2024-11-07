import {ButtonHTMLAttributes, ElementType, PropsWithChildren} from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'error' | 'success';

export type ButtonProps<C extends ElementType> = {
  variant?: ButtonVariant;

  component?: C;

  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>
  & PropsWithChildren;
