class HomePageDTO {
  restaurantId: number | undefined;
  restaurantName: string | undefined;
  coverImage: string | undefined;
  averageRating: number | undefined;
  googleMapUrl: string | undefined;
  restaurantLocation: string | undefined;
  phone_number: string | undefined;
  price_level: number | undefined;
  reviewCount: number | undefined;

  constructor(
    restaurantId: number | undefined,
    restaurantName: string | undefined,
    coverImage: string | undefined,
    averageRating: number | undefined,
    googleMapUrl: string | undefined,
    restaurantLocation: string | undefined,
    phone_number: string | undefined,
    price_level: number | undefined,
    reviewCount: number | undefined,
  ) {
    this.restaurantId = restaurantId;
    this.restaurantName = restaurantName;
    this.coverImage = coverImage;
    this.averageRating = averageRating;
    this.googleMapUrl = googleMapUrl;
    this.restaurantLocation = restaurantLocation;
    this.phone_number = phone_number;
    this.price_level = price_level;
    this.reviewCount = reviewCount;
  }
}

export default HomePageDTO;
