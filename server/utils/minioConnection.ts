import "reflect-metadata";

import SERVICE_IDENTIFIER from "../constants/identifiers";
import { inject, injectable } from "inversify";
import Config from "../config/config";
import { Client } from "minio";
import * as fs from "node:fs";

@injectable()
class MinioConnection {
  private minioClient: Client;
  private config: Config;

  constructor(@inject(SERVICE_IDENTIFIER.CONFIG) config: Config) {
    this.config = config;
    this.minioClient = new Client({
      endPoint: config.minioConfig.MINIO_ENDPOINT || "localhost", // Change to your MinIO server address
      port: config.minioConfig.MINIO_PORT || 9000, // MinIO default port
      useSSL: config.minioConfig.USE_SSL, // Change to `true` if using HTTPS
      accessKey: config.minioConfig.MINIO_USERNAME, // User (Access Key)
      secretKey: config.minioConfig.MINIO_PASSWORD, // Password (Secret Key)
    });

    try {
      this.minioClient.listBuckets().then((buckets) => {
        console.log("Connected to MinIO. Buckets:", buckets);
      });
    } catch (error) {
      console.error("MinIO Connection Failed:", error);
      throw error;
    }

    const bucketName = this.config.minioConfig.MINIO_BUCKET;
    this.minioClient
      .bucketExists(bucketName)
      .then((exists) => {
        if (!exists) {
          throw new Error(`Bucket "${bucketName}" does not exist.`);
        }
      })
      .then(() => {
        this.setPublicBucketPolicy();
      });
  }

  public getClient(): Client {
    return this.minioClient;
  }

  private async setPublicBucketPolicy() {
    const bucketName = this.config.minioConfig.MINIO_BUCKET;
    try {
      const policy = fs.readFileSync(
        this.config.minioConfig.BUCKET_POLICY_FILE_PATH,
        "utf8",
      );
      await this.minioClient.setBucketPolicy(bucketName, policy);
      console.log(`Public read access enabled for bucket: ${bucketName}`);
    } catch (error) {
      console.error("Failed to set public access policy:", error);
      throw error;
    }
  }
}

export default MinioConnection;
