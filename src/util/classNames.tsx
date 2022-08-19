/**
 * Transforms the specified classes to a one line string.
 *
 * @param {(false | null | undefined | string)[]} classes The classes as a string or condition.
 * @returns {string} The conditional joined together class name string.
 */
export const classNames = (
  ...classes: (false | null | undefined | string)[]
): string => classes.filter(Boolean).join(' ');
