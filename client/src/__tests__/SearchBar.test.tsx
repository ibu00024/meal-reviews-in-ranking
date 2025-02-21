import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import { describe, expect, test, vi } from "vitest";

describe("SearchBar Component", () => {
  test("renders search input field", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    const inputElement = screen.getByPlaceholderText("Search for a restaurant...");
    expect(inputElement).toBeInTheDocument();
  });

  test("updates search query when typing", () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText("Search for a restaurant...");
    fireEvent.change(inputElement, { target: { value: "Restaurant A" } });

    expect(mockOnSearch).toHaveBeenCalledWith("Restaurant A");
    expect(inputElement).toHaveValue("Restaurant A");
  });

  test("clears input when emptied", () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText("Search for a restaurant...");
    fireEvent.change(inputElement, { target: { value: "Restaurant A" } });
    expect(inputElement).toHaveValue("Restaurant A");

    fireEvent.change(inputElement, { target: { value: "" } });
    expect(mockOnSearch).toHaveBeenCalledWith("");
    expect(inputElement).toHaveValue("");
  });
});
