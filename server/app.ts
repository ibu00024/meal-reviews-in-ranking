import "reflect-metadata";

import container from "./config/ioc_config";
import SERVICE_IDENTIFIER from "./constants/identifiers";
import Config from "./config/config";
import express from "express";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import MinioConnection from "./utils/minioConnection";
import imageRoutes from "./routes/imageRoutes";
import categoryRoutes from "./routes/categoryRoutes.js";
import reviewRouter from "./routes/reviewRoutes";

let config = container.get<Config>(SERVICE_IDENTIFIER.CONFIG);

const app = express();
app.use(express.json());

// Register routes
app.use("/restaurant", restaurantRoutes);
app.use("/image", imageRoutes);
app.use("/category", categoryRoutes);
app.use("/review", reviewRouter);

container.get<MinioConnection>(SERVICE_IDENTIFIER.MINIO_CONNECTION);

const PORT = config.serverConfig.PORT || 8000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
