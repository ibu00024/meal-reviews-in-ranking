import {useEffect, useState} from "react";
import StarRating from "../components/StarRating";
import ReviewCard from "../components/ReviewCard";
import {useParams} from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

import "leaflet/dist/leaflet.css"

interface Restaurant {
    restaurantId: number;
    restaurantName: string;
    coverImage: string;
    averageRating: number;
    googleMapUrl: string;
    restaurantLocation: string;
    latitude: number;
    longitude: number;
    reviewImages: string[];
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

const images = [
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
];

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
        reviewImages: json.data.reviewImages,
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
        comment: review.comments,
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
    const [reviewImage, setReviewImage] = useState<string[]>(images);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [googleMapUrl, setGoogleMapUrl] = useState<string>("");
    const [coordinates, setCoordinates] = useState<number[]>([0, 0]);

    const convertToImageObject = (images: string[]) => {
        return images.map((image) => {
            return {
                original: image,
                thumbnail: image,
            }
        })
    }

    const getCategories = (reviews: Review[]) => {
        const categoryCount: Record<string, number> = {};

        reviews.forEach((review) => {
            const categoryName = review.category;
            if (categoryName) {
                categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
            }
        });

        return Object.entries(categoryCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([categoryName]) => categoryName);
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                if (!id) {
                    throw new Error("No restaurant data");
                }
                const restaurantData = await fetchRestaurant(id);
                const reviewsData = await fetchReviews(id);
                setRestaurant(restaurantData);
                setReviewImage(restaurantData.reviewImages)
                setReviews(reviewsData);
                setCategories(getCategories(reviewsData))
                setCoordinates([restaurantData.latitude, restaurantData.longitude])
                setGoogleMapUrl(restaurantData.googleMapUrl)
            } catch (err) {
                setError("An error occurred. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="restaurant-page-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <div className="restaurant-page-main-section">
                        <div className="restaurant-page-card">
                            <div className="restaurant-name-card">
                                <h1 className="restaurant-page-title">{restaurant?.restaurantName}</h1>
                                <div className="restaurant-page-location">Location: {restaurant?.restaurantLocation}</div>
                                <div className="card-rating">
                                    <StarRating rating={restaurant?.averageRating || 0} />
                                    <span className="rating-text">
                                        {restaurant?.averageRating.toFixed(1)}/5
                                    </span>
                                </div>
                            </div>
                            <div className="restaurant-page-category-box">
                                <h3 className="restaurant-page-category-header">Category</h3>
                                <div className="restaurant-page-category-body">
                                    {categories.map((category) => (
                                        <div className="restaurant-page-category-item" key={category}>
                                            <div className="restaurant-page-category-background"></div>
                                            <div className="restaurant-page-category-text-box">{category}</div>
                                        </div>

                                    ))}
                                </div>

                            </div>
                        </div>
                        <div className="image-container">
                            <ImageGallery
                                items={convertToImageObject(reviewImage)}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                showNav={false}
                            />
                        </div>
                    </div>
                    <div className="restaurant-page-main-section">
                        <div className="restaurant-page-map-section">
                            <div className="restaurant-page-map-container">
                                <h3 className="restaurant-page-map-header">Map</h3>
                                <MapContainer
                                    center={[coordinates[0], coordinates[1]]}
                                    zoom={16}
                                    style={{ height: "300px", width: "300px", borderRadius: "10px" }}
                                    scrollWheelZoom={false} // Disable zooming
                                    dragging={false} // Disable dragging for a static effect
                                    doubleClickZoom={false} // Disable double-click zoom
                                    touchZoom={false} // Disable touch zooming
                                    zoomControl={false} // Hide zoom control
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[coordinates[0], coordinates[1]]}>
                                        <Popup>Restaurant</Popup>
                                    </Marker>
                                </MapContainer>
                                <a href={googleMapUrl} target="_blank" rel="noopener noreferrer">
                                    <button className="google-map-button">
                                        Open in Google Maps
                                    </button>
                                </a>
                            </div>
                        </div>
                        <div className="restaurant-page-review-section">
                            <h2 className="restaurant-page-review-header">Reviews</h2>
                                {reviews.map((review, index) => (
                                    <ReviewCard key={index} menuName={review.menuName} rating={review.rating} reviewerName={review.reviewerName} price={review.price}
                                                comments={review.comment} photoURL={review.photoURL} category={review.category} />
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RestaurantPage;