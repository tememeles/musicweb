import { Client } from 'pg';
import express from "express";
import apiRoutes from './routes/apiRoutes';
import cors from "cors";
import path from "path";
require('dotenv').config();

const app = express()
const PORT = 3002;

//middleware
app.use(cors());
app.use(express.json())

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

export const con = new Client(process.env.DATABASE_URL);

app.use('/api', apiRoutes);

con.connect()
    .then(() => console.log("Connected to PostgreSQL database"))
    .catch((err) => console.error("Connection error:", err));


app.listen(PORT,'::', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});