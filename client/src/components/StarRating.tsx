/**
 * StarRating component renders a series of filled and empty stars based on the given rating. 
 * The total number of stars is always 5.
 */
const StarRating = ({ rating }: { rating: number }) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const emptyStars = totalStars - fullStars;

    return (
        <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => (
            <span key={i} className="star full">
            ★
            </span>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
            <span key={i + fullStars} className="star empty">
            ☆
            </span>
        ))}
        </div>
    );
};
  
export default StarRating;
