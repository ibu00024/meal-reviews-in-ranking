import {inject, injectable} from "inversify";
import ReviewRepository from "../repositories/reviewRepository";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import RestaurantRepository from "../repositories/restaurantRepository";
import ImageService from "./imageService";
import CategoryRepository from "../repositories/categoryRepository";
import ReviewSubmitDTO from "../models/DTO/reviewSubmitDTO";
import {Review} from "../models/review";
import {Restaurant} from "../models/restaurant";
import {Category} from "../models/category";

@injectable()
class ReviewService {
    private reviewRepository: ReviewRepository;
    private restaurantRepository: RestaurantRepository;
    private categoryRepository: CategoryRepository;
    private imageService: ImageService;

    constructor(
        @inject(SERVICE_IDENTIFIER.REVIEW_REPOSITORY)
        reviewRepository: ReviewRepository,
        @inject(SERVICE_IDENTIFIER.RESTAURANT_REPOSITORY)
        restaurantRepository: RestaurantRepository,
        @inject(SERVICE_IDENTIFIER.CATEGORY_REPOSITORY)
        categoryRepository: CategoryRepository,
        @inject(SERVICE_IDENTIFIER.IMAGE_SERVICE)
        imageService: ImageService,
    ) {
        this.reviewRepository = reviewRepository;
        this.imageService = imageService;
        this.restaurantRepository = restaurantRepository;
        this.categoryRepository = categoryRepository;
    }

    public async submitReview(review: ReviewSubmitDTO): Promise<void> {
        if (!await this.imageService.isUrlValid(review.pictureURL || "")) {
            throw Error(`Invalid URL: ${review.restaurantId}`);
        }
        const reviewObject = await this.getReviewObject(review);
        await this.reviewRepository.insertReview(reviewObject)
    }

    public async getReviewObject(review: ReviewSubmitDTO): Promise<Review> {
        const restaurant = await this.restaurantRepository.getRestaurant(review.restaurantId);
        const category = await this.categoryRepository.getCategory(review.categoryId);
        if (!restaurant) {
            throw Error(`Invalid Restaurant ID: ${review.restaurantId}`);
        }
        if (!category) {
            throw Error(`Invalid Category ID: ${review.categoryId}`);
        }
        return {
            name: review.menuName,
            reviewer_name: review.reviewer || "",
            rating: review.rating,
            price: review.price,
            picture_url: review.pictureURL,
            comment: review.comments,
            restaurant: restaurant as unknown as Restaurant,
            category: category as unknown as Category,
        }
    }
}

export default ReviewService;