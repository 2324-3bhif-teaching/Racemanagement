import { fetchRestEndpoint } from "./css/fetchRestEndpoint";
import {Car} from "../src/model/car-model"


async function fetchCars(): Promise<Car[]>{
    try{
        return await fetchRestEndpoint('/api/cars/all', 'GET');
    }catch (e) {
        console.error(e);
        throw e;
    }
}

function fillList(cars: Car[]): void{
    const list = document.getElementById('myList2');
    if(list){
        cars.forEach(car => {
            list.innerHTML = ''; // Clear existing items
            const li = document.createElement('li');
            li.textContent = car.carName;
            li.id = car.carId.toString();
            li.draggable = true;
            list.appendChild(li);
        });
    }
}


document.addEventListener('DOMContentLoaded', async () => {

    try{
        const cars = await fetchCars();
        fillList(cars);
    }catch (e) {
        console.error(e);
    }


    const dragStart = (event: DragEvent) => {
        if (event.target instanceof HTMLElement) {
            event.dataTransfer?.setData('text/plain', event.target.id);
            event.target.style.opacity = '0.4';
        }
    };

    const dragEnd = (event: DragEvent) => {
        if (event.target instanceof HTMLElement) {
            event.target.style.opacity = '1';
        }
    };

    const dragOver = (event: DragEvent) => {
        event.preventDefault();
    };

    const drop = (event: DragEvent) => {
        event.preventDefault();
        const id = event.dataTransfer?.getData('text');
        if (id) {
            const draggableElement = document.getElementById(id);
            const dropzone = event.target as HTMLElement;
            if (draggableElement && dropzone.tagName === 'LI' && dropzone !== draggableElement) {
                const parent = dropzone.parentNode;
                if (parent) {
                    parent.insertBefore(draggableElement, dropzone);
                }
            } else if (draggableElement && (dropzone.classList.contains('list') || dropzone.classList.contains('horizontal-list'))) {
                dropzone.appendChild(draggableElement);
            }
            event.dataTransfer?.clearData();
        }
    };

    document.querySelectorAll<HTMLElement>('li[draggable="true"]').forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });

    document.querySelectorAll<HTMLElement>('.list, .horizontal-list').forEach(list => {
        list.addEventListener('dragover', dragOver);
        list.addEventListener('drop', drop);
    });
});



