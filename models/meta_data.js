import mongoose, { mongo } from "mongoose";

const schemaCateg = new mongoose.Schema({
    categ_id: {
        type: Number,
        required: [true, "Category id is required"]
    },
    categ_name: {
        type: String,
        required: [true, "Category name is required"]
    }
})

const lastSessionSchema = new mongoose.Schema({
    lastId: {
        type: String,
        required: true
    },
    lastAccessed: {
        type: String,
        required: true
    }
})

export const Categ = mongoose.model("categ", schemaCateg, "meta_data")
export const lastSession = mongoose.model("lastSession", lastSessionSchema, "meta_data")