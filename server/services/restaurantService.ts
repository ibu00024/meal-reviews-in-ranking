import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import RestaurantRepository from "../repositories/restaurantRepository";
import { Restaurant } from "../models/restaurant";
import HomePageDTO from "../models/DTO/homePageDTO";
import Config from "../config/config";
import { Review } from "../models/review";
import ReviewDTO from "../models/DTO/reviewDTO";
import ReviewPageDTO from "../models/DTO/reviewPageDTO";

@injectable()
class RestaurantService {
  private restaurantRepository: RestaurantRepository;
  private config: Config;

  constructor(
    @inject(SERVICE_IDENTIFIER.RESTAURANT_REPOSITORY)
    restaurantRepository: RestaurantRepository,
    @inject(SERVICE_IDENTIFIER.CONFIG)
    config: Config,
  ) {
    this.restaurantRepository = restaurantRepository;
    this.config = config;
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

  private getReviewsDTO(reviews: Review[]) {
    return reviews.map((review) => {
      return new ReviewDTO(
        review.review_id,
        review.name,
        review.reviewer_name,
        review.rating,
        review.price,
        review.comment,
        review.picture_url,
      );
    });
  }

  private getReviewPageDTO(restaurant: Restaurant) {
    const coverImage = this.getCoverImageUrl(restaurant);
    const averageRating = this.calculateAverageReview(restaurant);
    const restaurantAddress = this.getRestaurantAddress(restaurant);
    const reviewDTO = this.getReviewsDTO(restaurant.reviews);
    return new ReviewPageDTO(
      restaurant.restaurant_id,
      restaurant.name,
      coverImage,
      averageRating,
      restaurant.location,
      restaurantAddress,
      restaurant.lat,
      restaurant.lon,
      reviewDTO,
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

  public async completeRestaurantData2(restaurants: HomePageDTO[]) {
    for (const restaurant of restaurants) {
      restaurant.coverImage =
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcooking.nytimes.com%2Frecipes%2F1024748-shoyu-ramen&psig=AOvVaw1eoZWpT4yAjDHJQ94ZUO2s&ust=1739004242862000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjx6OiVsYsDFQAAAAAdAAAAABAE";
      restaurant.restaurantLocation = "Tokyo, Japan";
    }
    return restaurants;
  }

  public async searchRestaurant(keyword: string) {
    const searchLimitSize = this.config.serverConfig.SEARCH_LIMIT;
    return await this.restaurantRepository.searchRestaurants(
      keyword,
      searchLimitSize,
    );
  }
}

export default RestaurantService;
