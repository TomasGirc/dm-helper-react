import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemPage from "../../app/(root)/item/page";
import { itemType } from "../../assets/types";

type modalType = {
  title: string;
  modalData: (data: itemType) => void;
};
jest.mock("../../assets/requestInfo", () => ({
  requestItems: "http://localhost:3000/item",
}));

jest.mock("../../components/ItemModal", () => (props: modalType) => (
  <button
    onClick={() =>
      props.modalData({
        id: 2,
        name: "New Item",
        rarity: "Rare",
        type: "Sword",
        keywords: ["Sword"],
        requirements: ["Strength"],
        price: 5000,
        description: "New Item Description",
      })
    }
  >
    {props.title}
  </button>
));

const mockItems: itemType[] = [
  {
    id: 1,
    name: "The first rod",
    rarity: "Legendary",
    type: "Rod",
    keywords: ["Rod", "Magical", "Wood", "Lost"],
    requirements: ["Intelect", "Magic", "Nature"],
    price: 10000,
    description: "Test",
  },
];

describe("ItemPage Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url === "http://localhost:3000/item") {
        return Promise.resolve({
          json: () => Promise.resolve(mockItems),
        });
      } else if (url.startsWith("http://localhost:3000/item/")) {
        return Promise.resolve();
      }
      return Promise.reject("unknown url");
    }) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetches and displays items", async () => {
    await act(async () => {
      render(<ItemPage />);
    });

    await waitFor(() =>
      expect(screen.getByText(/the first rod/i)).toBeInTheDocument()
    );

    const row = screen.getByText(/the first rod/i).closest("tr");
    expect(row).toBeInTheDocument();
    expect(row).toHaveTextContent(/legendary/i);
    expect(row).toHaveTextContent(/rod/i);
    expect(row).toHaveTextContent(/magical/i);
    expect(row).toHaveTextContent(/wood/i);
    expect(row).toHaveTextContent(/lost/i);
    expect(row).toHaveTextContent(/intelect/i);
    expect(row).toHaveTextContent(/magic/i);
    expect(row).toHaveTextContent(/nature/i);
  });

  test("handles fetch error", async () => {
    // Mock console.error to track calls
    const mockConsoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Mock fetch to simulate an error
    global.fetch.mockImplementationOnce(() => Promise.reject("fetch error"));

    await act(async () => {
      render(<ItemPage />);
    });

    // Assert that console.error was called with expected arguments
    expect(mockConsoleError).toHaveBeenCalledWith(
      "Item fetch threw error: ",
      "fetch error"
    );

    // Restore mock
    mockConsoleError.mockRestore();
  });

  test("handles delete item", async () => {
    await act(async () => {
      render(<ItemPage />);
    });

    await screen.findByText(/the first rod/i);

    const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    // Ensure fetch was called with the correct URL
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/item/1",
        expect.objectContaining({
          method: "DELETE",
        })
      );
    });

    // Ensure fetchItems was called to reload items
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/item",
        expect.any(Object)
      );
    });
  });

  test("toggles row collapse", async () => {
    await act(async () => {
      render(<ItemPage />);
    });

    await waitFor(() =>
      expect(screen.getByText(/the first rod/i)).toBeInTheDocument()
    );

    const expandButton = screen.getAllByRole("button", {
      name: /expand row/i,
    })[0];
    await act(async () => {
      fireEvent.click(expandButton);
    });

    await waitFor(() =>
      expect(screen.getByText(/description/i)).toBeInTheDocument()
    );
    expect(screen.getByText(/test/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(expandButton);
    });
    await waitFor(() =>
      expect(screen.queryByText(/test/i)).not.toBeInTheDocument()
    );
  });

  test("deletes item", async () => {
    await act(async () => {
      render(<ItemPage />);
    });

    await waitFor(() =>
      expect(screen.getByText(/the first rod/i)).toBeInTheDocument()
    );

    const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/item/1",
        expect.any(Object)
      )
    );
  });

  test("adds new item from modal", async () => {
    await act(async () => {
      render(<ItemPage />);
    });

    await waitFor(() =>
      expect(screen.getByText(/the first rod/i)).toBeInTheDocument()
    );

    const addButton = screen.getByText(/\+/i);
    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() =>
      expect(screen.getByText(/new item/i)).toBeInTheDocument()
    );
  });
});
