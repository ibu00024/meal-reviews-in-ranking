import { useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import ReviewCard from "../components/ReviewCard";
import {useParams} from "react-router-dom";

interface Restaurant {
    restaurantId: number;
    restaurantName: string;
    coverImage: string;
    averageRating: number;
    googleMapUrl: string;
    restaurantLocation: string;
    latitude: number;
    longitude: number;
}

interface Review {
    menuName: string;
    rating: number;
    price: number;
    comment: string;
    photoURL: string;
    category: string;
    reviewerName: string;
}

// Production: fetch data from the API
const fetchRestaurant = async (id: string): Promise<Restaurant> => {
    const response = await fetch(`http://localhost:8000/restaurant/${id}`); // TODO: replace with actual API endpoint
    if (!response.ok) {
        throw new Error("Failed to fetch restaurant data");
    }
    const json = await response.json();
    return {
        restaurantId: json.data.restaurantId,
        restaurantName: json.data.restaurantName,
        coverImage: json.data.coverImage,
        averageRating: json.data.averageRating,
        googleMapUrl: json.data.googleMapUrl,
        restaurantLocation: json.data.restaurantLocation,
        latitude: json.data.latitude,
        longitude: json.data.longitude,
    };
};

const fetchReviews = async (id: string): Promise<Review[]> => {
    const response = await fetch(`http://localhost:8000/review/${id}`); // TODO: replace with actual API endpoint
    if (!response.ok) {
        throw new Error("Failed to fetch reviews data");
    }
    const json = await response.json();
    return json.data.map(review => ({
        menuName: review.menuName,
        rating: review.rating,
        price: review.price,
        comment: review.comment,
        photoURL: review.photoURL,
        category: review.category,
        reviewerName: review.reviewerName,
    }))
};

type RestaurantPageParam = {
    id: string;
};

const RestaurantPage: React.FC = () => {
    const { id } = useParams<RestaurantPageParam>();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                if (!id) {
                    throw new Error("No restaurant data");
                }
                const restaurantData = await fetchRestaurant(id);
                const reviewsData = await fetchReviews(id);
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
                        {/*<img id="coverImage" src={restaurant?.coverImage} alt={restaurant?.restaurantName} />*/}
                    </div>
                    <h2>Reviews</h2>
                    <div className="content-grid">
                        {reviews.map((review, index) => (
                            <ReviewCard key={index} menuName={review.menuName} rating={review.rating} reviewerName={review.reviewerName} price={0}
                                        comments={review.comment} photoURL={review.photoURL} category={review.category} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default RestaurantPage;