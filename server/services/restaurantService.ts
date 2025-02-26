import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import RestaurantRepository from "../repositories/restaurantRepository";
import { Restaurant } from "../models/restaurant";
import HomePageDTO from "../models/DTO/homePageDTO";
import Config from "../config/config";
import { Review } from "../models/review";
import ReviewPageDTO from "../models/DTO/reviewPageDTO";
import MapService from "../services/mapService";
import { Place } from "../models/place_details_response";

@injectable()
class RestaurantService {
  private restaurantRepository: RestaurantRepository;
  private mapService: MapService;
  private config: Config;

  constructor(
    @inject(SERVICE_IDENTIFIER.RESTAURANT_REPOSITORY)
    restaurantRepository: RestaurantRepository,
    @inject(SERVICE_IDENTIFIER.CONFIG)
    config: Config,
    @inject(SERVICE_IDENTIFIER.MAP_SERVICE)
    mapService: MapService,
  ) {
    this.restaurantRepository = restaurantRepository;
    this.config = config;
    this.mapService = mapService;
  }

  public async getAllRestaurantByRanking() {
    const restaurantWithReviews =
      await this.restaurantRepository.getAllRestaurantsWithReviews();
    const filteredRestaurantWithReviews = this.validateRestaurantReviews(
      restaurantWithReviews,
    );
    return this.completeRestaurantData(filteredRestaurantWithReviews);
  }

  public async getRestaurantById(id: number) {
    const restaurantWithReview =
      await this.restaurantRepository.getRestaurant(id);
    if (!restaurantWithReview || restaurantWithReview.reviews.length === 0) {
      throw Error(`Restaurant with id ${id} not found`);
    }
    return this.getReviewPageDTO(restaurantWithReview);
  }

  private getReviewImages(reviews: Review[]) {
    return reviews
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 10)
      .map((review) => {
        return review.picture_url;
      });
  }

  private getReviewPageDTO(restaurant: Restaurant) {
    const coverImage = this.getCoverImageUrl(restaurant);
    const averageRating = this.calculateAverageReview(restaurant);
    const restaurantAddress = this.getRestaurantAddress(restaurant);
    const reviewImages = this.getReviewImages(restaurant.reviews);
    return new ReviewPageDTO(
      restaurant.restaurant_id,
      restaurant.name,
      coverImage,
      averageRating,
      restaurant.location,
      restaurantAddress,
      restaurant.lat,
      restaurant.lon,
      reviewImages,
      restaurant.address,
      restaurant.phone_number,
      restaurant.delivery,
      restaurant.dine_in,
      restaurant.open_date.split(";"),
      restaurant.price_level,
    );
  }

  public completeRestaurantData(restaurants: Restaurant[]) {
    const restaurantWithRating = restaurants.map((restaurant) => {
      const averageReview = this.calculateAverageReview(restaurant);
      const imageUrl = this.getCoverImageUrl(restaurant);
      const restaurantAddress = this.getRestaurantAddress(restaurant);
      return new HomePageDTO(
        restaurant.restaurant_id,
        restaurant.name,
        imageUrl,
        averageReview,
        restaurant.location,
        restaurantAddress,
      );
    });

    return restaurantWithRating.sort(
      (a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0),
    );
  }

  private getRestaurantAddress(restaurant: Restaurant) {
    return restaurant.city + ", " + restaurant.country;
  }

  private validateRestaurantReviews(restaurantData: Restaurant[]) {
    return restaurantData.filter((restaurant) => {
      return restaurant.reviews.length > 0;
    });
  }

  private getCoverImageUrl(restaurant: Restaurant) {
    const topReview = restaurant.reviews.sort((reviewA, reviewB) => {
      return reviewB.rating - reviewA.rating;
    });
    return topReview[0].picture_url;
  }

  private calculateAverageReview(restaurant: Restaurant) {
    return (
      restaurant.reviews
        .map((review) => review.rating)
        .reduce((sum, rating) => sum + rating, 0) / restaurant.reviews.length
    );
  }

  public async searchRestaurant(keyword: string) {
    const searchLimitSize = this.config.serverConfig.SEARCH_LIMIT;
    return await this.restaurantRepository.searchRestaurants(
      keyword,
      searchLimitSize,
    );
  }

  public async addRestaurant(restaurantData: Partial<Restaurant>) {
    if (!restaurantData.location) {
      throw new Error("Restaurant not found");
    }
    const restaurantDetails = await this.mapService.getPlaceDetails(
      restaurantData.location,
    );
    this.mapRestaurantDetails(restaurantData, restaurantDetails);

    return await this.restaurantRepository.createRestaurant(restaurantData);
  }

  private mapRestaurantDetails(
    restaurantData: Partial<Restaurant>,
    restaurantDetails: Place,
  ) {
    restaurantData.lat = restaurantDetails.geometry?.location.lat;
    restaurantData.lon = restaurantDetails.geometry?.location.lng;
    restaurantData.address = restaurantDetails.formatted_address;
    restaurantData.delivery = restaurantDetails.delivery ?? true;
    restaurantData.dine_in = restaurantDetails.dine_in ?? true;
    restaurantData.open_date =
      restaurantDetails.opening_hours?.weekday_text.join(";");
    restaurantData.country = restaurantDetails.address_components?.filter((x) =>
      x.types.includes("country"),
    )[0]?.long_name;
    restaurantData.city = restaurantDetails.address_components?.filter(
      (x) =>
        x.types.includes("administrative_area_level_3") ||
        x.types.includes("locality"),
    )[0]?.long_name;
    restaurantData.name = restaurantDetails.name;
    restaurantData.location = restaurantDetails.url;
    restaurantData.phone_number = restaurantDetails.international_phone_number;
    restaurantData.price_level = restaurantDetails.price_level;
  }
}

export default RestaurantService;
