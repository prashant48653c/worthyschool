const express = require("express")
const dotenv = require("dotenv");
const router = require("./routers/userroute");
const connectDB = require("./model/conn");
const app = express();


dotenv.config({ path: "./.env" })
app.use(router)


app.use(express.json())
const port = process.env.PORT || 3000;
connectDB()

app.get("/", (req, res) => {
    res.send("Home page")
})

app.listen(port, () => {
    console.log(`server listened at ${port}`)
})