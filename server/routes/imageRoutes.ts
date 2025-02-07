import express from "express";
import multer from "multer";
import container from "../config/ioc_config";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import ImageController from "../controllers/imageController";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const imageRoutes = express.Router();
const imageController = container.get<ImageController>(
  SERVICE_IDENTIFIER.IMAGE_CONTROLLER,
);

imageRoutes.post("/", upload.single("image"), imageController.uploadImage);

export default imageRoutes;
