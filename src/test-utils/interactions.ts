import { fireEvent } from "@testing-library/dom";

/**
 * Fires a test event for the `click` functionality. This function simulates
 * a simple click event of a user for a specific element.
 *
 * @param element The element that will be clicked on.
 * @returns If the action was successful.
 */
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

/**
 * Fires a test event for the `mouseMove` functionality. This function simulates
 * a simple mouse move event of a user for a specific element.
 *
 * @param element The element where the mouse will be moved on.
 * @returns If the action was successful.
 */
export const mouseMove = (
  element: Document | Element | Window | Node | null,
): boolean => {
  if (element === null) {
    return false;
  }

  fireEvent.pointerMove(element);
  return fireEvent.mouseMove(element);
};

/**
 * Fires a test event for the `mouseUp` functionality. This function simulates
 * a simple mouse up event of a user for a specific element.
 *
 * @param element The element where the mouse will be moved and upped on.
 * @returns If the action was successful.
 */
export const mouseUp = (
  element: Document | Element | Window | Node | null,
): boolean => {
  if (element === null) {
    return false;
  }

  fireEvent.pointerUp(element);
  return fireEvent.mouseUp(element);
};

/**
 * Fires a test event for the `mouseDown` functionality. This function simulates
 * a simple mouse down event of a user for a specific element.
 *
 * @param element The element where the mouse will be downed on.
 * @returns If the action was successful.
 */
export const mouseDown = (
  element: Document | Element | Window | Node | null,
): boolean => {
  if (element === null) {
    return false;
  }

  fireEvent.pointerDown(element);
  return fireEvent.mouseDown(element);
};

export const keyDown = (
  element: Document | Element | Window | Node | null,
  options?: { key: string },
): boolean => {
  if (element === null) {
    return false;
  }

  return fireEvent.keyDown(element, options);
};
