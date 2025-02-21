import { useState, useEffect } from "react";
import "../index.css";
import RestaurantCard from "../components/RestaurantCard";
import SearchBar from "../components/SearchBar";

interface Restaurant {
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

const apiResult: ApiResponse = await fetchRestaurants();
const apiRestaurants: Restaurant[] = apiResult.data;

const HomePage = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                let data: Restaurant[];
                if (import.meta.env.PROD) {
                    // Fetch data from the API in production
                    let apiResponse = await fetchRestaurants();
                    data = apiResponse.data
                } else {
                    // Use mock data in development
                    data = apiRestaurants;
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

    const filteredRestaurants =
        searchQuery.trim() === ""
            ? restaurants
            : restaurants.filter((restaurant) =>
                restaurant.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
            );

    return (
        <div className="page-container">
            <div className="search-bar-container">
                <SearchBar onSearch={setSearchQuery} />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>error: {error}</p>
            ) : (
                <div className="content-grid">
                    {filteredRestaurants.map((restaurant, index) => (
                        <RestaurantCard key={index} restaurant={restaurant} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
