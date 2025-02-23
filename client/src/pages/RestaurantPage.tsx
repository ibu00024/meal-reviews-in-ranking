import { useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import ReviewCard from "../components/ReviewCard";
import { A } from "vitest/dist/chunks/environment.d8YfPkTm.js";

interface Restaurant {
    restaurantId: number;
    restaurantName: string;
    coverImage: string;
    averageRating: number;
    googleMapUrl: string;
    restaurantLocation: string;
    latitude: number;
    longitude: number;
    reviews: Review[];
}

interface Review {
    reviewId: number;
    menuName: string;
    reviewerName: string;
    rating: number;
    price: number;
    comment: string;
    photoURL: string; // URL to the image
}

interface ApiResponse {
    success: boolean;
    data: Restaurant;
}

// Production: fetch data from the API
const fetchRestaurant = async (id: number): Promise<ApiResponse> => {
    const response = await fetch(`http://localhost:8000/restaurant/${id}`); // TODO: replace with actual API endpoint
    if (!response.ok) {
        throw new Error("Failed to fetch restaurant data");
    }
    return response.json();
};

// const fetchReviews = async (id: number): Promise<ApiResponse> => {
//     const response = await fetch(`http://localhost:8000/reviews/${id}`); // TODO: replace with actual API endpoint
//     if (!response.ok) {
//         throw new Error("Failed to fetch reviews data");
//     }
//     return response.json();
// };

// Development: use mock data
// const mockRestaurant: Restaurant = {
//     restaurantId: 1,
//     restaurantName: "Restaurant A",
//     coverImage: "https://example.com/sashimi.jpg",
//     restaurantLocation: "Nara",
//     averageRating: 3,
//     googleMapUrl: "https://goo.gl/maps/abc",
//     latitude: 34.685087,
//     longitude: 135.804865,
//     reviews: [],
// }
// const mockReviews: Review[] = [
//     {
//         reviewId: 1,
//         menuName: "Ramen AA",
//         reviewerName: "Alice",
//         rating: 2,
//         price: 1500,
//         comment: "The sushi was fresh and delicious!",
//         photoURL: "https://example.com/sushi.jpg",
//     },
//     {
//         reviewId: 2,
//         menuName: "Ramen BB",
//         reviewerName: "Bob",
//         rating: 4,
//         price: 1200,
//         comment: "The ramen was flavorful and satisfying.",
//         photoURL: "https://example.com/ramen.jpg",
//     },
//     {
//         reviewId: 3,
//         menuName: "Ramen CC",
//         reviewerName: "Charlie",
//         rating: 3,
//         price: 1200,
//         comment: "The ramen was flavorful and satisfying.",
//         photoURL: "https://example.com/ramen.jpg",
//     },
// ];


let apiResult = await fetchRestaurant(1);
const mockRestaurant: Restaurant = apiResult.data;
const mockReviews: Review[] = mockRestaurant.reviews;


const RestaurantPage = () => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                let restaurantData: Restaurant;
                let reviewsData: Review[];
                if (import.meta.env.PROD) {
                    // Fetch data from the API in production
                    let apiResult = await fetchRestaurant(1);
                    // reviewsData = await fetchReviews(1);
                    restaurantData = apiResult.data;
                    reviewsData = restaurantData.reviews;

                } else {
                    // Use mock data in development
                    restaurantData = mockRestaurant;
                    reviewsData = mockReviews;
                }
                setRestaurant(restaurantData);
                setReviews(reviewsData);
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
                <p>{error}</p>
            ) : (
                <div>
                    <h1 className="title">{restaurant?.restaurantName}</h1>
                    <div className="restaurantData">
                        <div className="card-rating">
                            <StarRating rating={restaurant?.averageRating || 0} />
                            <span className="rating-text">
                                {restaurant?.averageRating.toFixed(1)}/5
                            </span>
                        </div>
                        <p>Location: {restaurant?.restaurantLocation}</p>
                        <img src={restaurant?.coverImage} alt={restaurant?.restaurantName} />
                    </div>
                    <h2>Reviews</h2>
                    <div className="content-grid">
                        {reviews.map((review, index) => (
                            <ReviewCard key={index} review={review} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default RestaurantPage;