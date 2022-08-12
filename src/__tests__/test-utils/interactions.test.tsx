import { render } from '@testing-library/react';
import {
  click,
  mouseDown,
  mouseMove,
  mouseUp,
} from '../../test-utils/interactions';

type Event = 'onClick' | 'onMouseMove' | 'onMouseUp' | 'onMouseDown';
interface EventOptions {
  fn: (element: Document | Element | Window | Node | null) => boolean;
  checkDisabled?: boolean;
}

const events: { [K in Event]: EventOptions } = {
  onClick: {
    fn: click,
    checkDisabled: true,
  },
  onMouseMove: {
    fn: mouseMove,
  },
  onMouseUp: {
    fn: mouseUp,
  },
  onMouseDown: {
    fn: mouseDown,
  },
};

Object.entries(events).forEach(([eventName, options]) => {
  describe(eventName, () => {
    it('should not fire when element is `null`', () => {
      const { container } = render(<></>);
      expect(options.fn(container.firstChild)).toBe(false);
    });

    if (options.checkDisabled) {
      it('should not fire when element is `disabled`', () => {
        const event = jest.fn();
        const { container } = render(
          <button {...{ [eventName]: event }} disabled>
            Children
          </button>,
        );

        expect(options.fn(container.firstChild)).toBe(false);
        expect(event).toBeCalledTimes(0);
      });
    }

    it('should fire correct event', () => {
      const event = jest.fn();
      const { container } = render(
        <button {...{ [eventName]: event }}>Children</button>,
      );

      expect(options.fn(container.firstChild)).toBe(true);
      expect(event).toBeCalledTimes(1);
    });
  });
});
