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
import { AnalyticsRouter } from "./modules/analytics/analytics.route";
const app: Application = express();

app.use(express.json());

// app.use(
//   cors({
//     origin:  process.env.APP_URL || "https://localhost:3000",
//     credentials: true
//   }),
// );

// Configure CORS to allow both production and Vercel preview deployments

const allowedOrigins = [

  process.env.APP_URL || "http://localhost:3000",

  process.env.PROD_APP_URL, // Production frontend URL

].filter(Boolean); // Remove undefined values

app.use(

  cors({

    origin: (origin, callback) => {

      // Allow requests with no origin (mobile apps, Postman, etc.)

      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern

      const isAllowed =

        allowedOrigins.includes(origin) ||

        /^https:\/\/urbaneats-frontend.*\.vercel\.app$/.test(origin) ||

        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {

        callback(null, true);

      } else {

        callback(new Error(`Origin ${origin} not allowed by CORS`));

      }

    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],

    exposedHeaders: ["Set-Cookie"],

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
 
// analytlics 

app.use('/analytics',AnalyticsRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from UrbanEats");
});
app.use(notFound)

export default app;
