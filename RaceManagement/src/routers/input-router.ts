import express, {Request, Response, Router} from 'express';
import { Input } from '../model/input-model';
import { Unit } from '../unit';
import { InputService } from '../service/input-service';
import {StatusCodes} from "http-status-codes";

export const inputRouter: Router = express.Router();

inputRouter.get('/all', async (req: Request, res: Response) => {
    const unit: Unit = await Unit.create(true);
    try{
        const inputService: InputService = new InputService(unit);
        const inputs: Input[] = await inputService.getInputs();
        res.status(StatusCodes.OK).json(inputs);
    }catch (e) {
        console.error(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    finally {
        await unit.complete();
    }
});

inputRouter.get("/", async (_: Request, res: Response) => {
    const unit: Unit = await Unit.create(true);

    try {
        const service: InputService = new InputService(unit);
        const inputIds: number[] = await service.getAllIds();
        res.status(StatusCodes.OK).json(inputIds);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    finally {
        await unit.complete();
    }
});