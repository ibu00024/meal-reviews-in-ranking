import React from "react";
import StarRating from "./StarRating";

interface ReviewCardProps {
    menuName: string;
    reviewerName: string;
    rating: number;
    price: number;
    comments: string;
    photoURL: string;
    category: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ menuName, reviewerName, rating, price, comments, photoURL, category }) => {
    return (
        <div className="card">
            <h3 className="card-title">{menuName}</h3>
            <h4>{category}</h4>
            <div className="card-rating">
                <StarRating rating={rating} />
                <span className="rating-text">{rating}</span>
            </div>
            <p>{comments}</p>
            <p>Price: {price}</p>
            {reviewerName.length > 0 && <p>From: {reviewerName}</p>}
            {photoURL && <img className="review-image" src={photoURL} alt={menuName} />}
        </div>
    );
};

export default ReviewCard;
