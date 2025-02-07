import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import ImageService from "../services/imageService";

@injectable()
class ImageController {
  private imageService: ImageService;

  constructor(
    @inject(SERVICE_IDENTIFIER.IMAGE_SERVICE)
    imageService: ImageService,
  ) {
    this.uploadImage = this.uploadImage.bind(this);
    this.imageService = imageService;
  }

  public async uploadImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, message: "No image uploaded" });
        return;
      }

      const url = await this.imageService.uploadImage(req.file);

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        url: url,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}

export default ImageController;
