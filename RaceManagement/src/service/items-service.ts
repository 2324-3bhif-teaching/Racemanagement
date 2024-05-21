import { ServiceBase } from "../service-base";
import { Unit } from "../unit";
import {Statement} from "sqlite";

export class ItemService extends ServiceBase{
    public constructor(unit: Unit){
        super(unit);
    }

    public async getItems(): Promise<any[]> {
        const stmt: Statement = await this.unit.prepare('SELECT * FROM Item');
        const result: any[] = await stmt.all();
        return ServiceBase.unwrapAll<any>(result, 'Item');
    }
}
