import { InputService } from "../src/service/input-service";
import { Unit } from "../src/unit";
import { Statement } from "sqlite";

jest.mock("../src/unit");
jest.mock("sqlite");

describe("InputService", () => {
    let unit: jest.Mocked<Unit>;
    let stmt: jest.Mocked<Statement>;
    let inputService: InputService;
  
    beforeEach(() => {
      unit = {
        prepare: jest.fn().mockResolvedValue(stmt),
      } as unknown as jest.Mocked<Unit>;
  
      stmt = {
        all: jest.fn(),
      } as unknown as jest.Mocked<Statement>;
  
      inputService = new InputService(unit);
  
      unit.prepare.mockResolvedValue(stmt);
      stmt.all.mockResolvedValue([]);
    });
  
    describe("getAllIds", () => {
      it("should return all input ids", async () => {
        const ids = [1, 2, 3];
        stmt.all.mockResolvedValue(ids.map(id => ({ id })));
  
        const result = await inputService.getAllIds();
  
        expect(result).toEqual(ids);
        expect(unit.prepare).toHaveBeenCalledWith("select id from Input");
        expect(stmt.all).toHaveBeenCalled();
      });
    });
  
    describe("getInputs", () => {
        it("should return all inputs", async () => {
          const inputs = [{ id: 1 }, { id: 2 }, { id: 3 }];
          stmt.all.mockResolvedValue(inputs);
      
          const result = await inputService.getInputs();
      
          expect(result).toEqual(inputs);
          expect(unit.prepare).toHaveBeenCalledWith("SELECT * FROM Input");
          expect(stmt.all).toHaveBeenCalled();
        });
      });
  });