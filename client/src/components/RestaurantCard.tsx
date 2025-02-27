import React from "react";
import { useNavigate } from "react-router-dom";

export interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  coverImage: string;
  averageRating: number;
  googleMapUrl: string;
  restaurantLocation: string;
  priceLevel: number;
  reviewCount: number;
  review: string;
  reviewer: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card flex"
      onClick={() => navigate("/restaurant/" + restaurant.restaurantId)}
    >
      <div>
        <img className="card-image" src={restaurant.coverImage} alt={restaurant.restaurantName} />
      </div>
      <div className="card-body">
        <div className="card-body flex">
          <div className="card-header">
        <span className="rating-badge">
          <span className="rating-badge-value">
            {restaurant.averageRating.toFixed(1)}
          </span>
          <span className="star-medium">
            ★
          </span>
        </span>
            <span className="card-title">{restaurant.restaurantName}</span>
            <div className="card-location">{restaurant.restaurantLocation}</div>
          </div>
          <div className="card-meta">
            { restaurant?.priceLevel && restaurant.priceLevel != -1 && (<div>Price: {"$".repeat(restaurant.priceLevel + 1)} </div>) }
            <div>Total Reviews: {restaurant.reviewCount}</div>
          </div>
        </div>
        <div className="card-sub-title">Example Comments</div>
        <div className="card-body light-grey-bg card-comment">
          <div className="card-body-text bold">From: {restaurant.reviewer.length == 0 ? "anonymous" : restaurant.reviewer}</div>
          <div className="card-body-text">{restaurant.review}</div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
