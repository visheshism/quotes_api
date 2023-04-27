import express from "express";
import mainRouter from "./mainRouter.js"

export const app = express()

app.use(mainRouter)