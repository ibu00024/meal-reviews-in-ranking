class ReviewDTO {
  reviewId: number | undefined;
  menuName: string | undefined;
  reviewerName: string | undefined;
  rating: number | undefined;
  price: number | undefined;
  comments: string | undefined;
  photoURL: string | undefined;

  constructor(
    reviewId: number | undefined,
    menuName: string | undefined,
    reviewerName: string | undefined,
    rating: number | undefined,
    price: number | undefined,
    comments: string | undefined,
    photoURL: string | undefined,
  ) {
    this.reviewId = reviewId;
    this.menuName = menuName;
    this.reviewerName = reviewerName;
    this.rating = rating;
    this.price = price;
    this.comments = comments;
    this.photoURL = photoURL;
  }
}

export default ReviewDTO;
