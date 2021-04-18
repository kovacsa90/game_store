import React from "react";
import { render, screen } from "@testing-library/react";
import { ManageGamesProvider, useManageGames } from "./ManageGamesContext";

let consoleSpy: jest.SpyInstance;
beforeEach(() => {
  consoleSpy = jest.spyOn(console, "error");
  consoleSpy.mockImplementation(jest.fn);
});

afterEach(() => {
  consoleSpy.mockRestore();
});

const DummyComponent: React.FC = () => {
  const { selectedGameIds } = useManageGames();
  return <div>{`Selected game id: ${selectedGameIds[0]}`}</div>;
};

test("useManageGames throws error without ManageGamesProvider", () => {
  expect(() => render(<DummyComponent />)).toThrow();
});

test("render the dummy component with value from the context", () => {
  render(
    <ManageGamesProvider
      context={{
        allGames: {},
        setAllGames: jest.fn(),
        selectedGameIds: ["123"],
        setSelectedGameIds: jest.fn(),
      }}
    >
      <DummyComponent />
    </ManageGamesProvider>
  );

  expect(screen.queryByText(/Selected game id: 123/i)).toBeTruthy();
});
