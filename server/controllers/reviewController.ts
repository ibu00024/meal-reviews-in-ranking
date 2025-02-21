import { inject, injectable } from "inversify";
import ReviewService from "../services/reviewService";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import RestaurantService from "../services/restaurantService";
import ReviewSubmitDTO from "../models/DTO/reviewSubmitDTO";
import { Request, Response } from "express";
import reviewService from "../services/reviewService";

@injectable()
class ReviewController {
  private reviewService: ReviewService;

  constructor(
    @inject(SERVICE_IDENTIFIER.REVIEW_SERVICE)
    reviewService: ReviewService,
  ) {
    this.reviewService = reviewService;

    this.submitReview = this.submitReview.bind(this);
  }

  public async submitReview(req: Request, res: Response) {
    try {
      const reviewDTO = ReviewSubmitDTO.fromBody(req.body);
      await this.reviewService.submitReview(reviewDTO);
      res
        .status(200)
        .json({ success: true, data: "review submitted successfully" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: (error as Error).message,
      });
    }
  }
}
export default ReviewController;
