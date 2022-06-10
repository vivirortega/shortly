import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import urlRouter from "./routes/urlRouter.js";
import userRouter from "./routes/userRouter.js";


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(authRouter);
app.use(urlRouter);
app.use(userRouter);

app.listen(process.env.PORT, () => console.log(`Server working on port ${process.env.PORT}`));