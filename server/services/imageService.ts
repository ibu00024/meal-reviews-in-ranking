import { inject, injectable } from "inversify";
import ImageRepository from "../repositories/imageRepository";
import SERVICE_IDENTIFIER from "../constants/identifiers";

@injectable()
class ImageService {
  private imageRepository: ImageRepository;

  constructor(
    @inject(SERVICE_IDENTIFIER.IMAGE_REPOSITORY)
    imageRepository: ImageRepository,
  ) {
    this.imageRepository = imageRepository;
  }

  public async uploadImage(image: Express.Multer.File) {
    const identifier = this.generateId();
    await this.imageRepository.uploadImage(image, identifier);
    return this.imageRepository.getImageUrl(identifier);
  }

  public generateId(epoch: number = 1672531200000): string {
    const currentTimestamp = BigInt(Date.now());
    const timestampBits = (currentTimestamp - BigInt(epoch)) << BigInt(12); // ✅ Shift left 12 bits (instead of 22)

    const sequence = BigInt(Math.floor(Math.random() * 4096)); // ✅ Random sequence (0-4095)
    const id = timestampBits | sequence; // ✅ Remove machine ID bits

    return id.toString();
  }
}

export default ImageService;
