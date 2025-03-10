const mongoose = require("mongoose");

const connectDb = async () => {
    try {

        const res = await mongoose.connect(process.env.URL).then(()=>{
            console.log("Connected Successfully");
        });

    }catch(err){
        console.log(err);
    }

}

module.exports = connectDb