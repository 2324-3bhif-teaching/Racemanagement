import { CarService } from "../src/service/car-service";
import { Unit } from "../src/unit";
import { Statement } from "sqlite";

jest.mock("../src/unit");
jest.mock("sqlite");

describe("CarService", () => {
  let unit: jest.Mocked<Unit>;
  let stmt: jest.Mocked<Statement>;
  let carService: CarService;

beforeEach(() => {
    unit = {
        prepare: jest.fn().mockResolvedValue(stmt),
        // Add other methods as needed
    } as unknown as jest.Mocked<Unit>;
      
    stmt = {
        all: jest.fn(),
        // Add other methods as needed
    } as unknown as jest.Mocked<Statement>;

    carService = new CarService(unit);  // TypeError: Cannot read properties of undefined (reading 'mockResolvedValue')

    unit.prepare.mockResolvedValue(stmt);
    stmt.all.mockResolvedValue([]);
});

  describe("getAllIds", () => {
    it("should return all car ids", async () => {
      const ids = [1, 2, 3];
      stmt.all.mockResolvedValue(ids.map(id => ({ id })));

      const result = await carService.getAllIds();

      expect(result).toEqual(ids);
      expect(unit.prepare).toHaveBeenCalledWith("select CarId from Car");
      expect(stmt.all).toHaveBeenCalled();
    });
  });

  describe("getCars", () => {
    it("should return all cars", async () => {
      const cars = [{ id: 1 }, { id: 2 }, { id: 3 }];
      stmt.all.mockResolvedValue(cars);

      const result = await carService.getCars();

      expect(result).toEqual(cars);
      expect(unit.prepare).toHaveBeenCalledWith("SELECT * FROM Car");
      expect(stmt.all).toHaveBeenCalled();
    });
  });
});