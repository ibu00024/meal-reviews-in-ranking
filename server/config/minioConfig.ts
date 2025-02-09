import { Transform } from "class-transformer";

class MinioConfig {
  MINIO_ENDPOINT: string | undefined;
  MINIO_PORT: number | undefined;
  MINIO_USERNAME: string | undefined;
  MINIO_PASSWORD: string | undefined;
  MINIO_BUCKET: string = "review-image";
  @Transform(({ value }) => value === "true")
  USE_SSL: boolean = false;
  BUCKET_POLICY_FILE_PATH: string = "bucket-policy.json";
}

export default MinioConfig;
