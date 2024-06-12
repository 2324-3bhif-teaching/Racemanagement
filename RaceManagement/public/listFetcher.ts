import { fetchRestEndpoint } from "./css/fetchRestEndpoint";
import { Car } from "../src/model/car-model";

async function fetchCars(): Promise<Car[]> {
    try {
        const response = await fetchRestEndpoint('http://localhost:3000/api/cars/all', 'GET');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const cars: Car[] = await response.json(); // Correctly parsing the JSON response
        return cars;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export function fillList(cars: Car[]): void {
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
        const cars = await fetchCars();
        fillList(cars);
        console.log('Cars fetched', cars);
    } catch (error) {
        console.error('Failed to fetch cars:', error);
    }
}

main();