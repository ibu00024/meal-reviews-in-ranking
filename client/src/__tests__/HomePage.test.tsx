import { render, screen, waitFor, within} from "@testing-library/react";
import HomePage from "../pages/HomePage";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// mock data
const mockRestaurants = [
    {
        name: "Restaurant A",
        location: "Nara",
        imageUrl: "https://example.com/restaurant.jpg",
        rating: 3,
    },
    {
        name: "Restaurant B",
        location: "Tokyo",
        imageUrl: "https://example.com/restaurant.jpg",
        rating: 4,
    },
    {
        name: "Restaurant C",
        location: "Tokyo",
        imageUrl: "https://example.com/restaurant.jpg",
        rating: 3.4,
    },
    {
        name: "Restaurant D",
        location: "Osaka",
        imageUrl: "https://example.com/restaurant.jpg",
        rating: 4.1,
    },
    {
        name: "Restaurant E",
        location: "Osaka",
        imageUrl: "https://example.com/restaurant.jpg",
        rating: 4.3,
    },
    {
        name: "Restaurant F",
        location: "Osaka",
        imageUrl: "https://example.com/restaurant.jpg",
        rating: 1.5,
    },
    {
        name: "Restaurant G",
        location: "Osaka",
        imageUrl: "https://example.com/restaurant.jpg",
        rating: 2.2,
    },
];

beforeEach(() => {
    // mock fetch
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRestaurants),
      })
    ) as any;
  });
  
afterEach(() => {
vi.restoreAllMocks();
});
  
describe("HomePage Component", () => {
    beforeAll(() => {
        // Force the environment to "production" for these tests
        (import.meta.env as any).DEV = false;
        (import.meta.env as any).PROD = true;
    });
    
    afterAll(() => {
        // Reset to the original values if needed
        (import.meta.env as any).DEV = true;
        (import.meta.env as any).PROD = false;
    });

    it("The initial display shows Loading", async () => {
        render(<HomePage />);

        // check if the loading text is displayed
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            // check if the loading text is removed
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        });
    });

    it("The restaurant cards are displayed after data acquisition", async () => {
        render(<HomePage />);
        
        // wait for the loading text to be removed
        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        });
        
        // check if the restaurant cards are displayed
        mockRestaurants.forEach((restaurant) => {
            const card = screen.getByText(restaurant.name).closest(".card");
            expect(card).toBeInTheDocument();
            
            const { getByText } = within(card as HTMLElement);
            expect(getByText(restaurant.location)).toBeInTheDocument();

            expect(getByText(`${restaurant.rating.toFixed(1)}/5`)).toBeInTheDocument();
        });
    });

    it("Error message if fetch fails", async () => {
        globalThis.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
            })
        ) as any;

        render(<HomePage />);

        await waitFor(() => {
            expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
        });
    });
});
