import clsx from 'classnames';
import {FC, MouseEvent, useCallback, useEffect} from 'react';

import { KEY } from '@/shared/constants/keyCodes';

import './Modal.scss';

import type { DrawerProps } from './Modal.types.ts';

export const Modal: FC<DrawerProps> = ({
  children,
  className,
  onClose,
  onOverlayClick,
  isOpen = false,
}) => {
  const classes = clsx('modal', className, {
    ['modal--open']: isOpen,
  });

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY.ESC) {
        onClose?.();
      }
    },
    [onClose],
  );

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onOverlayClick?.();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <div
      className={classes}
      aria-hidden={!isOpen}
    >
      <div
        className={'modal__container'}
        role="dialog"
      >
        {children}
      </div>
      <div
        onClick={handleOverlayClick}
        className={'modal__overlay'}
      ></div>
    </div>
  );
};

Modal.displayName = 'Modal';
