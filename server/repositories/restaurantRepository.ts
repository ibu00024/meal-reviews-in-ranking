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
}

export default RestaurantRepository;
