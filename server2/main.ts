import { Client } from 'pg';
import express from "express";
import apiRoutes from './routes/apiRoutes';
import cors from "cors";
import path from "path";
import runMigration from './run_migrations';
import dotenv from 'dotenv';


dotenv.config();



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
    .then(async () => {
        console.log("Connected to PostgreSQL database");
        await runMigration(con);
    })
    .catch((err: Error) => console.error("Connection error:", err));


app.listen(PORT,'::', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});