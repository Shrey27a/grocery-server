import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
// import { stripeWebhooks } from "./controllers/orderController.js";
import dotenv from "dotenv";


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

await connectDB();
await connectCloudinary();


// allow multiple origins
const allowedOrigins = [process.env.ALLOWED_ORIGINS, "https://grocerybee-frontend.vercel.app"];

// app.post("/stripe",express.raw({type: "application/json"}), stripeWebhooks);

// middlewares configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => res.send("API is running"));
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart",cartRouter)
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Allowed Origins: ${allowedOrigins}`);
});
