import { Database as Driver} from "sqlite3";
import { open, Database } from "sqlite";

const dbFileName = './data/race.db';
export class DB {
    private static initialTableCreationDone: boolean = false;

    public static async createDBConnection(): Promise<Database> {
        const db = await open({
            filename: `./${dbFileName}`,
            driver: Driver,
        });
        await db.get('PRAGMA foreign_keys = ON');

        await DB.ensureTablesCreated(db);

        return db;
    }

    public static async beginTransaction(connection: Database): Promise<void> {
        await connection.run('begin transaction;');
    }

    public static async commitTransaction(connection: Database): Promise<void> {
        await connection.run('commit;');
    }

    public static async rollbackTransaction(connection: Database): Promise<void> {
        await connection.run('rollback;');
    }


    public static async ensureSampleDataInserted(connection: Database): Promise<void> {
        await connection.run('delete from CAR');
        await connection.run('delete from OBSTACLE');
        await connection.run('delete from INPUT');

        await connection.run('insert into CAR (id, name) values (1, "Car1")');
        await connection.run('insert into CAR (id, name) values (2, "Car2")');

        await connection.run('insert into OBSTACLE (id, name) values (1, "Obstacle1")');
        await connection.run('insert into OBSTACLE (id, name) values (2, "Obstacle2")');

        await connection.run('insert into INPUT (id, name) values (1, "Input1")');
        await connection.run('insert into INPUT (id, name) values (2, "Input2")');
    }



    private static async ensureTablesCreated(connection: Database): Promise<void> {
    
        await connection.run(`CREATE TABLE IF NOT EXISTS CAR   
        (
            id           INTEGER NOT NULL primary key,
            name        TEXT    NOT NULL
        ) strict`
    );
        await connection.run(`CREATE TABLE IF NOT EXISTS OBSTACLE
        (
            id           INTEGER NOT NULL primary key,
            name        TEXT    NOT NULL
        ) strict`
    );
        await connection.run(`CREATE TABLE IF NOT EXISTS INPUT
        (
            id           INTEGER NOT NULL primary key,
            name        TEXT    NOT NULL
        ) strict`
    );
    }
}