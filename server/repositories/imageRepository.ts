import {inject, injectable} from "inversify";
import {Client} from "minio";
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
            this.config.minioConfig.MINIO_BUCKET || "review-image",
            objectName,
            image.buffer,
            image.size,
            { "Content-Type": image.mimetype }
        );
    }
}

export default ImageRepository;