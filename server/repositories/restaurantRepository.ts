import { Repository } from "typeorm";
import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import { Restaurant } from "../models/restaurant";
import MySQLConnection from "../utils/mySQLConnection";

@injectable()
class RestaurantRepository {
  private restaurantRepo: Repository<Restaurant>;

  constructor(
    @inject(SERVICE_IDENTIFIER.MYSQL_CONNECTION)
    mysqlConnection: MySQLConnection,
  ) {
    const connection = mysqlConnection.getConnection();
    this.restaurantRepo = connection.getRepository(Restaurant);
  }

  public async getAllRestaurantsWithReviews(): Promise<Restaurant[]> {
    return this.restaurantRepo.find({
      relations: ["reviews"],
    });
  }

  public async getRestaurant(restaurantId: number): Promise<Restaurant | null> {
    return this.restaurantRepo.findOne({
      relations: ["reviews"],
      where: [{ restaurant_id: restaurantId }],
    });
  }

  public async searchRestaurants(
    keyword: string,
    size: number,
  ): Promise<Restaurant[]> {
    return await this.restaurantRepo
      .createQueryBuilder("restaurant")
      .where(
        "MATCH (restaurant.name) AGAINST (:keyword IN NATURAL LANGUAGE MODE)",
        { keyword },
      )
      .limit(size)
      .getMany();
  }

  public async createRestaurant(data: Partial<Restaurant>): Promise<Restaurant> {
    const newRestaurant = this.restaurantRepo.create(data);
    return this.restaurantRepo.save(newRestaurant);
  }

  public async isRestaurantExist(restaurantId: number): Promise<Boolean> {
    const count = await this.restaurantRepo.count({ where: { restaurant_id: restaurantId } });
    return count > 0;
  }
}

export default RestaurantRepository;
