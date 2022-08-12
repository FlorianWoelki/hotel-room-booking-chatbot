import { expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Button } from '../components/Button';

it('should render without crashing', () => {
  render(<Button>Test Button</Button>);
});

it('should render child element', () => {
  const { container } = render(<Button>Test Button</Button>);
  expect(container.firstChild?.textContent).toBe('Test Button');
});
