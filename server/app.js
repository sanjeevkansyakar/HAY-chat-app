import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import { connectDB } from "./utils/features.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";

dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URL;
const port = process.env.PORT || 3000;

connectDB(mongoURI);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);

app.get("/", (req, res) => {
    res.send("Hello app");
});

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// najile5910@irnini.com
