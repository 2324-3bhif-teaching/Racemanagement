import { Car } from "../model/car-model";
import { ServiceBase } from "../service-base";
import { Unit } from "../unit";
import { Statement } from "sqlite";


export class CarService extends ServiceBase{
    public constructor(unit: Unit){
        super(unit);
    }

    public async getAllIds(): Promise<number[]> {
        const stmt: Statement = await this.unit.prepare('select id from Car');
        const result = await stmt.all();
        return ServiceBase.unwrapAll<number>(result, 'id');
    }

    public async getCars(): Promise<Car[]> {
        const stmt: Statement = await this.unit.prepare('SELECT * FROM Car');
        const result = await stmt.all();
        return ServiceBase.unwrapAll<Car>(result, 'Car');
    }
}