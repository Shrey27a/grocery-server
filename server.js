// import express from "express";
// import "dotenv/config";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import userRouter from "./routes/userRoute.js";
// import sellerRouter from "./routes/sellerRoute.js";
// import connectCloudinary from "./configs/cloudinary.js";
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import addressRouter from "./routes/addressRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// // import { stripeWebhooks } from "./controllers/orderController.js";
// import dotenv from "dotenv";


// const app = express();
// dotenv.config();
// const PORT = process.env.PORT || 5000;

// await connectDB();
// await connectCloudinary();


// // allow multiple origins
// const allowedOrigins = [process.env.ALLOWED_ORIGINS, "https://grocerybee-frontend.vercel.app"];

// // app.post("/stripe",express.raw({type: "application/json"}), stripeWebhooks);

// // middlewares configuration
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: allowedOrigins, credentials: true }));

// app.get("/", (req, res) => res.send("API is running"));
// app.use("/api/user", userRouter);
// app.use("/api/seller", sellerRouter);
// app.use("/api/product", productRouter);
// app.use("/api/cart",cartRouter)
// app.use("/api/address", addressRouter);
// app.use("/api/order", orderRouter);


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log(`Allowed Origins: ${allowedOrigins}`);
// });

import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './configs/db.js'
import userRouter from './routes/userRoute.js'
import sellerRouter from './routes/sellerRoute.js'
import connectCloudinary from './configs/cloudinary.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import addressRouter from './routes/addressRoute.js'
import orderRouter from './routes/orderRoute.js'
import dotenv from 'dotenv'

// 1. Initialize Express App
const app = express()
dotenv.config()

// 2. Run Database and Cloudinary Connections
// Vercel Serverless environment mein, ye code har function invocation se pehle run hota hai.
// Ensure your 'connectDB' function is robust and handles existing connections.
connectDB()
connectCloudinary()

// 3. Define Allowed Origins for CORS
// IMPORTANT: process.env.ALLOWED_ORIGINS should be set in Vercel Environment Variables.
const allowedOrigins = [
  process.env.ALLOWED_ORIGINS,
  'https://grocerybee-frontend.vercel.app',
  'http://localhost:5173',
]
// Maine 'http://localhost:5173' bhi add kar diya hai taaki aap local development mein bhi check kar sako.

// 4. Middlewares Configuration
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) {
        callback(null, true) // Origin is allowed
      } else {
        // Origin is not allowed - this is where the CORS error originates
        callback(new Error('Not allowed by CORS'), false)
      }
    },
    credentials: true,
  })
)

// 5. Routes
app.get('/', (req, res) => res.send('Grocery API is running successfully.'))
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

// ----------------------------------------------------
// 🎯 CRITICAL FIX FOR VERCEL DEPLOYMENT
// ----------------------------------------------------

// Traditional 'app.listen' removed.
// We must export the Express app instance so Vercel knows what to run.
module.exports = app
