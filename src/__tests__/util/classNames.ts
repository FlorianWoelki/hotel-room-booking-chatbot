import { classNames } from '../../util/classNames';

it('should return only the string', () => {
  expect(classNames('text-red-400 bg-red-500')).toBe('text-red-400 bg-red-500');
});

it('should return an additional string when conditional is true', () => {
  expect(classNames('text-red-400 bg-red-500', true && 'text-green-400')).toBe(
    'text-red-400 bg-red-500 text-green-400',
  );
});

it('should not return an additional string when conditional is false', () => {
  expect(classNames('text-red-400 bg-red-500', false && 'text-green-400')).toBe(
    'text-red-400 bg-red-500',
  );
});
