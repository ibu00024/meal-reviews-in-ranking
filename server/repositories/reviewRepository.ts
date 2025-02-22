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
    const result = await this.reviewRepo.save(review);
    console.log("Saved Review ID:", review.review_id);
  }

  public async getReviewById(restaurantId: number): Promise<Review[]> {
    return await this.reviewRepo.find({
      where: { restaurant: { restaurant_id: restaurantId } },
      relations: ["restaurant", "category"],
    });
  }
}

export default ReviewRepository;
