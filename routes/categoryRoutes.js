import express from "express"
import { createCategory, getAllCategory, deleteCategory } from "../controller/categoryController.js"
const categoryRouter = express.Router()
import { protect, isAdmin } from "../middlewares/authMiddleware.js"


categoryRouter.post("/", protect, isAdmin, createCategory)

categoryRouter.get("/", protect, isAdmin, getAllCategory);

categoryRouter.delete("/:id", protect, isAdmin, deleteCategory);

export default categoryRouter