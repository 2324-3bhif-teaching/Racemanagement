

const addButton: HTMLButtonElement = document.getElementById('addButton') as HTMLButtonElement;
/*const list: HTMLUListElement = document.getElementById("myList");


for (let i = 0; i < data.length; i++) {
            let li = document.createElement('li');
            li.innerText = data[i];
            list.appendChild(li);
        }
*/
addButton.addEventListener('click', () => {
    window.location.href = 'add/add.html';
});