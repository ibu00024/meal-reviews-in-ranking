import React from "react";
import StarRating from "./StarRating";

interface Review {
    reviewId: number;
    menuName: string;
    reviewerName: string;
    rating: number;
    price: number;
    comment: string;
    photoURL: string; // URL to the image
}

interface ReviewCardProps {
    review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="card">
            <h3 className="card-title">{review.menuName}</h3>
            <div className="card-rating">
                <StarRating rating={review.rating} />
                <span className="rating-text">{review.rating}</span>
            </div>
            <p>{review.comment}</p>
            <p>Price: {review.price}</p>
            {review.photoURL && <img src={review.photoURL} alt={review.menuName} />}
        </div>
    );
};

export default ReviewCard;
