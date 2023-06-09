import { lastSession } from "../models/meta_data.js";
import { currentDateTime } from "../utils/currentDateTime.js";

export const lastAccessed = async (req, res, next) => {
    const lastSessionInfo = await lastSession.findOne({ lastId: { $exists: true }, lastAccessed: { $exists: true } })
    if (!lastSessionInfo) {
        const createLastSessionInfo = await lastSession.create({ lastId: "sample-id", lastAccessed: currentDateTime() })
        req.lastSession = createLastSessionInfo
        return next()
    }
    lastSessionInfo.lastAccessed = currentDateTime()
    await lastSessionInfo.save()
    req.lastSession = lastSessionInfo
    next()
}

export const lastAccessedId = async (used_id) => {
    const lastSessionInfo = await lastSession.findOne({ lastId: { $exists: true }, lastAccessed: { $exists: true } })
    lastSessionInfo.lastId = used_id;
    await lastSessionInfo.save()
}
