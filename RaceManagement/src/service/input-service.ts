import { Input } from "../model/input-model";
import { ServiceBase } from "../service-base";
import { Unit } from "../unit";
import { Statement } from "sqlite";


export class InputService extends ServiceBase{
    public constructor(unit: Unit){
        super(unit);
    }

    public async getAllIds(): Promise<number[]> {
        const stmt: Statement = await this.unit.prepare('select id from Input');
        const result = await stmt.all();
        return ServiceBase.unwrapAll<number>(result, 'id');
    }

    public async getInputs(): Promise<Input[]> {
        const stmt: Statement = await this.unit.prepare('SELECT * FROM Input');
        const result = await stmt.all();
        return ServiceBase.unwrapAll<Input>(result, 'Input');
    }
}