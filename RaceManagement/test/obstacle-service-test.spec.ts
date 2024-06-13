import { ObstacleService } from "../src/service/obstacle-service";
import { Unit } from "../src/unit";
import { Statement } from "sqlite";

jest.mock("../src/unit");
jest.mock("sqlite");

describe("ObstacleService", () => {
  let unit: jest.Mocked<Unit>;
  let stmt: jest.Mocked<Statement>;
  let obstacleService: ObstacleService;

  beforeEach(() => {
    unit = {
      prepare: jest.fn().mockResolvedValue(stmt),
    } as unknown as jest.Mocked<Unit>;

    stmt = {
      all: jest.fn(),
    } as unknown as jest.Mocked<Statement>;

    obstacleService = new ObstacleService(unit);

    unit.prepare.mockResolvedValue(stmt);
    stmt.all.mockResolvedValue([]);
  });

  describe("getAllIds", () => {
    it("should return all obstacle ids", async () => {
      const ids = [1, 2, 3];
      stmt.all.mockResolvedValue(ids.map(id => ({ id })));

      const result = await obstacleService.getAllIds();

      expect(result).toEqual(ids);
      expect(unit.prepare).toHaveBeenCalledWith("select obstacleId from Obstacle");
      expect(stmt.all).toHaveBeenCalled();
    });
  });

  describe("getObstacle", () => {
    it("should return all obstacles", async () => {
      const obstacles = [{ id: 1 }, { id: 2 }, { id: 3 }];
      stmt.all.mockResolvedValue(obstacles);

      const result = await obstacleService.getObstacle();

      expect(result).toEqual(obstacles);
      expect(unit.prepare).toHaveBeenCalledWith("SELECT * FROM Obstacle");
      expect(stmt.all).toHaveBeenCalled();
    });
  });
});