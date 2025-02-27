import ReviewDTO from "./reviewDTO";
import { Column } from "typeorm";

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
  address: string | undefined;
  phone_number: string | undefined;
  delivery: boolean | undefined;
  dine_in: boolean | undefined;
  open_hour: string[];
  price_level: number | undefined;

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
    address: string | undefined,
    phone_number: string | undefined,
    delivery: boolean | undefined,
    dine_in: boolean | undefined,
    open_hour: string[],
    price_level: number | undefined,
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
    this.address = address;
    this.phone_number = phone_number;
    this.delivery = delivery;
    this.dine_in = dine_in;
    this.open_hour = open_hour;
    this.price_level = price_level;
  }
}

export default ReviewPageDTO;
