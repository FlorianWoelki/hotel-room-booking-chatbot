import * as yup from 'yup';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { InputField } from '../components/InputField';

it('should run without crashing', () => {
  render(<InputField />);
});

it('should set `isValid` to true when `validation` prop is undefined', () => {
  const { container } = render(
    <InputField validation={undefined}>
      {({ isValid }) => (isValid ? <p>Valid</p> : <p>Not Valid</p>)}
    </InputField>,
  );

  fireEvent.change(container.querySelector('input')!, {
    target: { value: 'Test' },
  });
  expect(container.querySelector('p')?.textContent).toBe('Valid');
});

it('should set `isValid` to true when `validation` prop is email and value is an email', async () => {
  const email = yup.string().email().required();
  const { container } = render(
    <InputField validation={email}>
      {({ isValid }) => (isValid ? <p>Valid</p> : <p>Not Valid</p>)}
    </InputField>,
  );

  fireEvent.change(container.querySelector('input')!, {
    target: { value: 'test@test.de' },
  });

  await waitFor(() => {
    expect(container.querySelector('p')?.textContent).toBe('Valid');
  });
});

it('should set `isValid` to false when `validation` prop is email but value is not an email', () => {
  const email = yup.string().email().required();
  const { container } = render(
    <InputField validation={email}>
      {({ isValid }) => (isValid ? <p>Valid</p> : <p>Not Valid</p>)}
    </InputField>,
  );

  fireEvent.change(container.querySelector('input')!, {
    target: { value: 'Test' },
  });
  expect(container.querySelector('p')?.textContent).toBe('Not Valid');
});
