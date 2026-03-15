import { useCallback, useRef } from 'react';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

/**
 * Hook that returns pointer event handler props to spread on a View.
 * Uses React synthetic pointer events (supported by RN Web) instead of
 * native DOM listeners, avoiding ref-timing and Responder-system issues.
 *
 * Uses setPointerCapture via e.currentTarget so drags that leave the
 * element still fire. Manages cursor: restCursor -> grab (near handle) -> grabbing (dragging).
 */
export function usePointerDrag(
  onDrag: (relX: number, relY: number) => void,
  isNearHandle: (relX: number, relY: number) => boolean,
  restCursor: string = 'default',
) {
  const dragCb = useRef(onDrag);
  dragCb.current = onDrag;
  const hitTestCb = useRef(isNearHandle);
  hitTestCb.current = isNearHandle;
  const dragging = useRef(false);

  const onPointerDown = useCallback((e: any) => {
    e.preventDefault();
    const el = e.currentTarget;
    if (el?.setPointerCapture) {
      el.setPointerCapture(e.pointerId);
    }
    if (el?.style) el.style.cursor = 'grabbing';
    dragging.current = true;
    const rect = el?.getBoundingClientRect?.();
    if (rect) {
      dragCb.current(e.clientX - rect.left, e.clientY - rect.top);
    }
  }, []);

  const onPointerMove = useCallback((e: any) => {
    const el = e.currentTarget;
    const rect = el?.getBoundingClientRect?.();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (dragging.current) {
      dragCb.current(x, y);
    } else if (el?.style) {
      el.style.cursor = hitTestCb.current(x, y) ? 'grab' : restCursor;
    }
  }, [restCursor]);

  const onPointerUp = useCallback((e: any) => {
    dragging.current = false;
    const el = e.currentTarget;
    if (el?.releasePointerCapture) {
      try { el.releasePointerCapture(e.pointerId); } catch (_) { /* already released */ }
    }
    const rect = el?.getBoundingClientRect?.();
    if (rect && el?.style) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.cursor = hitTestCb.current(x, y) ? 'grab' : restCursor;
    }
  }, [restCursor]);

  const onContextMenu = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  if (!isWeb) return { handlers: {} };

  return {
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onContextMenu,
    },
  };
}
