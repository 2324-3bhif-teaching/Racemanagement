import { Unit } from "../src/unit";
import { ItemService } from "../src/service/items-service";
import { Statement } from "sqlite";
import sqlite from "sqlite";
jest.mock("sqlite");

describe("ItemService", () => {
    let unit: Unit;
    let itemService: ItemService;

    beforeEach(async () => {
        unit = await Unit.create(false); 
        itemService = new ItemService(unit);
    });
/*
  it("should get items", async () => {
    const mockItems = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
    ];

    const stmt = {
        all: jest.fn().mockResolvedValue(mockItems),
    };

    (unit.prepare as jest.Mock).mockResolvedValue(stmt as unknown as Statement<sqlite.Statement>);

    const items = await itemService.getItems();

    expect(items).toEqual(mockItems);
    expect(unit.prepare).toHaveBeenCalledWith('SELECT * FROM Item');
    expect(stmt.all).toHaveBeenCalled();
  })*/
}
  );
