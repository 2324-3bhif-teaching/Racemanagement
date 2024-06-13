import { Car } from '../src/model/car-model';


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

function fillList(cars: Car[]): void {
    const list = document.getElementById('myList2');
    if (list) {
        list.innerHTML = '';
        cars.forEach(car => {
            const item = document.createElement('li');
            item.textContent = car.carName; // Ensure carName is the correct property
            item.id = car.carId.toString(); // Ensure carId is the correct property and exists
            item.draggable = true;
            list.appendChild(item);
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
        fillList(cars);
        console.log('Cars fetched', cars);
    } catch (error) {
        console.error('Failed to fetch cars:', error);
    }
}

main();
