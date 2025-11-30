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
// import { stripeWebhooks } from "./controllers/orderController.js";
// ... (Lines 1-13 remain the same)
import dotenv from 'dotenv'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000

await connectDB()
await connectCloudinary()

// VERCEL CORS FIX:
// 1. Define the specific domains that are allowed to make requests.
// 2. We are adding the temporary Vercel client URL and the main custom domain (if applicable).
const allowedOrigins = [
  'https://grocery-client-eta.vercel.app', // <--- 🔑 ADD YOUR CLIENT URL HERE
  'https://grocerybee-frontend.vercel.app',
  // You can keep process.env.ALLOWED_ORIGINS if it's defined correctly in Vercel
  // If not, it's safer to remove or comment it out for now.
]

// app.post("/stripe",express.raw({type: "application/json"}), stripeWebhooks);

// middlewares configuration
app.use(express.json())
app.use(cookieParser())

// 🔑 PLACE OF INSERTION: This is the correct location for the CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true)
      // Allow requests from defined origins
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        // If the origin is not allowed, block it
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)

app.get('/', (req, res) => res.send('API is running'))
// ... (The rest of your code remains the same)
