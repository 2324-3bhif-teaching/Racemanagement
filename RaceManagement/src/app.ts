// for installing all dependencies once run 'npm install'
// for starting the server run 'npm start'
// for starting the server in watchmode run 'npm run server-dev'

// import modules
import express from "express";
import cors from "cors";
import path from 'path';
import { DB } from "../data/data";
import { Router } from "express";
import { carRouter } from "./routers/car-router";

// create express application
const app = express();

// mount middleware
app.use(cors());
app.use(express.json());    // parse JSON data and place result in req.body

app.use(express.static(path.join(__dirname, '..','public')));
app.use('/api/cars', carRouter);

// start http server

const port = 3000;
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

