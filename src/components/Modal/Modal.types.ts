import { PropsWithChildren } from 'react';

export type DrawerProps = {
  onClose?: () => void;

  onOverlayClick?: () => void;

  isOpen?: boolean;

  className?: string;
} & PropsWithChildren;
