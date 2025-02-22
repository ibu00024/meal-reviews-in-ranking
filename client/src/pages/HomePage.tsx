import { useState, useEffect } from "react";
import "../index.css";
import RestaurantCard from "../components/RestaurantCard";

interface Restaurant {
    restaurantId: number;
    restaurantName: string;
    coverImage: string;
    averageRating: number;
    googleMapUrl: string;
    restaurantLocation: string;
}

// for the API
interface ApiResponse {
    success: boolean;
    data: Restaurant[];
}

// Production: fetch data from the API
const fetchRestaurants = async (): Promise<ApiResponse> => {
    const response = await fetch("http://localhost:8000/restaurant/");
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

const HomePage = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const apiResponse = await fetchRestaurants();
                const data = apiResponse.data
                setRestaurants(data);
            } catch {
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
