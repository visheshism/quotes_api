import { errHandler } from "../middlewares/error.js";
import { Categ } from "../models/meta_data.js";
import { Quote } from "../models/quote.js";
import { lastAccessedId } from "../middlewares/lastAccessed.js"

export const getRandomQuote = async (req, res, next) => {
    try {
        const { lastId } = req.lastSession
        const allQuotes = await Quote.find()
        let randomIdx = Math.floor(Math.random() * allQuotes.length)
        let randomQuote = allQuotes[randomIdx]

        if (randomQuote._id == lastId) {
            randomIdx = Math.floor(Math.random() * allQuotes.length)
            randomQuote = allQuotes[randomIdx]
        }

        await lastAccessedId(randomQuote._id)

        res.status(200).json({
            success: true,
            quote: randomQuote.quote
        })
    } catch (err) {
        next(new errHandler("Something went wrong", 500))
    }
}

export const getAllCategories = async (req, res, next) => {
    try {
        const allCategs = await Categ.find({ categ_id: { $exists: true }, categ_name: { $exists: true } })

        if (allCategs.length == 0) return next(new errHandler("Couldn't find any categories"), 404)

        res.status(200).json({
            success: true,
            categories: allCategs.reverse().map((categ) => `${categ.categ_id} : ${categ.categ_name}`)
        })
    } catch (err) {
        next(new errHandler("Something went wrong"), 404)
    }
}

export const getQuoteByCategRandomly = async (req, res, next) => {
    try {
        const { lastId } = req.lastSession;
        const { categ_id } = req.params;

        const findCateg = await Categ.findOne({ categ_id })
        if (!findCateg) return next(new errHandler("Invalid Category Id"), 404)

        const allQuotes = await Quote.find({ categ: findCateg.categ_id })
        if (!allQuotes) return next(new errHandler("No quotes found in this category"), 404)
        let randomIdx = Math.floor(Math.random() * allQuotes.length)
        let randomQuote = allQuotes.reverse()[randomIdx]

        if (randomQuote._id == lastId) {
            randomIdx = Math.floor(Math.random() * allQuotes.length)
            randomQuote = allQuotes.reverse()[randomIdx]
        }

       await lastAccessedId(randomQuote._id)

        res.status(200).json({
            success: true,
            quote: randomQuote.quote
        })
    } catch (err) {
        next(new errHandler("Something went wrong", 500))
    }
}
