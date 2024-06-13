import { Database as Driver } from "sqlite3";
import { open, Database } from "sqlite";

const dbFileName = '.race.db';
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

        await connection.run('insert into CAR (carId, carName) values (1, "Car1")');
        await connection.run('insert into CAR (carId, carName) values (2, "Car2")');
        await connection.run('insert into CAR (carId, carName) values (3, "Car4")');


        await connection.run('insert into OBSTACLE (obstacleId, obstacleName) values (1, "Obstacle1")');
        await connection.run('insert into OBSTACLE (obstacleId, obstacleName) values (2, "Obstacle2")');

        await connection.run('insert into INPUT (inputId, inputName) values (1, "Input1")');
        await connection.run('insert into INPUT (inputId, inputName) values (2, "Input2")');
    }



    private static async ensureTablesCreated(connection: Database): Promise<void> {
    
        await connection.run(
            `create table if not exists Car (
                carId INTEGER NOT NULL,
                carName TEXT NOT NULL,
                constraint PK_Car primary key (carId)
            ) strict`
        );
        await connection.run(
            `create table if not exists Obstacle (
                obstacleId INTEGER NOT NULL,
                obstacleName TEXT NOT NULL,
                constraint PK_Obstacle primary key (obstacleId)
            ) strict`
        );
        await connection.run(
            `create table if not exists Input (
                inputId INTEGER NOT NULL,
                inputName TEXT NOT NULL,
                constraint PK_Input primary key (inputId)
            ) strict`
        );
    }
}