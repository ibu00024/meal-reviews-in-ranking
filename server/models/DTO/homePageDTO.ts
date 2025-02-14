class HomePageDTO {
  restaurantId: number | undefined;
  restaurantName: string | undefined;
  coverImage: string | undefined;
  averageRating: number | undefined;
  googleMapUrl: string | undefined;
  restaurantLocation: string | undefined;

  constructor(
    restaurantId: number | undefined,
    restaurantName: string | undefined,
    coverImage: string | undefined,
    averageRating: number | undefined,
    googleMapUrl: string | undefined,
    restaurantLocation: string | undefined,
  ) {
    this.restaurantId = restaurantId;
    this.restaurantName = restaurantName;
    this.coverImage = coverImage;
    this.averageRating = averageRating;
    this.googleMapUrl = googleMapUrl;
    this.restaurantLocation = restaurantLocation;
  }
}

export default HomePageDTO;
