// require('dotenv').config({ parth: './env' })
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import express from "express";
const app = express()
import cors from "cors"
import cookieparser from "cookie-parser";

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/public",express.static("public"))
app.use(cookieparser())


dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!!", err);
    })




//routes import
import userRouter from "./routes/user.route.js";

// routes declarations
app.use("/users", userRouter)


// http://localhost:8080/users/register

export default { app }



// async function connectDB() {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("errror", (error) => {
//             console.log("ERRR:", error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("ERROR: ", error);
//         throw err
//     }
// }

// connectDB()