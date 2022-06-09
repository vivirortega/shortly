import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(authRouter);

app.listen(process.env.PORT, () => console.log(`Server working on port ${process.env.PORT}`));