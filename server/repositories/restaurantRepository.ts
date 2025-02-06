import {DataSource, Repository} from "typeorm";
import {inject, injectable} from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import {Restaurant} from "../models/restaurant";

@injectable()
class RestaurantRepository {
    private restaurantRepo: Repository<Restaurant>;

    constructor(
        @inject(SERVICE_IDENTIFIER.MYSQL_CONNECTION) private mysqlConnection: DataSource
    ) {
        this.restaurantRepo = mysqlConnection.getRepository(Restaurant);
    }

    public async getAllRestaurants() {
        return await this.restaurantRepo.find();
    }
}

export default RestaurantRepository;