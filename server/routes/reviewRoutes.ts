import express from "express";
import container from "../config/ioc_config";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import ReviewController from "../controllers/reviewController";

const reviewRouter = express.Router();
const reviewController = container.get<ReviewController>(
  SERVICE_IDENTIFIER.REVIEW_CONTROLLER,
);

reviewRouter.post("/", reviewController.submitReview);

export default reviewRouter;
