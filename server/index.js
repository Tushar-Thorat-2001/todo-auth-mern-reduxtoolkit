import dotenv from "dotenv"
import express from "express"
import connectDB from "./config/db.js"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"
import {errorHandler,notFound} from "./middlewares/errorMiddlewares.js"


dotenv.config();
connectDB()

const app = express();

app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is running");
})

app.use("/api/users",userRoutes);   
app.use("/api/todos",todoRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT||5000;


app.listen(PORT,()=>{
    console.log(
        `Server running mode on port ${PORT}`
      );
})