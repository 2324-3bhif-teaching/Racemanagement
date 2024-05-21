import { fetchRestEndpoint } from "./css/fetchRestEndpoint";
import { Car } from "../src/model/car-model";


export async function fetchCars(): Promise<Car[]> {
    try {
        return await fetchRestEndpoint('/api/cars/all', 'GET');
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
            item.textContent = car.carName;
            item.id = car.carId.toString();
            item.draggable = true;
            list.appendChild(item);
            console.log('Item added');
        });
    }
    console.log('List filled');
}

document.addEventListener('DOMContentLoaded', async (event) => {
    try {
        const cars = await fetchCars();
        fillList(cars);
    } catch (e) {
        console.error(e);
    }
});
