// src/app.ts
import express6 from "express";

// src/modules/meals/meals.routes.ts
import express from "express";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id    String @id @default(uuid())\n  name  String @db.VarChar(250)\n  email String @unique\n\n  role      UserRole   @default(CUSTOMER)\n  image     String?\n  phone     String?\n  status    Status     @default(ACTIVE)\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n  orders    Order[]\n  providers Provider[]\n\n  emailVerified Boolean   @default(false)\n  sessions      Session[]\n  accounts      Account[]\n\n  @@map("Users")\n}\n\nmodel Provider {\n  id             String   @id @default(uuid())\n  userId         String\n  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  restaurantName String?\n  description    String?\n  address        String?\n  phone          String?\n  isApproved     Boolean  @default(true)\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n  meals          Meal[]\n\n  @@index([restaurantName])\n  @@map("Providers")\n}\n\nmodel Category {\n  id        String   @id @default(uuid())\n  name      String\n  slug      String?\n  isActive  Boolean  @default(true)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  image     String?\n  meals     Meal[]\n\n  @@index([name])\n  @@map("Categories")\n}\n\nmodel Meal {\n  id          String              @id @default(uuid())\n  providerId  String?\n  categoryId  String?\n  category    Category?           @relation(fields: [categoryId], references: [id])\n  provider    Provider?           @relation(fields: [providerId], references: [id], onDelete: Cascade)\n  name        String\n  description String\n  price       Int\n  image       String\n  isAvailable Boolean             @default(true)\n  createdAt   DateTime            @default(now())\n  updatedAt   DateTime            @updatedAt\n  reviews     Review[]\n  dietaryTags DietaryPreference[]\n  orderItems  OrderItem[]\n\n  @@index([providerId])\n  @@map("Meals")\n}\n\nmodel Order {\n  id              String      @id @default(uuid())\n  customerId      String\n  providerId      String\n  totalAmount     Int\n  user            User        @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  paymentMethod   String      @default("Cash On Delivery")\n  orderStatus     OrderStatus @default(CART)\n  deliveryAddress String\n  createdAt       DateTime    @default(now())\n  updatedAt       DateTime    @updatedAt\n  orderItems      OrderItem[]\n\n  @@index([providerId])\n  @@map("Orders")\n}\n\nmodel OrderItem {\n  id       String @id @default(uuid())\n  orderId  String\n  order    Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  mealId   String\n  meal     Meal   @relation(fields: [mealId], references: [id])\n  quantity Int\n  price    Int\n\n  @@index([orderId])\n  @@map("OrderItems")\n}\n\nmodel Review {\n  id         String   @id @default(uuid())\n  mealId     String\n  meal       Meal     @relation(fields: [mealId], references: [id], onDelete: Cascade)\n  customerId String\n  orderId    String?\n  rating     Int\n  comment    String?\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([mealId])\n  @@map("Reviews")\n}\n\nenum OrderStatus {\n  CART\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\nenum UserRole {\n  ADMIN\n  CUSTOMER\n  PROVIDER\n}\n\nenum Status {\n  ACTIVE\n  SUSPENDED\n}\n\nenum DietaryPreference {\n  VEGETARIAN\n\n  HALAL\n\n  VEGAN\n\n  GLUTEN_FREE\n\n  DAIRY_FREE\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"image","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"Status"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"providers","kind":"object","type":"Provider","relationName":"ProviderToUser"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"}],"dbName":"Users"},"Provider":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderToUser"},{"name":"restaurantName","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"isApproved","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProvider"}],"dbName":"Providers"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"image","kind":"scalar","type":"String"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":"Categories"},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"provider","kind":"object","type":"Provider","relationName":"MealToProvider"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Int"},{"name":"image","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"},{"name":"dietaryTags","kind":"enum","type":"DietaryPreference"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"}],"dbName":"Meals"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Int"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"paymentMethod","kind":"scalar","type":"String"},{"name":"orderStatus","kind":"enum","type":"OrderStatus"},{"name":"deliveryAddress","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":"Orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Int"}],"dbName":"OrderItems"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"Reviews"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/meals/meals.service.ts
var addMeal = async (data, userId) => {
  const provider = await prisma.provider.findFirst({
    where: { userId }
  });
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  const result = await prisma.meal.create({
    data: {
      ...data,
      providerId: provider.id
    }
  });
  return result;
};
var getMeal = async (payload) => {
  let categoryIds = void 0;
  if (payload.category) {
    const categories = await prisma.category.findMany({
      where: { name: { equals: payload.category, mode: "insensitive" } }
    });
    if (categories.length > 0) {
      categoryIds = categories.map((c) => c.id);
    } else {
      return {
        data: [],
        meta: {
          page: payload.page ?? 1,
          limit: payload.limit ?? 10,
          total: 0,
          totalPages: 0
        }
      };
    }
  }
  const whereCondition = {};
  if (payload.search) {
    whereCondition.name = { contains: payload.search, mode: "insensitive" };
  }
  if (categoryIds) {
    whereCondition.categoryId = { in: categoryIds };
  }
  if (payload.dietary) {
    whereCondition.dietaryTags = {
      has: payload.dietary
    };
  }
  if (payload.minPrice !== void 0 || payload.maxPrice !== void 0) {
    whereCondition.price = {};
    if (payload.minPrice !== void 0) whereCondition.price.gte = payload.minPrice;
    if (payload.maxPrice !== void 0) whereCondition.price.lte = payload.maxPrice;
  }
  const [meals, total] = await Promise.all([
    prisma.meal.findMany({
      where: whereCondition,
      skip: payload.skip ?? ((payload.page ?? 1) - 1) * (payload.limit ?? 10),
      take: payload.limit ?? 10,
      orderBy: {
        createdAt: "desc"
      }
    }),
    prisma.meal.count({ where: whereCondition })
  ]);
  return {
    data: meals,
    meta: {
      page: payload.page ?? 1,
      limit: payload.limit ?? 10,
      total,
      totalPages: Math.ceil(total / (payload.limit ?? 10))
    }
  };
};
var getMealById = async (mealId) => {
  return await prisma.meal.findUnique({
    where: {
      id: mealId
    },
    include: {
      provider: {
        select: {
          id: true,
          user: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
};
var getMyMeals = async (userId) => {
  const provider = await prisma.provider.findFirst({
    where: {
      userId
    }
  });
  if (!provider) {
    return [];
  }
  return await prisma.meal.findMany({
    where: {
      providerId: provider.id
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var deleteMeal = async (mealId) => {
  return await prisma.meal.delete({
    where: {
      id: mealId
    }
  });
};
var updateMeal = async (providerId, data, mealId) => {
  const mealdata = await prisma.meal.findFirst({
    where: {
      id: mealId
    },
    select: {
      id: true
    }
  });
  if (!mealdata) {
    throw new Error("No data exists");
  }
  return await prisma.meal.update({
    where: {
      id: mealId
    },
    data
  });
};
var MealService = {
  addMeal,
  getMeal,
  getMealById,
  getMyMeals,
  deleteMeal,
  updateMeal
};

// src/helper/paginationHelper.ts
var paginationHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  console.log(options);
  return {
    page,
    limit,
    skip
  };
};

// src/modules/meals/meals.controller.ts
var addMeal2 = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        message: "Unauthorized"
      });
    }
    const userstatus = await prisma.user.findFirst({
      where: {
        id: req.user.id
      }
    });
    if (userstatus?.status === "SUSPENDED") {
      return res.status(400).json({
        message: "you are suspended ,please contact admin"
      });
    }
    const result = await MealService.addMeal(req.body, req.user?.id);
    res.status(201).json(result);
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({
      error: error.message,
      message: "Error adding meal"
    });
  }
};
var getMeal2 = async (req, res) => {
  try {
    const { search, dietary, minPrice, maxPrice, category } = req.query;
    const searchValue = typeof search === "string" ? search : void 0;
    const categoryValue = typeof category === "string" ? category : void 0;
    const dietaryValue = typeof dietary === "string" ? dietary : void 0;
    const minPriceValue = minPrice ? parseInt(minPrice, 10) : void 0;
    const maxPriceValue = maxPrice ? parseInt(maxPrice, 10) : void 0;
    const { page, limit, skip } = paginationHelper(req.query);
    const result = await MealService.getMeal({ search: searchValue, category: categoryValue, dietary: dietaryValue, minPrice: minPriceValue, maxPrice: maxPriceValue, page: page ?? 1, limit: limit ?? 10, skip: skip ?? 0 });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Error adding meal"
    });
  }
};
var getMealById2 = async (req, res) => {
  try {
    const { mealId } = req.params;
    if (!mealId) {
      throw new Error("Post id is required");
    }
    const result = await MealService.getMealById(mealId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Error fetching meal by id"
    });
  }
};
var getMyMeals2 = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }
    const result = await MealService.getMyMeals(userId);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching meals",
      error: error.message
    });
  }
};
var deleteMeal2 = async (req, res) => {
  try {
    const { mealId } = req.params;
    const result = await MealService.deleteMeal(mealId);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Error deleting meal"
    });
  }
};
var updateMeal2 = async (req, res) => {
  try {
    const { mealId } = req.params;
    if (!req.user) {
      return res.status(400).json({
        message: "Unauthorized"
      });
    }
    const { id } = req.user;
    const result = await MealService.updateMeal(id, req.body, mealId);
    res.status(200).json({ success: true, message: "updated successfully", result });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Error fetching meal by id"
    });
  }
};
var MealController = {
  addMeal: addMeal2,
  getMeal: getMeal2,
  getMealById: getMealById2,
  updateMeal: updateMeal2,
  getMyMeals: getMyMeals2,
  deleteMeal: deleteMeal2
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: async (request) => {
    const origin = request?.headers.get("origin");
    const allowedOrigins2 = [
      process.env.APP_URL,
      process.env.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:5000",
      "https://urban-eats-backend.vercel.app",
      "https://urban-eats-frontend.vercel.app"
    ].filter(Boolean);
    if (!origin || allowedOrigins2.includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin)) {
      return [origin];
    }
    return [];
  },
  basePath: "/api/auth",
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      prompt: "select_account consent",
      accessType: "offline"
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: true,
    // useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: true
    },
    disableCSRFCheck: true
    // Allow requests without Origin header (Postman, mobile apps, etc.)
  }
});

// src/middlewares/middleware.ts
var middleWare = (...roles) => {
  return async (req, res, next) => {
    console.log("middleware");
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(400).json({
          success: false,
          message: "You are not authorized"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(400).json({
          success: false,
          message: "You are not authorized"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

// src/modules/meals/meals.routes.ts
var router = express.Router();
router.post("/", middleWare("PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */), MealController.addMeal);
router.get("/", MealController.getMeal);
router.get("/myMeals/:userId", middleWare("PROVIDER" /* PROVIDER */), MealController.getMyMeals);
router.get("/:mealId", MealController.getMealById);
router.patch("/:mealId", middleWare("PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */), MealController.updateMeal);
router.delete("/:mealId", middleWare("PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */), MealController.deleteMeal);
var MealRouters = router;

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

// src/modules/providers/providers.routes.ts
import express2 from "express";

// src/modules/providers/providers.service.ts
var getProviders = async (payload) => {
  const { limit, skip, page } = payload;
  const data = await prisma.provider.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc"
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true
        }
      }
    }
  });
  const total = await prisma.provider.count();
  const meta = {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  };
  return {
    data,
    meta
  };
};
var getProvidersById = async (providerId) => {
  return await prisma.provider.findUnique({
    where: {
      id: providerId
    },
    include: {
      user: {
        select: {
          name: true
        }
      },
      meals: {
        select: {
          id: true,
          name: true,
          image: true,
          description: true
        }
      }
    }
  });
};
var getOrdersByProvider = async (providerId) => {
  const provider = await prisma.provider.findFirst({
    where: {
      userId: providerId
    }
  });
  console.log(provider);
  if (!provider) {
    throw new Error("Provider not found");
  }
  return prisma.order.findMany({
    where: { providerId: provider.id },
    include: {
      orderItems: {
        include: { meal: true }
      },
      user: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: "desc" }
  });
};
var getOrdersByProviderByid = async (providerId) => {
  return await prisma.order.findFirst({
    where: {
      id: providerId
    }
  });
};
var mealStatusUpdate = async (orderId, status) => {
  const validStatuses = ["PREPARING", "READY", "DELIVERED", "CANCELLED"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid order status");
  }
  const order = await prisma.order.findFirst({
    where: {
      id: orderId
      // providerId,
    }
  });
  if (!order) {
    throw new Error("Order not found or does not belong to this provider");
  }
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { orderStatus: status },
    include: { orderItems: { include: { meal: true } }, user: true }
  });
  return updatedOrder;
};
var createProvider = async (userId) => {
  return await prisma.provider.create({
    data: { userId }
  });
};
var ProvidersService = {
  getProviders,
  getProvidersById,
  getOrdersByProvider,
  getOrdersByProviderByid,
  mealStatusUpdate,
  createProvider
};

// src/modules/providers/providers.controller.ts
var getProviders2 = async (req, res) => {
  try {
    const { page, limit, skip } = paginationHelper(req.query);
    const providers = await ProvidersService.getProviders({ page: page ?? 1, limit: limit ?? 10, skip: skip ?? 0 });
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch providers",
      error: error.message
    });
  }
};
var getProvidersById2 = async (req, res) => {
  try {
    const { providerId } = req.params;
    if (!providerId) {
      throw new Error("Provider id is required");
    }
    const result = await ProvidersService.getProvidersById(providerId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Error fetching provider by id"
    });
  }
};
var getOrdersForProvider = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const orders = await ProvidersService.getOrdersByProvider(userId);
    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
var getOrdersByProviderByid2 = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ProvidersService.getOrdersByProviderByid(id);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Error fetching orders by id"
    });
  }
};
var mealStatusUpdate2 = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { id: orderId } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }
    const updatedOrder = await ProvidersService.mealStatusUpdate(
      orderId,
      status
    );
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
var createProvider2 = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required"
      });
    }
    const result = await ProvidersService.createProvider(userId);
    res.status(201).json({
      success: true,
      message: "Provider created successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error creating provider"
    });
  }
};
var ProvidersController = {
  getProviders: getProviders2,
  getProvidersById: getProvidersById2,
  getOrdersForProvider,
  getOrdersByProviderByid: getOrdersByProviderByid2,
  mealStatusUpdate: mealStatusUpdate2,
  createProvider: createProvider2
};

// src/modules/providers/providers.routes.ts
var router2 = express2.Router();
router2.get("/", ProvidersController.getProviders);
router2.get(
  "/my-orders",
  middleWare("PROVIDER" /* PROVIDER */),
  ProvidersController.getOrdersForProvider
);
router2.get("/my-orders/:id", ProvidersController.getOrdersByProviderByid);
router2.get("/:providerId", ProvidersController.getProvidersById);
router2.patch(
  "/orders/update/:id",
  middleWare("PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */),
  ProvidersController.mealStatusUpdate
);
router2.post("/", ProvidersController.createProvider);
var ProvidersRouter = router2;

// src/modules/admin/admin.routes.ts
import express3 from "express";

// src/modules/admin/admin.service.ts
var getUsers = async (payload) => {
  const { page = 1, limit = 10, skip = (page - 1) * limit } = payload;
  const [data, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    }),
    prisma.user.count()
  ]);
  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var updateUserstatus = async (userId, status) => {
  if (!status) {
    throw new Error("Status is required");
  }
  const userData = await prisma.user.findFirst({
    where: {
      id: userId
    },
    select: {
      id: true
    }
  });
  if (!userData) {
    throw new Error("No user found");
  }
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      status
    }
  });
};
var getOrders = async (payload) => {
  const { page = 1, limit = 10, skip = (page - 1) * limit } = payload;
  const [data, total] = await Promise.all([
    prisma.order.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        orderItems: {
          include: {
            meal: {
              select: {
                id: true,
                name: true
                // include meal name
              }
            }
          }
        },
        user: { select: { id: true, name: true, email: true } }
      }
    }),
    prisma.order.count()
  ]);
  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var getCategories = async (payload) => {
  const { page = 1, limit = 10, skip = (page - 1) * limit } = payload;
  const [data, total] = await Promise.all([
    prisma.category.findMany({
      skip,
      take: limit,
      orderBy: { name: "asc" },
      select: { id: true, name: true }
    }),
    prisma.category.count()
  ]);
  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var updateCategory = async (id, data) => {
  try {
    const updated = await prisma.category.update({
      where: { id },
      data
    });
    return updated;
  } catch (err) {
    if (err.code === "P2025") return null;
    throw err;
  }
};
var deleteCategory = async (id) => {
  try {
    const deleted = await prisma.category.delete({
      where: { id }
    });
    return deleted;
  } catch (err) {
    if (err.code === "P2025") return null;
    throw err;
  }
};
var AdminService = {
  getUsers,
  updateUserstatus,
  getOrders,
  getCategories,
  updateCategory,
  deleteCategory
};

// src/modules/admin/admin.controller.ts
var getUsers2 = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN" /* ADMIN */)
      return res.status(403).json({ message: "Unauthorized" });
    const { page, limit, skip } = paginationHelper(req.query);
    const result = await AdminService.getUsers({ page, limit, skip });
    res.status(200).json({
      success: true,
      message: "Users fetched",
      result
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
var updateUserstatus2 = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    const adminId = req.user?.id;
    if (typeof adminId !== "string") {
      return res.status(400).json({ message: "Invalid userId" });
    }
    const adminData = await prisma.user.findUnique({
      where: {
        id: adminId
      }
    });
    console.log({ adminData });
    if (adminData?.role !== "ADMIN" /* ADMIN */) {
      throw new Error("You are not authorized");
    }
    const updated = await AdminService.updateUserstatus(userId, status);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getOrders2 = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const { page, limit, skip } = paginationHelper(req.query);
    const result = await AdminService.getOrders({ page, limit, skip });
    res.status(200).json({
      success: true,
      message: "Orders fetched",
      result
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};
var getCategories2 = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const { page, limit, skip } = paginationHelper(req.query);
    const result = await AdminService.getCategories({ page, limit, skip });
    res.status(200).json({
      success: true,
      message: "Categories fetched",
      result
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};
var updateCategory2 = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updated = await AdminService.updateCategory(id, { name });
    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ message: "Category updated", data: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AdminService.deleteCategory(id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
var AdminContoller = {
  getUsers: getUsers2,
  updateUserstatus: updateUserstatus2,
  getOrders: getOrders2,
  getCategories: getCategories2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/admin/admin.routes.ts
var router3 = express3.Router();
router3.get("/users", middleWare("ADMIN" /* ADMIN */), AdminContoller.getUsers);
router3.patch("/users/:userId", middleWare("ADMIN" /* ADMIN */), AdminContoller.updateUserstatus);
router3.get("/orders", middleWare("ADMIN" /* ADMIN */), AdminContoller.getOrders);
router3.get("/categories", middleWare("ADMIN" /* ADMIN */), AdminContoller.getCategories);
router3.patch(
  "/categories/:id",
  middleWare("ADMIN" /* ADMIN */),
  AdminContoller.updateCategory
);
router3.delete("/categories/:id", middleWare("ADMIN" /* ADMIN */), AdminContoller.deleteCategory);
var AdminRoutes = router3;

// src/modules/authMe/auth.routes.ts
import express4 from "express";

// src/modules/authMe/auth.service.ts
var getCurrentUser = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
};
var updateCurrentUser = async (id, payload) => {
  return prisma.user.update({
    where: { id },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      image: true
    }
  });
};
var AuthService = {
  getCurrentUser,
  updateCurrentUser
};

// src/modules/authMe/auth.controller.ts
var getCurrentUser2 = async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const result = await AuthService.getCurrentUser(req.user.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var updateCurrentUser2 = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.id;
    const { name, phone, image } = req.body;
    const result = await AuthService.updateCurrentUser(userId, {
      name,
      phone,
      image
    });
    res.status(200).json({
      message: "Profile updated successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var Authcontroller = {
  getCurrentUser: getCurrentUser2,
  updateCurrentUser: updateCurrentUser2
};

// src/modules/authMe/auth.routes.ts
var router4 = express4.Router();
router4.get("/", middleWare("CUSTOMER" /* CUSTOMER */, "ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */), Authcontroller.getCurrentUser);
router4.patch("/update", middleWare("CUSTOMER" /* CUSTOMER */, "ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */), Authcontroller.updateCurrentUser);
var AuthRouter = router4;

// src/modules/orders/orders.routes.ts
import { Router as Router5 } from "express";

// src/modules/orders/orders.service.ts
var createOrder = async (customerId, payload) => {
  const { providerId, deliveryAddress, items } = payload;
  const mealIds = items.map((item) => item.mealId);
  const meals = await prisma.meal.findMany({
    where: { id: { in: mealIds }, isAvailable: true }
  });
  if (meals.length !== items.length) {
    throw new Error("Invalid or unavailable meal selected");
  }
  let totalAmount = 0;
  const orderItemsData = items.map((item) => {
    const meal = meals.find((meal2) => meal2.id === item.mealId);
    totalAmount += meal.price * item.quantity;
    return { mealId: meal.id, quantity: item.quantity, price: meal.price };
  });
  const order = await prisma.$transaction(
    async (tx) => tx.order.create({
      data: {
        customerId,
        providerId,
        deliveryAddress,
        totalAmount,
        orderItems: { create: orderItemsData }
      },
      include: { orderItems: true }
    })
  );
  return order;
};
var getMyOrders = async (customerId) => {
  return prisma.order.findMany({
    where: { customerId },
    include: {
      orderItems: {
        include: { meal: true }
      }
    },
    // orderBy: { createdAt: "desc" },
    orderBy: { id: "desc" }
  });
};
var placeOrder = async (customerId, orderId, updateData) => {
  const order = await prisma.order.findFirst({
    where: { id: orderId, customerId, orderStatus: "CART" },
    include: { orderItems: true }
  });
  if (!order) throw new Error("Order not found or already placed");
  if (updateData?.deliveryAddress) {
    order.deliveryAddress = updateData.deliveryAddress;
  }
  if (updateData?.items) {
    for (const item of updateData.items) {
      const orderItem = order.orderItems.find((oi) => oi.mealId === item.mealId);
      if (orderItem) {
        orderItem.quantity = item.quantity;
      } else {
        throw new Error(`Meal ${item.mealId} not found in order`);
      }
    }
  }
  const totalAmount = order.orderItems.reduce((sum, oi) => sum + oi.price * oi.quantity, 0);
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      orderStatus: "PLACED",
      deliveryAddress: order.deliveryAddress,
      totalAmount,
      orderItems: {
        update: order.orderItems.map((oi) => ({
          where: { id: oi.id },
          data: { quantity: oi.quantity }
        }))
      }
    },
    include: { orderItems: true }
  });
  return updatedOrder;
};
var cancelOrder = async (customerId, orderId) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId,
      orderStatus: { in: ["CART", "PLACED"] }
    }
  });
  if (!order) {
    throw new Error("Order cannot be canceled or not found");
  }
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { orderStatus: "CANCELLED" }
  });
  return updatedOrder;
};
var updateOrderStatus = async (orderId, status) => {
  const validStatuses = ["PREPARING", "READY", "DELIVERED", "CANCELLED"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid order status");
  }
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { orderStatus: status }
  });
  return updatedOrder;
};
var deleteOrder = async (customerId, orderId) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId,
      orderStatus: "CANCELLED"
    }
  });
  if (!order) {
    throw new Error("Order not found or cannot be deleted");
  }
  const deletedOrder = await prisma.order.delete({
    where: { id: orderId }
  });
  return deletedOrder;
};
var OrderService = {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  placeOrder,
  cancelOrder,
  deleteOrder
};

// src/modules/orders/orders.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const customerId = req.user?.id;
    const payload = req.body;
    const order = await OrderService.createOrder(customerId, payload);
    res.status(201).json({
      success: true,
      message: "Saved to cart successfully",
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add to cart"
    });
  }
};
var getMyOrders2 = async (req, res) => {
  try {
    const customerId = req.user?.id;
    console.log(req.user);
    const orders = await OrderService.getMyOrders(customerId);
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch orders"
    });
  }
};
var placeOrder2 = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { orderId } = req.params;
    const { deliveryAddress, items } = req.body;
    const order = await OrderService.placeOrder(customerId, orderId, { deliveryAddress, items });
    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      data: order
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
var cancelCustomerOrder = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { orderId } = req.params;
    const order = await OrderService.cancelOrder(customerId, orderId);
    return res.status(200).json({
      success: true,
      message: "Order canceled successfully",
      data: order
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
var updateOrderStatus2 = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: status }
    });
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
var deleteCustomerOrder = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { orderId } = req.params;
    const deletedOrder = await OrderService.deleteOrder(customerId, orderId);
    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: deletedOrder
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
var OrderController = {
  createOrder: createOrder2,
  getMyOrders: getMyOrders2,
  updateOrderStatus: updateOrderStatus2,
  placeOrder: placeOrder2,
  cancelCustomerOrder,
  deleteCustomerOrder
};

// src/modules/orders/orders.routes.ts
var router5 = Router5();
router5.post("/", middleWare("CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */), OrderController.createOrder);
router5.get("/my-orders", middleWare("CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */), OrderController.getMyOrders);
router5.patch("/status/:orderId", middleWare("ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */), OrderController.updateOrderStatus);
router5.patch("/place/:orderId", middleWare("CUSTOMER" /* CUSTOMER */), OrderController.placeOrder);
router5.patch("/cancel/:orderId", middleWare("CUSTOMER" /* CUSTOMER */), OrderController.cancelCustomerOrder);
router5.delete("/delete/:orderId", middleWare("CUSTOMER" /* CUSTOMER */), OrderController.deleteCustomerOrder);
var OrderRoutes = router5;

// src/modules/reviews/reviews.routes.ts
import { Router as Router6 } from "express";

// src/modules/reviews/reviews.service.ts
var canReviewMeal = async (customerId, mealId) => {
  const orderItem = await prisma.orderItem.findFirst({
    where: {
      mealId,
      order: {
        customerId,
        orderStatus: "DELIVERED"
      }
    },
    select: {
      orderId: true
    }
  });
  return orderItem?.orderId || null;
};
var createReview = async ({
  customerId,
  mealId,
  orderId,
  rating,
  comment
}) => {
  const orderItem = await prisma.orderItem.findFirst({
    where: {
      mealId,
      orderId,
      order: { customerId, orderStatus: "DELIVERED" }
    }
  });
  if (!orderItem) {
    throw new Error("You can only review meals you have purchased and delivered.");
  }
  const review = await prisma.review.create({
    data: {
      mealId,
      orderId,
      customerId,
      rating,
      comment: comment || null
    }
  });
  return review;
};
var getMealReviews = async (mealId) => {
  const reviews = await prisma.review.findMany({
    where: { mealId },
    orderBy: { createdAt: "desc" }
  });
  const customerIds = [...new Set(reviews.map((review) => review.customerId))];
  const customers = await prisma.user.findMany({
    where: { id: { in: customerIds } },
    select: { id: true, name: true }
  });
  const reviewsWithCustomer = reviews.map((r) => ({
    ...r,
    customer: customers.find((c) => c.id === r.customerId) || { name: "Unknown" }
  }));
  return reviewsWithCustomer;
};
var getHotDeals = async () => {
  const hotMeals = await prisma.review.findMany({
    orderBy: { rating: "desc" },
    take: 3,
    include: { meal: true }
  });
  return hotMeals;
};
var ReviewsService = {
  canReviewMeal,
  createReview,
  getMealReviews,
  getHotDeals
};

// src/modules/reviews/reviews.controller.ts
var canReview = async (req, res) => {
  try {
    const customerId = req.user?.id;
    const { mealId } = req.params;
    if (!customerId) {
      return res.status(401).json({ canReview: false });
    }
    const orderId = await ReviewsService.canReviewMeal(
      customerId,
      mealId
    );
    if (!orderId) {
      return res.json({ canReview: false, orderId: null });
    }
    return res.json({ canReview: true, orderId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
var createReview2 = async (req, res) => {
  try {
    const customerId = req.user?.id;
    if (!customerId) return res.status(401).json({ message: "Unauthorized" });
    const { mealId, orderId, rating, comment } = req.body;
    const review = await ReviewsService.createReview({
      customerId,
      mealId,
      orderId,
      rating,
      comment
    });
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};
var getMealReviews2 = async (req, res) => {
  try {
    const { mealId } = req.params;
    if (!mealId) return res.status(400).json({ message: "mealId is required" });
    const reviews = await ReviewsService.getMealReviews(mealId);
    res.status(200).json({ data: reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
var getHotDeals2 = async (req, res) => {
  try {
    const result = await ReviewsService.getHotDeals();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var ReviewsController = {
  canReview,
  createReview: createReview2,
  getMealReviews: getMealReviews2,
  getHotDeals: getHotDeals2
};

// src/modules/reviews/reviews.routes.ts
var router6 = Router6();
router6.get("/hot-deals", ReviewsController.getHotDeals);
router6.get("/can-review/:mealId", middleWare("CUSTOMER" /* CUSTOMER */), ReviewsController.canReview);
router6.post("/", middleWare("CUSTOMER" /* CUSTOMER */), ReviewsController.createReview);
router6.get("/meal/:mealId", middleWare("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */), ReviewsController.getMealReviews);
var ReviewsRouter = router6;

// src/middlewares/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    date: Date()
  });
}

// src/modules/analytics/analytics.route.ts
import express5 from "express";

// src/modules/analytics/analytics.service.ts
var getAdminAnalytics = async () => {
  return await prisma.$transaction(
    async (tx) => {
      const totalUsers = await prisma.user.count();
      const totalOrders = await prisma.order.count();
      const totalProviders = await prisma.provider.count();
      return {
        totalOrders,
        totalUsers,
        totalProviders
      };
    }
  );
};
var getCustomerAnalytics = async (customerId) => {
  const orders = await prisma.order.findMany({
    where: {
      customerId
    }
  });
  const totalOrders = orders.length;
  const successfulOrders = orders.filter((order) => order.orderStatus !== "CANCELLED").length;
  const successPercentage = totalOrders ? Math.round(successfulOrders / totalOrders * 100) : 0;
  return {
    totalOrders,
    successfulOrders,
    successPercentage
  };
};
var getProviderAnalytics = async (providerId) => {
  const totalDeliveredOrders = await prisma.order.count({
    where: {
      providerId,
      orderStatus: "DELIVERED"
    }
  });
  const revenue = await prisma.order.aggregate({
    where: {
      providerId,
      orderStatus: "DELIVERED"
    },
    _sum: {
      totalAmount: true
    }
  });
  const totalItemsSold = await prisma.orderItem.aggregate({
    where: {
      order: {
        providerId,
        orderStatus: "DELIVERED"
      }
    },
    _sum: {
      quantity: true
    }
  });
  return {
    totalDeliveredOrders,
    totalRevenue: revenue._sum.totalAmount || 0,
    totalItemsSold: totalItemsSold._sum.quantity || 0
  };
};
var AnalyticsService = {
  getAdminAnalytics,
  getCustomerAnalytics,
  getProviderAnalytics
};

// src/modules/analytics/analytics.controller.ts
var getAdminAnalytics2 = async (req, res) => {
  try {
    const result = await AnalyticsService.getAdminAnalytics();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getCustomerAnalytics2 = async (req, res) => {
  try {
    const customerId = req.user?.id;
    const analytics = await AnalyticsService.getCustomerAnalytics(customerId);
    return res.status(200).json({
      success: true,
      data: analytics
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
var getProvierAnalytics = async (req, res, next) => {
  try {
    const user = req.user;
    const provider = await prisma.provider.findFirst({
      where: {
        userId: user?.id
      }
    });
    if (!provider) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const analytics = await AnalyticsService.getProviderAnalytics(provider.id);
    res.status(200).json({
      success: true,
      message: "Provider analytics fetched successfully",
      data: analytics
    });
  } catch (error) {
    next(error);
  }
};
var AnayticsController = {
  getAdminAnalytics: getAdminAnalytics2,
  getCustomerAnalytics: getCustomerAnalytics2,
  getProvierAnalytics
};

// src/modules/analytics/analytics.route.ts
var router7 = express5.Router();
router7.get("/admin-analytics", middleWare("ADMIN" /* ADMIN */), AnayticsController.getAdminAnalytics);
router7.get("/customer-analytics", middleWare("CUSTOMER" /* CUSTOMER */, "ADMIN" /* ADMIN */), AnayticsController.getCustomerAnalytics);
router7.get("/provider-analytics", middleWare("PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */), AnayticsController.getProvierAnalytics);
var AnalyticsRouter = router7;

// src/app.ts
var app = express6();
app.use(express6.json());
var allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL
  // Production frontend URL
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/urbaneats-frontend.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/me", AuthRouter);
app.use("/api/provider/meals", MealRouters);
app.use("/api/providers", ProvidersRouter);
app.use("/api/admin", AdminRoutes);
app.use("/orders", OrderRoutes);
app.use("/reviews", ReviewsRouter);
app.use("/analytics", AnalyticsRouter);
app.get("/", (req, res) => {
  res.send("Hello from UrbanEats");
});
app.use(notFound);
var app_default = app;

// src/server.ts
var port = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("connected to database successfully");
    app_default.listen(port, () => {
      console.log("server is running on port : ", port);
    });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
