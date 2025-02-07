import React from "react";
import StarRating from "./StarRating";

export interface Restaurant {
    name: string;
    location: string;
    imageUrl: string;
    rating: number;
}

interface RestaurantCardProps {
    restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
    return (
        <div className="card">
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
    );
};

export default RestaurantCard;
