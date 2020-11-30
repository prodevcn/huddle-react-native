import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  let component;
  let props;
  let mockOnChange;

  const checkboxLabel = 'Mom, I\'m an engineer!';

  beforeEach(() => {
    mockOnChange = jest.fn();

    component = () => {
      const utils = render(
        <Checkbox
          onChange={mockOnChange}
          label={checkboxLabel}
          {...props}
        />,
      );

      return {
        ...utils,
      };
    };
  });

  afterEach(() => {
    jest.resetModules();
    cleanup();
  });

  describe('when checkbox is checked', () => {
    beforeAll(() => {
      props = {
        checked: true,
      };
    });

    it('renders correctly', () => {
      const { baseElement } = component();
      expect(baseElement).toMatchSnapshot();
    });

    it('shows correct label', () => {
      const { getByText } = component();
      expect(getByText(checkboxLabel)).toBeTruthy();
    });

    describe('when pressed', () => {
      beforeEach(() => {
        const { queryByTestId } = component();
        fireEvent.press(queryByTestId('checkbox'));
      });

      it('calls onChange prop', () => {
        expect(mockOnChange).toBeCalledTimes(1);
        expect(mockOnChange).toBeCalledWith(false);
      });
    });

    describe('when checkbox is disabled', () => {
      beforeAll(() => {
        props = {
          checked: true,
          disabled: true,
        };
      });

      it('renders correctly', () => {
        const { baseElement } = component();
        expect(baseElement).toMatchSnapshot();
      });

      describe('when pressed', () => {
        beforeEach(() => {
          const { queryByTestId } = component();
          fireEvent.press(queryByTestId('checkbox'));
        });

        it('doesn\'t call onChange prop', () => {
          expect(mockOnChange).not.toBeCalled();
        });
      });
    });
  });

  describe('when checkbox is not checked', () => {
    beforeAll(() => {
      props = {
        checked: false,
      };
    });

    it('renders correctly', () => {
      const { baseElement } = component();
      expect(baseElement).toMatchSnapshot();
    });

    it('shows correct label', () => {
      const { getByText } = component();
      expect(getByText(checkboxLabel)).toBeTruthy();
    });

    describe('when pressed', () => {
      beforeEach(() => {
        const { queryByTestId } = component();
        fireEvent.press(queryByTestId('checkbox'));
      });

      it('calls onChange prop', () => {
        expect(mockOnChange).toBeCalledTimes(1);
        expect(mockOnChange).toBeCalledWith(true);
      });
    });

    describe('when checkbox is disabled', () => {
      beforeAll(() => {
        props = {
          checked: false,
          disabled: true,
        };
      });

      it('renders correctly', () => {
        const { baseElement } = component();
        expect(baseElement).toMatchSnapshot();
      });

      it('doesn\'t call onChange prop', () => {
        const { queryByTestId } = component();
        fireEvent.press(queryByTestId('checkbox'));

        expect(mockOnChange).not.toBeCalled();
      });
    });
  });
});
