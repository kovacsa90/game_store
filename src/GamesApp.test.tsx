import React from "react";
import {
  render,
  cleanup,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GamesApp from "./GamesApp";
import { makeServer } from "./testUtils";
import { Server, Registry } from "miragejs";
import { ModelDefinition, FactoryDefinition } from "miragejs/-types";

let server: Server<
  Registry<
    Record<string, ModelDefinition<{}>>,
    Record<string, FactoryDefinition<{}>>
  >
>;

beforeEach(() => {
  server = makeServer();
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
  server.shutdown();
});

describe("Render GamesApp", () => {
  test("render App", async () => {
    render(<GamesApp />);
    expect(screen.getByText(/Games/i)).toBeTruthy();
    expect(screen.getByText(/Checkout/i)).toBeTruthy();
    expect(screen.getByText(/USD/i)).toBeTruthy();
    await waitFor(() => expect(screen.getAllByText(/Rating/i)).toHaveLength(2));
    expect(screen.getAllByText(/star.svg/i)).toBeTruthy();
    expect(screen.getAllByText(/cart.svg/i)).toBeTruthy();
    expect(screen.getAllByText(/subtract.svg/i)).toBeTruthy();
    expect(screen.getAllByText(/add.svg/i)).toBeTruthy();
    expect(screen.getAllByText(/plus.svg/i)).toBeTruthy();
    expect(screen.getAllByText(/Released - /i)).toHaveLength(2);
    expect(screen.getAllByText(/Tags/i)).toHaveLength(2);
    expect(screen.getAllByText(/Quantity/i)).toHaveLength(2);
    expect(screen.getAllByText(/Add to basket/i)).toHaveLength(2);
  });
});

describe("GamesApp interactions", () => {
  test("Add first game to Cart", async () => {
    render(<GamesApp />);
    await waitFor(() => expect(screen.getAllByText(/Rating/i)).toHaveLength(2));
    expect(screen.queryByText(/Added/i)).toBeFalsy();
    expect(screen.queryByTestId(/counterBadge/i)).toBeFalsy();
    const firstRowsButton = screen.getAllByText(/Add to basket/i)[0];
    userEvent.click(firstRowsButton);
    expect(screen.queryByText(/Added/i)).toBeTruthy();
    expect(screen.queryByTestId(/counterBadge/i)).toBeTruthy();
  });
  test("Change currency from USD to EUR", async () => {
    render(<GamesApp />);
    await waitFor(() => expect(screen.getAllByText(/Rating/i)).toHaveLength(2));
    expect(screen.getByText("2.10 $")).toBeTruthy();
    const selectCurrencyInput = screen.getByTestId("selectCurrency");
    fireEvent.change(selectCurrencyInput, { target: { value: "EUR" } });
    expect(screen.getByText("1.84 €")).toBeTruthy();
  });
  test("Go to empty checkout page and back to game list", async () => {
    render(<GamesApp />);
    const checkoutButton = screen.getByText(/Checkout/i);
    userEvent.click(checkoutButton);
    expect(screen.queryByText(/Checkout cart is empty!/i)).toBeTruthy();
    expect(screen.getByText(/Order Value/i)).toBeTruthy();
    expect(screen.getByText("0.00 $")).toBeTruthy();
    expect(screen.getByText(/Total items/i)).toBeTruthy();
    const backButton = screen.getByText("Back to overview");
    userEvent.click(backButton);
    expect(screen.queryByText(/Games/i)).toBeTruthy();
  });
  test("Interact with non empty checkout page", async () => {
    render(<GamesApp />);
    await waitFor(() => expect(screen.getAllByText(/Rating/i)).toHaveLength(2));
    const firstRowsButton = screen.getAllByText(/Add to basket/i)[0];
    userEvent.click(firstRowsButton);
    const checkoutButton = screen.getByText(/Checkout/i);
    userEvent.click(checkoutButton);
    expect(screen.getAllByText("2.10 $")).toBeTruthy();
    const firstRowsAddSVG = screen.getAllByText(/add.svg/i)[0];
    userEvent.click(firstRowsAddSVG);
    expect(screen.getAllByText("4.20 $")).toBeTruthy();
    const removeButton = screen.getByText(/Remove/i);
    userEvent.click(removeButton);
    expect(screen.queryByText(/Checkout cart is empty!/i)).toBeTruthy();
  });
});
