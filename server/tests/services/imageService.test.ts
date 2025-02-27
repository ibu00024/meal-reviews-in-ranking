import { anything, instance, mock, when } from "ts-mockito";
import ImageRepository from "../../repositories/imageRepository";
import ImageService from "../../services/imageService";
import Config from "../../config/config";

let imageRepositoryMock: ImageRepository;
let configMock: Config;
let imageService: ImageService;

beforeEach(() => {
  imageRepositoryMock = mock(ImageRepository);
  configMock = mock(Config);
  let imageRepositoryMockInstance = instance(imageRepositoryMock);
  let configMockInstance = instance(configMock);
  Object.defineProperty(configMockInstance, "minioConfig", {
    value: {
      MINIO_ENDPOINT: "127.0.0.1",
      MINIO_BUCKET: "test_bucket",
      BUCKET_POLICY_FILE_PATH: "",
      MINIO_PASSWORD: undefined,
      MINIO_USERNAME: undefined,
      USE_SSL: false,
      MINIO_PORT: 8000,
    },
    writable: true, // Allow modifications
  });
  imageService = new ImageService(
    imageRepositoryMockInstance,
    configMockInstance,
  );
});

describe("ImageService", () => {
  describe("isUrlValid", () => {
    test("Should return true when url is valid", async () => {
      when(imageRepositoryMock.isObjectExist(anything())).thenReturn(
        Promise.resolve(true),
      );
      expect(
        await imageService.isUrlValid(
          "http://127.0.0.1:8000/test_bucket/image.jpg",
        ),
      ).toBe(true);
    });
  });
});
