import { useState, useEffect } from "react";
import "../index.css";
import RestaurantCard from "../components/RestaurantCard";

interface Restaurant {
    name: string;
    location: string;
    imageUrl: string;
    rating: number;
}

// Production: fetch data from the API
const fetchRestaurants = async (): Promise<Restaurant[]> => {
    const response = await fetch("/api/restaurants"); // TODO: replace with actual API endpoint
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

// Development: use mock data
const mockRestaurants: Restaurant[] = [
    { name: "Restaurant A", location: "Nara", imageUrl: "", rating: 3 },
    { name: "Restaurant B", location: "Tokyo", imageUrl: "", rating: 4 },
    { name: "Restaurant C", location: "Tokyo", imageUrl: "", rating: 3.4 },
    { name: "Restaurant D", location: "Osaka", imageUrl: "", rating: 4.1 },
    { name: "Restaurant E", location: "Osaka", imageUrl: "", rating: 4.3 },
    { name: "Restaurant F", location: "Osaka", imageUrl: "", rating: 1.5 },
    { name: "Restaurant G", location: "Osaka", imageUrl: "", rating: 2.2 },
];

const HomePage = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                let data: Restaurant[];
                if (import.meta.env.PROD) {
                    // Fetch data from the API in production
                    data = await fetchRestaurants();
                } else {
                    // Use mock data in development
                    data = mockRestaurants;
                }
                setRestaurants(data);
            } catch (err) {
                setError("An error occurred. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="page-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>error: {error}</p>
            ) : (
                <div className="content-grid">
                {restaurants.map((restaurant, index) => (
                  <RestaurantCard key={index} restaurant={restaurant} />
                ))}
              </div>
            )}
        </div>
    );
};

export default HomePage;
