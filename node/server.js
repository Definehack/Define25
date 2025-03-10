require('dotenv').config();
const cors = require("cors");
const connectDb = require("./db");
const express = require("express")
const userRoute = require("./routes/userRoute");
const faqRoute = require("./routes/faqRoute");

const app = express();
app.use(express.json())
app.use(cors());
const PORT = process.env.PORT; 

connectDb();

app.use("/user",userRoute);
app.use("/",faqRoute);


app.listen(PORT,()=>{
    console.log(`Server running on the port ${PORT}`);
})