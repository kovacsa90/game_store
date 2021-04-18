import React from "react";
import { render, screen } from "@testing-library/react";
import { CurrencyProvider, useCurrency } from "./CurrencyContext";

let consoleSpy: jest.SpyInstance;
beforeEach(() => {
  consoleSpy = jest.spyOn(console, "error");
  consoleSpy.mockImplementation(jest.fn);
});

afterEach(() => {
  consoleSpy.mockRestore();
});

const DummyComponent: React.FC = () => {
  const { currency } = useCurrency();
  return <div>{`Currency is set to: ${currency}`}</div>;
};

test("useCurrency throws error without CurrencyProvider", () => {
  expect(() => render(<DummyComponent />)).toThrow();
});

test("render the dummy component with value from the context", () => {
  render(
    <CurrencyProvider
      context={{
        currency: "USD",
        setCurrency: jest.fn(),
        rate: 1,
      }}
    >
      <DummyComponent />
    </CurrencyProvider>
  );

  expect(screen.queryByText(/Currency is set to: USD/i)).toBeTruthy();
});
