import express, {Request, Response, Router} from 'express';
import { Car } from '../model/car-model';
import { Unit } from '../unit';
import { CarService } from '../service/car-service';
import {StatusCodes} from "http-status-codes";

export const carRouter: Router = express.Router();

carRouter.get('/all', async (req: Request, res: Response) => {
    const unit: Unit = await Unit.create(true);
    try{
        const carService: CarService = new CarService(unit);
        const cars: Car[] = await carService.getCars();
        res.status(StatusCodes.OK).json(cars);
    }catch (e) {
        console.error(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    finally {
        await unit.complete();
    }
});
carRouter.get("/", async (_: Request, res: Response) => {
    const unit: Unit = await Unit.create(true);

    try {
        const service: CarService = new CarService(unit);
        const carIds: number[] = await service.getAllIds();
        res.status(StatusCodes.OK).json(carIds);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    finally {
        await unit.complete();
    }
});