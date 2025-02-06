import {useState, useEffect} from "react";
import "../index.css";

interface Restaurant {
  name: string;
  location: string;
  imageUrl: string;
  rating: number;
}

// mock data
const mockRestaurants: Restaurant[] = [
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
]

// calculate star rating
const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating); // round down
  const emptyStars = totalStars - fullStars;

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="star full">★</span>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={i + fullStars} className="star empty">☆</span>
      ))}
    </div>
  );
};

const HomePage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants); // TODO: replace with []
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: fetch data from API
  // useEffect(() => {
  //   const fetchRestaurants = async () => {
  //     setLoading(true);
  //     try {
  //       // TODO: replace with actual API endpoint
  //       const response = await fetch("/api/restaurants");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const data = await response.json();
  //       setRestaurants(data);
  //     } catch (error) {
  //       setError("An error occurred. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchRestaurants();
  // }, []);

  // mock data
  useEffect(() => {
    setLoading(false);
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
            <div key={index} className="card">
              <div className="card-image">
                <img src={restaurant.imageUrl} alt={restaurant.name} />
              </div>
              <h2 className="card-title">{restaurant.name}</h2>
              <p className="card-location">{restaurant.location}</p>
              <div className="card-rating">
                <span className="rating-text">{restaurant.rating.toFixed(1)}/5</span>
                <StarRating rating={restaurant.rating} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
