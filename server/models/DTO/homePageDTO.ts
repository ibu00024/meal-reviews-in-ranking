class HomePageDTO {
  restaurantId: number | undefined;
  restaurantName: string | undefined;
  coverImage: string | undefined;
  averageRating: number | undefined;
  googleMapUrl: string | undefined;
  restaurantLocation: string | undefined;
  priceLevel: number | undefined;
  reviewCount: number | undefined;
  review: string | undefined;
  reviewer: string | undefined;

  constructor(
    restaurantId: number | undefined,
    restaurantName: string | undefined,
    coverImage: string | undefined,
    averageRating: number | undefined,
    googleMapUrl: string | undefined,
    restaurantLocation: string | undefined,
    priceLevel: number | undefined,
    reviewCount: number | undefined,
    review: string | undefined,
    reviewer: string | undefined,
  ) {
    this.restaurantId = restaurantId;
    this.restaurantName = restaurantName;
    this.coverImage = coverImage;
    this.averageRating = averageRating;
    this.googleMapUrl = googleMapUrl;
    this.restaurantLocation = restaurantLocation;
    this.priceLevel = priceLevel;
    this.reviewCount = reviewCount;
    this.review = review;
    this.reviewer = reviewer;
  }
}

export default HomePageDTO;
