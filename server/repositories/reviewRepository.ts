import { Repository } from "typeorm";
import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import { Restaurant } from "../models/restaurant";
import MySQLConnection from "../utils/mySQLConnection";

@injectable()
class ReviewRepository {
    private restaurantRepo: Repository<Restaurant>;

    constructor(
        @inject(SERVICE_IDENTIFIER.MYSQL_CONNECTION)
        mysqlConnection: MySQLConnection,
    ) {
        const connection = mysqlConnection.getConnection();
        this.restaurantRepo = connection.getRepository(Restaurant);
    }

    public async getAllRestaurants() {
        console.log(this.restaurantRepo.createQueryBuilder("review")
            .leftJoinAndSelect("review.restaurant", "restaurant") // ✅ Join restaurant
            .leftJoinAndSelect("review.category", "category") // ✅ Join category
            .getMany());
        return await this.restaurantRepo.find();
    }
}

export default ReviewRepository;
