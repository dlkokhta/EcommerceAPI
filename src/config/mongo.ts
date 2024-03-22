import mongoose from "mongoose";

const mongoConnection = async ()=> {
    try{
        const connectionUrl = `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`;
        return await mongoose.connect(connectionUrl);
    }
    catch(error){
        console.log(error);
    }
}

export default mongoConnection;