import express from "express"
import { lastAccessed } from "../middlewares/lastAccessed.js"
import { getAllCategories, getQuoteByCategRandomly, getRandomQuote } from "../controllers/client.js"

const router = express.Router()

router.get("/random", lastAccessed, getRandomQuote)
router.get("/categ/all", getAllCategories)
router.get("/categ/:categ_id/quote", lastAccessed, getQuoteByCategRandomly)

export default router