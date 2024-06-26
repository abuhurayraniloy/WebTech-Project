import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
const app = express()
dotenv.config()

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MONGODB");
    } 
    catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected");
});

//middleware
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/auth", hotelsRoute);
app.use("/api/auth", roomsRoute);

app.listen(8800, ()=>{
    connect();
    console.log("Connected to backend!")
})