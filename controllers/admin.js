import { errHandler } from "../middlewares/error.js";
import { Categ } from "../models/meta_data.js";
import { Quote } from "../models/quote.js";

export const createCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name } = req.body

        const findId = await Categ.findOne({ categ_id: id })
        if (findId) return next(new errHandler("Id already exists", 500))

        const findName = await Categ.findOne({ categ_name: name.toLowerCase() })
        if (findName) return next(new errHandler("Name already in use", 500))

        const createNewCateg = await Categ.create({ categ_id: id, categ_name: name.toLowerCase() })

        res.status(200).json({ success: true, message: "Category Created!", category: { id: createNewCateg.categ_id, name: createNewCateg.categ_name } })

    } catch (err) {
        next(err)
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

export const createNewByCategory = async (req, res, next) => {
    try {
        const { categ_id } = req.params
        const { quote } = req.body
        if (!quote || quote == null) return next(new errHandler("couldn't get quote from req.body"))

        const findId = await Categ.findOne({ categ_id })
        if (!findId) return next(new errHandler("Id doesn't exists", 500))

        const createNew = await Quote.create({ quote, categ: categ_id })

        res.status(200).json({
            success: true,
            category_name: findId.categ_name,
            quote: createNew
        })
    } catch (err) {
        next(err)
    }
}

export const getAllByCategory = async (req, res, next) => {
    try {
        const { categ_id } = req.params

        const findId = await Categ.findOne({ categ_id })
        if (!findId) return next(new errHandler("Id doesn't exists", 500))

        const findQuotes = await Quote.find({ categ: categ_id }).select({ _v: 0 })

        if (findQuotes.length == 0) return next(new errHandler("No Quotes found for this category", 500))

        res.status(200).json({
            success: true,
            category_name: findId.categ_name,
            quotes: findQuotes
        })
    } catch (err) {
        next(err)
    }
}

export const updateQuoteById = async (req, res, next) => {
    try {
        const { quote_id } = req.params
        const { quote } = req.body

        if (!quote || quote == null) return next(new errHandler("couldn't get quote from req.body"))

        const findById = await Categ.findById(quote_id).select({ _v: 0 })
        if (!findById) return next(new errHandler("Quote doesn't exists", 500))

        findById.quote = quote
        await findById.save()

        const updatedOne = await Categ.findById(quote_id).select({ _v: 0 })

        res.status(200).json({
            success: true,
            quote: updatedOne
        })
    } catch (err) {
        next(err)
    }
}

export const deleteQuoteById = async (req, res, next) => {
    try {
        const { quote_id } = req.params
        const findById = await Categ.findById(quote_id).select({ _v: 0 })
        if (!findById) return next(new errHandler("Quote doesn't exists", 500))
        findById.deleteOne()
        await findById.save()

        res.status(200).json({
            success: true,
            message: "Deleted Successfully"
        })
    } catch (err) {
        next(err)
    }
}

export const getQuoteById = async (req, res, next) => {
    try {
        const { quote_id } = req.params

        const findById = await Categ.findById(quote_id).select({ _v: 0 })
        if (!findById) return next(new errHandler("Quote doesn't exists", 500))

        res.status(200).json({
            success: true,
            quote: findById
        })
    } catch (err) {
        next(err)
    }
}
