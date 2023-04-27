import { config } from "dotenv";
config({
    path: "./data/config.env"
})

export const { PORT, MONGO_URI, API_KEY } = process.env