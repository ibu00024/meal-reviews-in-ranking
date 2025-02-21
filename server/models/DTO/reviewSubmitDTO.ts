import { Review } from "../review";

class ReviewSubmitDTO {
  restaurantId!: number;
  categoryId!: number;
  pictureURL!: string;
  rating!: number;
  price!: number;
  menuName!: string;
  comments!: string;
  reviewer?: string;

  constructor(
    restaurantId: number,
    categoryId: number,
    imageURL: string,
    rating: number,
    price: number,
    menuName: string,
    comments: string,
    reviewer: string | undefined,
  ) {
    this.restaurantId = restaurantId;
    this.categoryId = categoryId;
    this.pictureURL = imageURL;
    this.rating = rating;
    this.price = price;
    this.menuName = menuName;
    this.comments = comments;
    this.reviewer = reviewer;
  }

  static fromBody(body: any): ReviewSubmitDTO {
    if (!body || typeof body !== "object") {
      throw new Error("Invalid request body format");
    }

    if (
      typeof body.restaurantId !== "number" ||
      typeof body.categoryId !== "number" ||
      typeof body.pictureURL !== "string" ||
      typeof body.rating !== "number" ||
      typeof body.price !== "number" ||
      typeof body.menuName !== "string" ||
      typeof body.comments !== "string"
    ) {
      throw new Error("Missing or invalid required fields");
    }

    return new ReviewSubmitDTO(
      body.restaurantId,
      body.categoryId,
      body.pictureURL,
      body.rating,
      body.price,
      body.menuName,
      body.comments,
      body.reviewer, // Optional field
    );
  }
}

export default ReviewSubmitDTO;
