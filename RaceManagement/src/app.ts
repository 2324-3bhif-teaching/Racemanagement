// Import necessary modules
import express from "express";
import cors from "cors";
import path from 'path';
import { DB } from "./data/data";
import { carRouter } from "./routers/car-router";
import { inputRouter } from "./routers/input-router";
import { obstacleRouter } from "./routers/obstacle-router";
import { jsonRouter } from "./routers/json-router";

// Create an instance of an Express application
const app = express();

// Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Use the car router for API routes under /api/cars
app.use('/api/cars', carRouter);
app.use('/api/input', inputRouter);
app.use('/api/obstacles', obstacleRouter);
app.use('/api/json', jsonRouter);
// Define the port number
const port = 3000;

// Start the server and connect to the database
app.listen(port, async () => {
    console.log(`[Server] Server is now running at http://localhost:${port}`);

    const db = await DB.createDBConnection();

    try {
        await DB.ensureSampleDataInserted(db);
        console.log(`[Database] Sample data inserted`);
    } finally {
        await db.close();
    }
});
