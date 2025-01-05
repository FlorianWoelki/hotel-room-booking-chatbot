/**
 * Transforms the specified classes to a one line string.
 *
 * @param classes The classes as a string or condition.
 * @returns The conditional joined together class name string.
 */
export const classNames = (
  ...classes: (false | null | undefined | string)[]
): string => classes.filter(Boolean).join(" ");
