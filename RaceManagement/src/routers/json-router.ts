import express, {Request, Response, Router} from 'express';
import {StatusCodes} from "http-status-codes";

export const jsonRouter: Router = express.Router();

jsonRouter.post('/', async (req: Request, res: Response) => {
    const json = req.body;
    console.log('Json data received', json);
    res.status(StatusCodes.OK).json({message: 'Json data received successfully'});
});

jsonRouter.get('/', async (req: Request, res: Response) => {
    console.log('Json data fetched');
    res.status(StatusCodes.OK).json({message: 'Json data fetched successfully'});
});