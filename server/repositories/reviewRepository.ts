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

  public async insertReview(review: Review): Promise<void> {
    const result = await this.reviewRepo.insert(review);
    console.log("Inserted Review ID:", result.identifiers[0])
  }
}

export default ReviewRepository;
