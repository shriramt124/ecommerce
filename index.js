import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/user.rotues.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import carouselRouter from "./routes/carouselRoutes.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization", "Set-Cookie"],
  preflightContinue: false,
  optionsSuccessStatus: 200
}))

//routes
app.use("/api", authRoutes);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRouter);
app.use("/carousel", carouselRouter);
app.use("/api/products", productRouter);
app.use("/category", categoryRouter);

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

app.use(errorHandler);
const port = parseInt(process.env.PORT) || 3000;

app.listen(port, async () => {
  await connectDB();
  console.log(`listening on port ${port}`);
});