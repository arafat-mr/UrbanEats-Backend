import express, { Application, Request, Response } from "express";
import { MealRouters } from "./modules/meals/meals.routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

import cors from "cors";
const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin:  process.env.APP_URL || "http://localhost:4000",
    credentials: true,
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));

// Meals
app.use("/api/provider/meals", MealRouters);



app.get("/", (req: Request, res: Response) => {
  res.send("Hello from UrbanEats");
});

export default app;
