import { Repository } from "typeorm";
import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import MySQLConnection from "../utils/mySQLConnection";
import { Review } from "../models/review";

@injectable()
class ReviewRepository {
  private reviewRepo: Repository<Review>;

  constructor(
    @inject(SERVICE_IDENTIFIER.MYSQL_CONNECTION)
    mysqlConnection: MySQLConnection,
  ) {
    const connection = mysqlConnection.getConnection();
    this.reviewRepo = connection.getRepository(Review);
  }
}

export default ReviewRepository;
