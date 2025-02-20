import { inject, injectable } from "inversify";
import { Client, S3Error } from "minio";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import Config from "../config/config";
import MinioConnection from "../utils/minioConnection";

@injectable()
class ImageRepository {
  private minioClient: Client;
  private config: Config;

  constructor(
    @inject(SERVICE_IDENTIFIER.MINIO_CONNECTION)
    minioConnection: MinioConnection,
    @inject(SERVICE_IDENTIFIER.CONFIG)
    config: Config,
  ) {
    this.minioClient = minioConnection.getClient();
    this.config = config;
  }

  public async uploadImage(image: Express.Multer.File, objectName: string) {
    await this.minioClient.putObject(
      this.config.minioConfig.MINIO_BUCKET,
      objectName,
      image.buffer,
      image.size,
      { "Content-Type": image.mimetype },
    );
  }

  public getImageUrl(objectName: string): string {
    return `http://${this.config.minioConfig.MINIO_ENDPOINT}:${this.config.minioConfig.MINIO_PORT}/${this.config.minioConfig.MINIO_BUCKET}/${objectName}`;
  }

  public async isObjectExist(objectName: string): Promise<boolean> {
    try {
      await this.minioClient.statObject(
        this.config.minioConfig.MINIO_BUCKET,
        objectName,
      );
      return true;
    } catch (error: any) {
      if (error.code === "NotFound") {
        console.log("Object does not exist.");
        return false;
      }
      console.error("Error checking object existence:", error);
      throw error;
    }
  }
}

export default ImageRepository;
