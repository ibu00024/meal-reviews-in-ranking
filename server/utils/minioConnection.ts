import "reflect-metadata";

import SERVICE_IDENTIFIER from "../constants/identifiers";
import { inject, injectable } from "inversify";
import Config from "../config/config";
import {Client} from "minio";

@injectable()
class MinioConnection {
    private minioClient: Client;

    constructor(@inject(SERVICE_IDENTIFIER.CONFIG) config: Config) {
        this.minioClient = new Client({
            endPoint: config.minioConfig.MINIO_ENDPOINT || "localhost", // Change to your MinIO server address
            port: config.minioConfig.MINIO_PORT || 9000, // MinIO default port
            useSSL: config.minioConfig.USE_SSL, // Change to `true` if using HTTPS
            accessKey: config.minioConfig.MINIO_USERNAME, // User (Access Key)
            secretKey: config.minioConfig.MINIO_PASSWORD // Password (Secret Key)
        });

        try {
            this.minioClient.listBuckets().then(buckets => {
                console.log("Connected to MinIO. Buckets:", buckets);
            });
        } catch (error) {
            console.error("MinIO Connection Failed:", error);
            throw error;
        }
    }
}

export default MinioConnection;