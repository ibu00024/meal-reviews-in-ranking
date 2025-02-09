import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import RestaurantRepository from "../repositories/restaurantRepository";
import { Restaurant } from "../models/restaurant";
import HomePageRestaurantData from "../models/homePageRestaurantData";
import Config from "../config/config";

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
    const restaurantWithAverageRating = this.calculateAverageRating(
      restaurantWithReviews,
    );
    return await this.completeRestaurantData(restaurantWithAverageRating);
  }

  public calculateAverageRating(restaurants: Restaurant[]) {
    const restaurantWithRating = restaurants.map((restaurant) => {
      const averageReview =
        restaurant.reviews
          .map((review) => review.rating)
          .reduce((sum, rating) => sum + rating, 0) / restaurant.reviews.length;
      return new HomePageRestaurantData(
        restaurant.restaurant_id,
        restaurant.name,
        undefined,
        averageReview,
        restaurant.location,
        undefined,
      );
    });

    return restaurantWithRating.sort(
      (a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0),
    );
  }

  public async completeRestaurantData(restaurants: HomePageRestaurantData[]) {
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
