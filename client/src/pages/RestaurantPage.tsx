import { useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import ReviewCard from "../components/ReviewCard";

interface Restaurant {
    name: string;
    location: string;
    imageUrl: string;
    rating: number;
}

interface Review {
    restaurant: string;
    menuName: string;
    menuRating: number;
    price: number;
    comment: string;
    picture: string; // URL to the image
}

// Production: fetch data from the API
const fetchRestaurant = async (id: number): Promise<Restaurant> => {
    const response = await fetch(`/api/restaurant/${id}`); // TODO: replace with actual API endpoint
    if (!response.ok) {
        throw new Error("Failed to fetch restaurant data");
    }
    return response.json();
};

const fetchReviews = async (id: number): Promise<Review[]> => {
    const response = await fetch(`/api/reviews/${id}`); // TODO: replace with actual API endpoint
    if (!response.ok) {
        throw new Error("Failed to fetch reviews data");
    }
    return response.json();
};

// Development: use mock data
const mockRestaurant: Restaurant = {
    name: "Restaurant A",
    location: "Nara",
    imageUrl: "",
    rating: 3,
}
const mockReviews: Review[] = [
    {
        restaurant: "Restaurant A",
        menuName: "Ramen AA",
        menuRating: 2,
        price: 1500,
        comment: "The sushi was fresh and delicious!",
        picture: "https://example.com/sushi.jpg",
    },
    {
        restaurant: "Restaurant A",
        menuName: "Ramen BB",
        menuRating: 4,
        price: 1200,
        comment: "The ramen was flavorful and satisfying.",
        picture: "https://example.com/ramen.jpg",
    },
    {
        restaurant: "Restaurant A",
        menuName: "Ramen CC",
        menuRating: 3,
        price: 1200,
        comment: "The ramen was flavorful and satisfying.",
        picture: "https://example.com/ramen.jpg",
    },
];


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
                    restaurantData = await fetchRestaurant(1);
                    reviewsData = await fetchReviews(1);

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
                    <h1 className="title">{restaurant?.name}</h1>
                    <div className="restaurantData">
                        <div className="card-rating">
                            <StarRating rating={restaurant?.rating || 0} />
                            <span className="rating-text">
                                {restaurant?.rating.toFixed(1)}/5
                            </span>
                        </div>
                        <p>Location: {restaurant?.location}</p>
                        <img src={restaurant?.imageUrl} alt={restaurant?.name} />
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