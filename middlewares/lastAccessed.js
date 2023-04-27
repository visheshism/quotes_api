import { lastSession } from "../models/meta_data.js";
import { currentDateTime } from "../utils/currentDateTime.js";

export const lastAccessed = async (req, res, next) => {
    const lastSessionInfo = await lastSession.findOne({ lastId: { $exists: true }, lastAccessed: { $exists: true } })
    lastSessionInfo.lastAccessed = currentDateTime();
    await lastSessionInfo.save();
    req.lastSession = lastSessionInfo
    next()
}