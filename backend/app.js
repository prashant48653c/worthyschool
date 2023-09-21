const express=require("express")
const dotenv=require("dotenv")

dotenv.config()


const app=express();
app.use(express.json())
const port=process.env.PORT || 3000;


app.get("/",(req,res)=>{
    res.send("Home page")
})

app.listen(port,()=>{
    console.log(`server listened at ${port}`)
})