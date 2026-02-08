import express, { Router } from "express"

import { middleWare, UserRole } from "../../middlewares/middleware"
import { AnayticsController } from "./analytics.controller"


const router= express.Router()

router.get('/admin-analytics',middleWare(UserRole.ADMIN),AnayticsController.getAdminAnalytics)
router.get('/customer-analytics',middleWare(UserRole.CUSTOMER,UserRole.ADMIN,),AnayticsController.getCustomerAnalytics)

router.get('/provider-analytics',middleWare(UserRole.PROVIDER,UserRole.ADMIN),AnayticsController.getProvierAnalytics)

export const AnalyticsRouter :Router= router  