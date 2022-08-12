import { fireEvent } from '@testing-library/dom';

export const click = (
  element: Document | Element | Window | Node | null,
): boolean => {
  if (element === null) {
    return false;
  }

  if (element instanceof HTMLButtonElement && element.disabled) {
    return false;
  }

  let cancelled = !fireEvent.pointerDown(element);
  if (!cancelled) {
    cancelled = !fireEvent.mouseDown(element);
  }

  fireEvent.pointerUp(element);
  if (!cancelled) {
    fireEvent.mouseUp(element);
  }

  return fireEvent.click(element);
};

export const mouseMove = (
  element: Document | Element | Window | Node | null,
): boolean => {
  if (element === null) {
    return false;
  }

  fireEvent.pointerMove(element);
  return fireEvent.mouseMove(element);
};

export const mouseUp = (
  element: Document | Element | Window | Node | null,
): boolean => {
  if (element === null) {
    return false;
  }

  fireEvent.pointerUp(element);
  return fireEvent.mouseUp(element);
};

export const mouseDown = (
  element: Document | Element | Window | Node | null,
): boolean => {
  if (element === null) {
    return false;
  }

  fireEvent.pointerDown(element);
  return fireEvent.mouseDown(element);
};
