import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import express from 'express';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/user.rotues.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import carouselRouter from "./routes/carouselRoutes.js";
import productRouter from "./routes/productRoutes.js";
const app = express();

app.use(express.json());
app.use(cors({
  origin:"*"
}))


//routes

app.use("/api", authRoutes);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRouter);
app.use("/carousel", carouselRouter);
app.use("/products", productRouter);

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});


app.use(errorHandler);
const port = parseInt(process.env.PORT) || 3000;


app.listen(port,async () => {
   await connectDB();
  console.log(`listening on port ${port}`);
});