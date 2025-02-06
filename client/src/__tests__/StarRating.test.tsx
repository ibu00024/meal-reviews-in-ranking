import { render, screen } from "@testing-library/react";
import StarRating from "../components/StarRating";
import { describe, it, expect } from "vitest";

describe("StarRating Component", () => {
    it("renders exactly 5 stars regardless of the rating", () => {
        render(<StarRating rating={0} />);
        const stars = screen.getAllByText(/★|☆/);
        expect(stars).toHaveLength(5);
    });

    it("displays the correct number of filled and empty stars for a fractional rating", () => {
        render(<StarRating rating={3.7} />);
        const fullStars = screen.getAllByText("★");
        const emptyStars = screen.getAllByText("☆");

        expect(fullStars).toHaveLength(3);
        expect(emptyStars).toHaveLength(2);
    });

    it("displays all stars as filled for a perfect rating of 5", () => {
        render(<StarRating rating={5} />);
        const fullStars = screen.getAllByText("★");
        expect(fullStars).toHaveLength(5);
        // Since the rating is 5, there should be no empty stars.
        expect(() => screen.getByText("☆")).toThrow();
    });
});
