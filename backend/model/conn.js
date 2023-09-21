const mongoose = require("mongoose")


const connectDB = async () => {
    await mongoose.connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log("Mongo connected")
    }).catch((error) => {
        console.log(`Mongo Problem == ${error}`)
    })
}

module.exports = connectDB

