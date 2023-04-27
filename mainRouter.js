import clientRouter from "./routes/clientRouter.js"
import adminRouter from "./routes/adminRouter.js"
import express from "express"
import { errHandler, errMiddleware } from "./middlewares/error.js"
import { API_KEY } from "./data/env.js"

const router = express.Router()

router.use(`/${API_KEY}`, adminRouter)
router.use("/api/v1", clientRouter)


router.use((req, res, next) => next(new errHandler("Invalid Request", 404)))

router.use(errMiddleware)
export default router;