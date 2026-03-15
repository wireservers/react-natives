import { createContext, useContext, useEffect } from 'react';

interface ExampleCodeContextValue {
  setCode: (code: string) => void;
}

export const ExampleCodeContext = createContext<ExampleCodeContextValue>({
  setCode: () => {},
});

/** Call from example components to push dynamic code to the Code tab. */
export function useExampleCode(code: string, deps: unknown[]) {
  const { setCode } = useContext(ExampleCodeContext);
  useEffect(() => {
    setCode(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
