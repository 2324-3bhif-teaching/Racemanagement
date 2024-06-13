import {Unit} from "./unit";
import {Statement} from "sqlite";

export abstract class ServiceBase {

    protected constructor(protected readonly unit: Unit) {}

    protected async executeStmt(stmt: Statement): Promise<boolean> {
        const result = await stmt.run();
        return result.changes === 1;
    }

    protected static nullIfUndefined<T>(entity: T | undefined): T | null {
        if (entity === undefined) {
            return null;
        }
        return entity;
    }

    protected static unwrapSingle<T>(obj: any | null | undefined, fieldName: string): T | null {
        obj = ServiceBase.nullIfUndefined(obj);
        return obj === null ? null : <T>obj[fieldName];
    }

    public static unwrapAll<T>(rows: any[], property?: string): T[] {
        return rows.map(row => property ? row[property] : row);
    }
}