import React from "react";
import StarRating from "./StarRating";

export interface Restaurant {
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
    return (
        <div className="card">
            <div className="card-image">
                <img src={restaurant.coverImage} alt={restaurant.restaurantName} />
            </div>
            <h2 className="card-title">{restaurant.restaurantName}</h2>
            <p className="card-location">{restaurant.restaurantLocation}</p>
            <div className="card-rating">
                <span className="rating-text">{restaurant.averageRating.toFixed(1)}/5</span>
                <StarRating rating={restaurant.averageRating} />
            </div>
        </div>
    );
};

export default RestaurantCard;
