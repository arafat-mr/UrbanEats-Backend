import express, { NextFunction, Request, Response, Router } from "express"
import { Authcontroller } from "./auth.controller"
import { middleWare, UserRole } from "../../middlewares/middleware"


const router= express.Router()

 router.get('/',middleWare(UserRole.ADMIN,UserRole.CUSTOMER,UserRole.PROVIDER),Authcontroller.getCurrentUser)
 router.patch('/update',middleWare(UserRole.CUSTOMER,UserRole.ADMIN,UserRole.PROVIDER),Authcontroller.updateCurrentUser)
export const AuthRouter:Router=router