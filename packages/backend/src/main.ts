import Express, { type Application } from "express";
import { config } from "dotenv";
import { env } from "./env";
import { expressMiddleware } from "./routes/trpc";

config();

const PORT = env.PORT;

const app: Application = Express();

app.use("/trpc", expressMiddleware);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
