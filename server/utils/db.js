const mongoose=require("mongoose");

const URI=process.env.MONGODB_URI;
//mongoose.connect(URI);


const connectDb=async()=>{
    try {
        await mongoose.connect(URI);
        console.log("Database connection Sucessfull");
    } catch (error) {
        console.log("Database Connection Fail");
        process.exit(0);
    }
}

module.exports=connectDb;

