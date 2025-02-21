import React from "react";
import StarRating from "./StarRating";

export interface Review {
    restaurant: string;
    menuName: string;
    menuRating: number;
    price: number;
    comment: string;
    picture: string; // URL to the image
}

interface ReviewCardProps {
    review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="card">
            <h3 className="card-title">{review.menuName}</h3>
            <div className="card-rating">
                <StarRating rating={review.menuRating} />
                <span className="rating-text">{review.menuRating}</span>
            </div>
            <p>{review.comment}</p>
            <p>Price: {review.price}</p>
            {review.picture && <img src={review.picture} alt={review.menuName} />}
        </div>
    );
};

export default ReviewCard;
