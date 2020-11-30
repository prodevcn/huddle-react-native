import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import Button from './Button';

describe('Button', () => {
  const buttonText = 'Press Me';

  let component;
  let props;
  let mockOnPress;

  beforeEach(() => {
    mockOnPress = jest.fn();

    component = () => {
      const utils = render(
        <Button
          type="primary"
          text={buttonText}
          onPress={mockOnPress}
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

  describe('when using default button', () => {
    it('renders correctly', () => {
      const { baseElement } = component();
      expect(baseElement).toMatchSnapshot();
    });

    it('shows correct text', () => {
      const { getByText } = component();
      expect(getByText(buttonText)).toBeTruthy();
    });

    it('doesn\'t show ActivityIndicator component', () => {
      const { queryByTestId } = component();
      expect(queryByTestId('loading')).toBeNull();
    });

    describe('when pressed', () => {
      beforeEach(() => {
        const { queryByText } = component();
        fireEvent.press(queryByText(buttonText));
      });

      it('calls onPress prop', () => {
        expect(mockOnPress).toBeCalledTimes(1);
      });
    });
  });

  describe('when using disabled button', () => {
    beforeAll(() => {
      props = {
        disabled: true,
      };
    });

    it('renders correctly', () => {
      const { baseElement } = component();
      expect(baseElement).toMatchSnapshot();
    });

    it('doesn\'t show ActivityIndicator component', () => {
      const { queryByTestId } = component();
      expect(queryByTestId('loading')).toBeNull();
    });

    it('shows correct text', () => {
      const { getByText } = component();
      expect(getByText(buttonText)).toBeTruthy();
    });

    describe('when pressed', () => {
      beforeEach(() => {
        const { queryByText } = component();
        fireEvent.press(queryByText(buttonText));
      });

      it('doesn\'t call onPress prop', () => {
        expect(mockOnPress).not.toBeCalled();
      });
    });
  });

  describe('when using loading prop', () => {
    beforeAll(() => {
      props = {
        loading: true,
      };
    });

    it('renders correctly', () => {
      const { baseElement } = component();

      expect(baseElement).toMatchSnapshot();
    });

    it('shows ActivityIndicator component', () => {
      const { getByTestId } = component();
      expect(getByTestId('loading')).toBeTruthy();
    });

    it('doesn\'t show text', () => {
      const { queryByText } = component();
      expect(queryByText(buttonText)).toBeNull();
    });

    describe('when pressed', () => {
      beforeEach(() => {
        const { queryByTestId } = component();
        fireEvent.press(queryByTestId('loading'));
      });

      it('doesn\'t call onPress prop', () => {
        expect(mockOnPress).not.toBeCalled();
      });
    });
  });
});
