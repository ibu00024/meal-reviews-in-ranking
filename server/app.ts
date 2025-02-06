import container from "./config/ioc_config";
import SERVICE_IDENTIFIER from "./constants/identifiers";
import Config from "./config/config";
import express from "express";
import restaurantRoutes from "./routes/restaurantRoutes.js";

let config = container.get<Config>(SERVICE_IDENTIFIER.CONFIG)

const app = express();
app.use(express.json());

// Register routes
app.use("/api", restaurantRoutes);

const PORT = config.serverConfig.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));