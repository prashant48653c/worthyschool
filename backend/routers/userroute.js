const express = require("express");
const UserModel = require("../model/userSchema");
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")


router.use(express.json())
router.post("/register", async (req, res) => {
    try {

        const { username, email, password, cpassword } = await req.body;

        if (!username || !email || !password || !cpassword) {
            res.status(400).json({ error: "Please fill the form carefully" })
        }
        if (password != cpassword) {
            res.status(400).json({ error: "Password and Confirmation doesn't matches" })
        }

        const userExist = await UserModel.findOne({ email: email })
        if (userExist) {
            res.status(400).json({ error: "Email already exist" })
        } else {
            const newUser = new UserModel({ username, email, password, cpassword })
            await newUser.save();
            res.status(201).json({ messege: "User registered succesfully" })

        }



    } catch (err) {
        res.status(400).json({ error: `Cannot register ${err}` })

    }
})


router.post("/signin", async (req, res) => {
    try {

        const { email, password } = await req.body

        if (!email || !password) {
            res.status(400).json({ messege: "Fill the form carefully" })

        }
        const userExist = await UserModel.findOne({ email: email })
        const isMatch = await bcrypt.compare(password, userExist.password)

        if (userExist && isMatch) {
           const token=await userExist.generateAuthToken();
           res.cookie("jwt",token,{
            expires: new Date(Date.now() + 25892000000),
            httpOnly:true
        })
            res.status(200).json({ messege: "Login succesfull" })
        }
        else if (!userExist) {
            res.status(400).json({ messege: "Invalid email " })
        }
        else if (!isMatch) {
            res.status(400).json({ messege: "Invalid password " })
        }
    } catch (err) {
        res.status(400).json({ messege: `Login declined ${err}` })
    }



})



module.exports = router