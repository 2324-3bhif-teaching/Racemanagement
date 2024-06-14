import { Car } from '../src/model/car-model';
import { Input } from '../src/model/input-model';
import { Obstacle } from '../src/model/obstacle-model';

function replaceStringsInData(data: any): any {
    if (typeof data === 'string') {
        return data
            .replace(/Car\w*/g, '🚗')
            .replace(/Obstacle\w*/g, '🚧')
            .replace(/Input\w*/g, '🕹️');
    } else if (Array.isArray(data)) {
        return data.map(item => replaceStringsInData(item));
    } else if (typeof data === 'object' && data !== null) {
        Object.keys(data).forEach(key => {
            // If the object has a 'name' property, append it under the emoji
            if (data[key] && typeof data[key] === 'string' && data.name) {
                data[key] = replaceStringsInData(data[key]) + `\n${data.name}`;
            } else {
                data[key] = replaceStringsInData(data[key]);
            }
        });
        return data;
    }
    return data;
}


 async function fetchRestEndpoint(route: string, method: 'GET' |'POST' |'PUT'
    |'DELETE', data?: object): Promise<any> {
    let options: any = { method };
    if (data) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
    }
    const res = await fetch(route, options);
    if (!res.ok) {
        const error = new Error(`${method} ${res.url} ${res.status}
(${res.statusText})`);
        throw error;
    }
    if (res.status !== 204) {
        let responseData = await res.json();
        responseData = replaceStringsInData(responseData);
        return responseData;
    }
}


async function fetchCars(): Promise<Car[]> {
    try {
        console.log('Going to fetch..');
        const response = await fetchRestEndpoint('http://localhost:3000/api/cars/all', 'GET');
        console.log(response);
        const cars = response as Car[];
        return cars;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function fetchInputs(): Promise<Input[]> {
    try {
        console.log('Going to fetch..');
        const response = await fetchRestEndpoint('http://localhost:3000/api/input/all', 'GET');
        console.log(response);
        const input = response as Input[];
        return input;
    } catch (e) {
        console.error(e);
        throw e;
    }
    
}

async function fetchObstacles(): Promise<Obstacle[]> {
    try {
        console.log('Going to fetch obstacles..');
        const response = await fetchRestEndpoint('http://localhost:3000/api/obstacles/all', 'GET');
        console.log(response);
        const obstacles = response as Obstacle[];
        return obstacles;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

enum ItemType {
    Car,
    Obstacle,
    Input
}

function fillList<T>(items: T[], textProperty: keyof T, idProperty: keyof T, itemType: ItemType): void {
    let list: HTMLElement | null;
    switch (itemType) {
        case ItemType.Car:
            list = document.getElementById('myList2');
            break;
        case ItemType.Obstacle:
            list = document.getElementById('myList5');
            break;
        case ItemType.Input:
            list = document.getElementById('myList6');
            break;
        default:
            console.error("Unknown item type");
            return;
    }

    if (list) {
        list.innerHTML = '';
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = String(item[textProperty]);
            listItem.id = String(item[idProperty]);
            listItem.draggable = true;
            list.appendChild(listItem);
            console.log('Item added');
        });
    } else {
        console.log('List element not found');
    }
    console.log('List filled');
}


async function main() {
    try {
        console.log('Fetching cars..');
        const cars = await fetchCars();
        const inputs = await fetchInputs();
        const obstacles = await fetchObstacles();
        fillList(cars, 'carName', 'carId', ItemType.Car);
        fillList(inputs, 'inputName', 'inputId', ItemType.Input);
        fillList(obstacles, 'obstacleName', 'obstacleId', ItemType.Obstacle);
        console.log('Cars fetched', cars);
    } catch (error) {
        console.error('Failed to fetch cars:', error);
    }
}

main();
