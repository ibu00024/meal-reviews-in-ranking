import {Transform} from "class-transformer";

class MinioConfig {
    MINIO_ENDPOINT: string | undefined;
    MINIO_PORT: number | undefined;
    MINIO_USERNAME: string | undefined;
    MINIO_PASSWORD: string | undefined;
    @Transform(({ value }) => value === "true")
    USE_SSL: boolean = false;
}

export default MinioConfig;
