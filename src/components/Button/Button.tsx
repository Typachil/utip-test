import clsx from 'classnames';

import './Button.scss';

import type { ButtonProps } from './Button.types';
import {ComponentProps, ElementType} from "react";

export const Button = <C extends ElementType = 'button'>(
    props: ButtonProps<C> & Omit<ComponentProps<C>, keyof ButtonProps<C>>,
) => {
  const {
    children,
    variant = 'primary',
    className = '',
    component: Component = 'button',
    ...rest
  } = props;
  const classes = clsx('button', `button--${variant}`, className);

  return (
    <Component
      className={classes}
      {...rest}
    >
      {children}
    </Component>
  );
};

Button.displayName = 'Button';
