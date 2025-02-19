import express from "express";
import container from "../config/ioc_config";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import CategoryController from "../controllers/categoryController";

const categoryRouter = express.Router();
const categoryController = container.get<CategoryController>(
  SERVICE_IDENTIFIER.CATEGORY_CONTROLLER,
);

categoryRouter.get("/", categoryController.getAllCategories);

export default categoryRouter;
