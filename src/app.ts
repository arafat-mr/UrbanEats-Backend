import express, { Application, Request, Response } from "express";
import { MealRouters } from "./modules/meals/meals.routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

import cors from "cors";
import { ProvidersRouter } from "./modules/providers/providers.routes";
import { AdminRoutes } from "./modules/admin/admin.routes";
import { AuthRouter } from "./modules/authMe/auth.routes";
import { middleWare, UserRole } from "./middlewares/middleware";
import { OrderController } from "./modules/orders/orders.controller";
import { OrderRoutes } from "./modules/orders/orders.routes";
import { ReviewsRouter } from "./modules/reviews/reviews.routes";
import notFound from "./middlewares/notFound";
const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin:  process.env.APP_URL || "http://localhost:4000",
    credentials: true,
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));


app.use('/api/me',AuthRouter)
// Meals
app.use("/api/provider/meals", MealRouters);

//providers

app.use('/api/providers',ProvidersRouter)


// admin

app.use('/api/admin',AdminRoutes)

// orders 

app.use('/orders',OrderRoutes)


//reviews
app.use('/reviews',ReviewsRouter)


// not found

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from UrbanEats");
});
app.use(notFound)

export default app;
