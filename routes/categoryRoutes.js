import express from "express"
import { createCategory, getAllCategory } from "../controller/categoryController.js"
const categoryRouter = express.Router()
import { protect, isAdmin } from "../middlewares/authMiddleware.js"


categoryRouter.post("/", protect, isAdmin, createCategory)

categoryRouter.get("/", protect, isAdmin, getAllCategory);

export default categoryRouter