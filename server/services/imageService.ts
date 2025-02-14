import { inject, injectable } from "inversify";
import ImageRepository from "../repositories/imageRepository";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import Config from "../config/config";
import MinioConfig from "../config/minioConfig";
import minioConfig from "../config/minioConfig";

@injectable()
class ImageService {
  private imageRepository: ImageRepository;
  private minioConfig: MinioConfig;

  constructor(
    @inject(SERVICE_IDENTIFIER.IMAGE_REPOSITORY)
    imageRepository: ImageRepository,
    @inject(SERVICE_IDENTIFIER.CONFIG)
    config: Config
  ) {
    this.imageRepository = imageRepository;
    this.minioConfig = config.minioConfig;
  }

  public async uploadImage(image: Express.Multer.File) {
    const identifier = this.generateId();
    await this.imageRepository.uploadImage(image, identifier);
    return this.imageRepository.getImageUrl(identifier);
  }

  public generateId(epoch: number = 1672531200000): string {
    const currentTimestamp = BigInt(Date.now());
    const timestampBits = (currentTimestamp - BigInt(epoch)) << BigInt(12);

    const sequence = BigInt(Math.floor(Math.random() * 4096));
    const id = timestampBits | sequence;

    return id.toString();
  }

  public async isUrlValid(url: string): Promise<boolean> {
    const extractedPath = this.extractMinioParts(url)
    const isObjectExist = await this.imageRepository.isObjectExist(extractedPath.object);
    return extractedPath &&
        extractedPath.endpoint == this.minioConfig.MINIO_ENDPOINT &&
        extractedPath.port == this.minioConfig.MINIO_PORT &&
        extractedPath.bucket == this.minioConfig.MINIO_BUCKET && isObjectExist
  }

  private extractMinioParts(url: string) {
    const urlPattern = /http:\/\/([^:]+):(\d+)\/([^\/]+)\/(.+)/;
    const match = url.match(urlPattern);

    if (!match) {
      throw new Error("Invalid MinIO URL format");
    }

    const [, endpoint, port, bucket, objectName] = match;

    return {
      endpoint: endpoint,
      port: Number(port),
      bucket: bucket,
      object: objectName
    };
  }
}

export default ImageService;
