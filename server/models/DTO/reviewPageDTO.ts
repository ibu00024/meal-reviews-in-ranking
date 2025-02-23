import ReviewDTO from "./reviewDTO";

class ReviewPageDTO {
  restaurantId: number | undefined;
  restaurantName: string | undefined;
  coverImage: string | undefined;
  averageRating: number | undefined;
  googleMapUrl: string | undefined;
  restaurantLocation: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  reviewImages: string[];

  constructor(
    restaurantId: number | undefined,
    restaurantName: string | undefined,
    coverImage: string | undefined,
    averageRating: number | undefined,
    googleMapUrl: string | undefined,
    restaurantLocation: string | undefined,
    latitude: number | undefined,
    longitude: number | undefined,
    reviewImages: string[],
  ) {
    this.restaurantId = restaurantId;
    this.restaurantName = restaurantName;
    this.coverImage = coverImage;
    this.averageRating = averageRating;
    this.googleMapUrl = googleMapUrl;
    this.restaurantLocation = restaurantLocation;
    this.latitude = latitude;
    this.longitude = longitude;
    this.reviewImages = reviewImages;
  }
}

export default ReviewPageDTO;
