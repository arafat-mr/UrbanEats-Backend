import express, { NextFunction, Request, Response, Router } from "express"
import { middleWare, UserRole } from "../../middlewares/middleware"
import { AdminContoller } from "./admin.controller"
const router= express.Router()



// router.get('/')

router.get('/users',middleWare(UserRole.ADMIN),AdminContoller.getUsers)
router.patch('/users/:userId',middleWare(UserRole.ADMIN),AdminContoller.updateUserstatus)

router.get('/orders',middleWare(UserRole.ADMIN),AdminContoller.getOrders)
router.get('/categories',middleWare(UserRole.ADMIN),AdminContoller.getCategories)
export const AdminRoutes:Router=router