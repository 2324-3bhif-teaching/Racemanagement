import { Obstacle } from "../model/obstacle-model";
import { ServiceBase } from "../service-base";
import { Unit } from "../unit";
import { Statement } from "sqlite";


export class ObstacleService extends ServiceBase{
    public constructor(unit: Unit){
        super(unit);
    }

    public async getAllIds(): Promise<number[]> {
        const stmt: Statement = await this.unit.prepare('select obstacleId from Obstacle');
        const result = await stmt.all();
        return ServiceBase.unwrapAll<number>(result, 'id');
    }

    public async getObstacle(): Promise<Obstacle[] | null> {
        const stmt: Statement = await this.unit.prepare('SELECT * FROM Obstacle');
        const result = await stmt.all();
        return ServiceBase.nullIfUndefined<Obstacle[]>(await stmt.all<Obstacle[]>());
    }
}