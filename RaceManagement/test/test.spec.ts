import axios from 'axios';
import express, { Express } from 'express';
import { carRouter } from '../src/routers/car-router';
import { obstacleRouter } from '../src/routers/obstacle-router';
import { inputRouter } from '../src/routers/input-router';


describe('Car Router', () => {
  let app: Express;
  let server: any;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(carRouter);
    app.use('/car', carRouter); // Update this line to add a route prefix
    app.use('/obstacle', obstacleRouter); // Add this line
    app.use('/input', inputRouter); // Add this line
    server = app.listen(3000); // Start server on port 3000
  });

  afterEach(() => {
    server.close(); // Close server after each test
    axios.CancelToken.source().cancel();
  });

  it('should return array', async () => {
    const res = await axios.get('http://localhost:3000/all');
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.data)).toBeTruthy();
  });
/*
  it('should return all car IDs', async () => {
    const res = await axios.get('http://localhost:3000/');
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.data.carIds)).toBeTruthy();
    expect(res.data.carIds.every((id: any) => typeof id === 'number')).toBeTruthy();
  });*/

  type Car = { carId: number; carName: string; };

function isCar(obj: any): obj is Car {
  return obj && typeof obj.carId === 'number' && typeof obj.carName === 'string';
}

it('should return all cars', async () => {
  const res = await axios.get('http://localhost:3000/all');
  expect(res.status).toEqual(200);
  expect(res.data.every(isCar)).toBeTruthy();
});


describe('Obstacle Router', () => {

    type Obstacle = { obstacleId: number; obstacleName: string; };

    function isObstacle(obj: any): obj is Obstacle {
        return obj && typeof obj.obstacleId === 'number' && typeof obj.obstacleName === 'string';
    }

    it('should return all obstacles', async () => {
        const res = await axios.get('http://localhost:3000/obstacle/all');
        expect(res.status).toEqual(200);
        expect(res.data.every(isObstacle)).toBeTruthy();
    });

    it('GET /all should return all obstacles array', async () => {
      const res = await axios.get('http://localhost:3000/obstacle/all');
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.data)).toBeTruthy();
    });
  
   /* it('GET / should return all obstacle IDs', async () => {
      const res = await axios.get('http://localhost:3000/obstacle');
      expect(res.status).toEqual(200);
      expect(res.data.every((id: any) => typeof id === 'number')).toBeTruthy();
    });*/
  });

  describe('Input Router', () => {

    type Input = { inputId: number; inputName: string; };

    function isInput(obj: any): obj is Input {
        return obj && typeof obj.inputId === 'number' && typeof obj.inputName === 'string';
    }

    it('should return all inputs', async () => {
        const res = await axios.get('http://localhost:3000/input/all');
        expect(res.status).toEqual(200);
        expect(res.data.every(isInput)).toBeTruthy();
    });

    it('GET /all should return all inputs array', async () => {
      const res = await axios.get('http://localhost:3000/input/all');
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.data)).toBeTruthy();
    });
  /*
    it('GET / should return all input IDs', async () => {
      const res = await axios.get('http://localhost:3000/input');
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.data)).toBeTruthy();
      expect(res.data.every((id: any) => typeof id === 'number')).toBeTruthy();
    });*/
});
});