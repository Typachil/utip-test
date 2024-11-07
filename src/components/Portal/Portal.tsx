'use client';

import { FC, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import type { PortalProps } from './Portal.types';

export const Portal: FC<PortalProps> = ({ children, wrapperId = 'drawer-portal' }) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  const createPortalWrapper = ((wrapperId: string): HTMLElement => {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);

    return wrapperElement;
  })

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = createPortalWrapper(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

Portal.displayName = 'Portal';
