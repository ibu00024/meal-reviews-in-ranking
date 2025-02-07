import { Repository } from "typeorm";
import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import { Restaurant } from "../models/restaurant";
import MySQLConnection from "../utils/mySQLConnection";
import {Review} from "../models/review";

@injectable()
class RestaurantRepository {
  private restaurantRepo: Repository<Restaurant>;
  private reviewRepo: Repository<Review>;

  constructor(
    @inject(SERVICE_IDENTIFIER.MYSQL_CONNECTION)
    mysqlConnection: MySQLConnection,
  ) {
    const connection = mysqlConnection.getConnection();
    this.restaurantRepo = connection.getRepository(Restaurant);
    this.reviewRepo = connection.getRepository(Review);
  }

  public async getAllRestaurants() {
    console.log(this.restaurantRepo.createQueryBuilder("review")
        .leftJoinAndSelect("review.restaurant", "restaurant") // ✅ Join restaurant
        .leftJoinAndSelect("review.category", "category") // ✅ Join category
        .getMany());
    return await this.reviewRepo.find();
  }
}

export default RestaurantRepository;
