import React from 'react';

export function createComponentContext<T>(componentName: string) {
  const Context = React.createContext<T | null>(null);

  function useComponentContext(): T {
    const ctx = React.useContext(Context);
    if (!ctx) {
      throw new Error(
        `${componentName} compound components must be used within <${componentName}>`,
      );
    }
    return ctx;
  }

  return [Context.Provider, useComponentContext, Context] as const;
}
