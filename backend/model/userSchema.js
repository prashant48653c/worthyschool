const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    }
})


userSchema.pre('save', async function (next) {
    console.log("Hashing the password")
    if (this.isModified('password')) {
        this.password =await bcrypt.hash(this.password, 12)
        this.cpassword =await bcrypt.hash(this.cpassword, 12)

    }
    next()



})




















const UserModel = mongoose.model("WEBUSER", userSchema)

module.exports = UserModel