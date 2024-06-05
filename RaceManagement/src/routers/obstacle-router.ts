import express, {Request, Response, Router} from 'express';
import { Obstacle } from '../model/obstacle-model';
import { Unit } from '../unit';
import { ObstacleService } from '../service/obstacle-service';
import {StatusCodes} from "http-status-codes";

export const obstacleRouter: Router = express.Router();

obstacleRouter.get('/all', async (req: Request, res: Response) => {
    const unit: Unit = await Unit.create(true);
    try{
        const inputService: ObstacleService = new ObstacleService(unit);
        const obstacle: Obstacle[] | null = await inputService.getObstacle();
        res.status(StatusCodes.OK).json(obstacle);
    }catch (e) {
        console.error(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    finally {
        await unit.complete();
    }
});
obstacleRouter.get("/", async (_: Request, res: Response) => {
    const unit: Unit = await Unit.create(true);

    try {
        const service: ObstacleService = new ObstacleService(unit);
        const obstacleIds: number[] = await service.getAllIds();
        res.status(StatusCodes.OK).json(obstacleIds);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    finally {
        await unit.complete();
    }
});