import React from 'react';
import type { PortalProps } from './types';

export function Portal({ children }: PortalProps) {
  return <>{children}</>;
}

Portal.displayName = 'Portal';
