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

const ReviewCard: React.FC<ReviewCardProps> = ({
  menuName,
  reviewerName,
  rating,
  price,
  comments,
  photoURL,
  category,
}) => {
  return (
    <div className="card-container">
      {photoURL && (
        <img className="review-image" src={photoURL} alt={menuName} />
      )}
      <div className="review-info">
        <div className="review-card-header">
          <div className="review-card-name">{menuName}</div>
          <div className="restaurant-page-category-item">{category}</div>
          <div className="restaurant-page-price">Ұ {price}</div>
        </div>

        <div className="review-card-star">
          <StarRating rating={rating} />
          <span className="review-card-dot">•</span>
          <span className="review-card-star-number">{rating}</span>
        </div>
        <div className="review-comment">{comments}</div>
        {reviewerName.length > 0 && (
          <div className="reviewer-name">From: {reviewerName}</div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
