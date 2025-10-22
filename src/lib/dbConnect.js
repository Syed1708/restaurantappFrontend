import mongoose from "mongoose";

export async function dbConnect(){

    const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.diabh9g.mongodb.net/simpleNextApp?retryWrites=true&w=majority&appName=Cluster0`;

    try {
        const conn = await mongoose.connect(String(url));
        console.log("db connected success");
        
        return conn;
    } catch(err) {
        console.error(err);
    }
}