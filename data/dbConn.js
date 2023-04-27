import mongoose from "mongoose";

export const dbConn = (MONGO_URI) => {
    mongoose.connect(MONGO_URI, {
        dbName: "quotes_api"
    })
        .then((e) => console.log(`Db connected at ${e.connection.host}`))
        .catch(err => console.log(err.message))
}