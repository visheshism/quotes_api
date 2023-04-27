import mongoose from "mongoose";
const schema = new mongoose.Schema({
    quote: {
        type: String,
        required: [true, "Quote field can't be empty"]
    },
    categ: {
        type: Number,
        required: [true, "Category field can't be empty"]
    },
})
export const Quote = mongoose.model("quote", schema, "Quotes")