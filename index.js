import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const dburl = process.env.dburl;
const PORT = process.env.PORT || 3004;

const app = express();


app.use(cors());



// Middlewares
app.use(cookieParser())
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process if MongoDB connection fails
    });
