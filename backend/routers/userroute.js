const express = require("express");
const UserModel = require("../model/userSchema");
const router = express.Router()
const bcrypt = require("bcryptjs")


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
        }else{
            const newUser = new UserModel({ username, email, password, cpassword })
            await newUser.save();
            res.status(201).json({ messege: "User registered succesfully" })

        }



    } catch (err) {
        res.status(400).json({ error: `Cannot register ${err}` })

    }
})


router.get("/login", async (req, res) => {
    res.send("hello")
})



module.exports = router