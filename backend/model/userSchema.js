const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



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
    },
    tokens: [
        {
            token: {
                type: String
            }

        }
    ]
})


userSchema.pre('save', async function (next) {
    console.log("Hashing the password")
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)

    }
    next()



})


// Jwt token generation

userSchema.methods.generateAuthToken = async function () {
    try {
        let jwttoken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
       
        this.tokens = this.tokens.concat({ token: jwttoken })
        await this.save()
        return jwttoken

    } catch (err) {
        console.log(err, "From token jwt")
    }
}



















const UserModel = mongoose.model("WEBUSER", userSchema)

module.exports = UserModel