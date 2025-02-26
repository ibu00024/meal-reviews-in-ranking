import { useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import ReviewCard from "../components/ReviewCard";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import {FaCheck, FaClock, FaDollarSign, FaPhone, FaTimes, FaUtensils} from "react-icons/fa";

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
  "address": string;
  "phone_number": string;
  "delivery": boolean;
  "dine_in": boolean;
  "open_hour": string[];
}

interface Review {
  menuName: string;
  rating: number;
  price: number;
  comments: string;
  photoURL: string;
  category: string;
  reviewerName: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Production: fetch data from the API
const fetchRestaurant = async (id: string): Promise<Restaurant> => {
  const response = await fetch(`http://localhost:8000/restaurant/${id}`); // TODO: replace with actual API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch restaurant data");
  }
  const json: ApiResponse<Restaurant> = await response.json();
  return json.data;
};

const fetchReviews = async (id: string): Promise<Review[]> => {
  const response = await fetch(`http://localhost:8000/review/${id}`); // TODO: replace with actual API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch reviews data");
  }
  const json: ApiResponse<Review[]> = await response.json();
  return json.data;
};

type RestaurantPageParam = {
  id: string;
};

const RestaurantPage: React.FC = () => {
  const { id } = useParams<RestaurantPageParam>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviewImage, setReviewImage] = useState<string[]>([]);
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
      };
    });
  };

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
      .slice(0, 10)
      .map(([categoryName]) => categoryName);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) {
          throw new Error("No restaurant data");
        }
        const restaurantData = await fetchRestaurant(id);
        const reviewsData = await fetchReviews(id);
        setRestaurant(restaurantData);
        setReviewImage(restaurantData.reviewImages);
        setReviews(reviewsData);
        setCategories(getCategories(reviewsData));
        setCoordinates([restaurantData.latitude, restaurantData.longitude]);
        setGoogleMapUrl(restaurantData.googleMapUrl);
      } catch {
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
          <div className="restaurant-name-card">
            <div>
              <h1 className="restaurant-page-title">
                {restaurant?.restaurantName}
              </h1>
              <div className="restaurant-page-location">
                Location: {restaurant?.restaurantLocation}
              </div>
            </div>
            <div className="restaurant-card-rating">
              <StarRating rating={restaurant?.averageRating || 0} />
              <span className="rating-text">
                {restaurant?.averageRating.toFixed(1)}/5
              </span>
            </div>
          </div>
          <div className="restaurant-page-main-section">
            <div className="restaurant-info-container">
              <div className="restaurant-page-category-box">
                <h3 className="restaurant-page-category-header">Category</h3>
                <div className="restaurant-page-category-body">
                  {categories.map((category) => (
                    <div
                      className="restaurant-page-category-item"
                      key={category}
                    >
                      <div className="restaurant-page-category-background"></div>
                      <div className="restaurant-page-category-text-box">
                        {category}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="restaurant-restaurant-type">
                <span className="service-header">Services</span>
                <div className="service-item">
                  {restaurant?.dine_in ? (
                      <FaCheck className="service-icon check" />
                  ) : (
                      <FaTimes className="service-icon cross" />
                  )}
                  <span className="service-item-text">Dine in </span>
                </div>
                <div className="service-item">
                  {restaurant?.delivery ? (
                      <FaCheck className="service-icon check" />
                  ) : (
                      <FaTimes className="service-icon cross" />
                  )}
                  <span className="service-item-text">Delivery </span>
                </div>
              </div>
              <div className="restaurant-hours-container">
                <h3 className="hours-title">
                  Operation Time <FaClock className="clock-icon" />
                </h3>
                <ul className="hours-list">
                  {restaurant?.open_hour.map((day, index) => (
                      <li key={index} className="hours-item">{day}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="restaurant-page-main-container">
              <div className="restaurant-image-container">
                <ImageGallery
                  items={convertToImageObject(reviewImage)}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  showNav={false}
                />
              </div>
              <div className="restaurant-page-information-container">
                  {/* Left Side - Map */}
                  <div className="map-wrapper">
                    <MapContainer
                        center={[coordinates[0], coordinates[1]]}
                        zoom={16}
                        style={{ height: "180px", width: "180px", borderRadius: "10px" }}
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
                  </div>

                  {/* Right Side - Information */}
                  <div className="restaurant-info">
                    <div className="info-row">
                      <span className="info-value">{restaurant?.address}</span>
                      <a className="direction-button" href={googleMapUrl} target="_blank" rel="noopener noreferrer">
                        Google Maps
                      </a>
                    </div>

                    {/* Phone Number */}
                    <div className="info-row">
                      <span>
                        <span className="info-title">Phone number: </span>
                        <span className="info-value">{restaurant?.phone_number}</span>
                      </span>
                      <FaPhone className="info-icon" />
                    </div>

                    {/* Menu & Prices */}
                    <div className="info-row">
                      <span>
                        <span className="info-title">Price: </span>
                        <span className="info-value">$$$</span>
                      </span>
                      <FaDollarSign className="info-icon" />
                    </div>
                  </div>
              </div>
              <div className="restaurant-page-review-section">
                <div className="restaurant-page-review-header">Reviews</div>
                {reviews.map((review, index) => (
                  <ReviewCard
                    key={index}
                    menuName={review.menuName}
                    rating={review.rating}
                    reviewerName={review.reviewerName}
                    price={review.price}
                    comments={review.comments}
                    photoURL={review.photoURL}
                    category={review.category}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
