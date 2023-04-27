import express from "express"
import { createCategory, createNewByCategory, deleteQuoteById, getAllByCategory, getAllCategories, getQuoteById, updateQuoteById } from "../controllers/admin.js"

const router = express.Router()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())


router.post("/categ/:id", createCategory)
router.get("/categ/all", getAllCategories)
router.post("/quote/:categ_id/new", createNewByCategory)
router.get("/quote/:categ_id/all", getAllByCategory)
router.route("/quote/:quote_id").get(getQuoteById).put(updateQuoteById).delete(deleteQuoteById)

export default router