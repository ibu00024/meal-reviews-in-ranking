import React from "react";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";

export interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  coverImage: string;
  averageRating: number;
  googleMapUrl: string;
  restaurantLocation: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate("/restaurant/" + restaurant.restaurantId)}
    >
      <div className="card-image">
        <img src={restaurant.coverImage} alt={restaurant.restaurantName} />
      </div>
      <h2 className="card-title">{restaurant.restaurantName}</h2>
      <p className="card-location">{restaurant.restaurantLocation}</p>
      <div className="card-rating">
        <span className="rating-text">
          {restaurant.averageRating.toFixed(1)}/5
        </span>
        <StarRating rating={restaurant.averageRating} />
      </div>
    </div>
  );
};

export default RestaurantCard;
