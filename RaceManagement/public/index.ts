document.addEventListener('DOMContentLoaded', (event) => {
    // Function to handle drag start
    const dragStart = (event: DragEvent) => {
        if (event.target instanceof HTMLElement) {
            event.dataTransfer?.setData('text/plain', event.target.id);
            event.target.style.opacity = '0.4';
        }
    };

    // Function to handle drag end
    const dragEnd = (event: DragEvent) => {
        if (event.target instanceof HTMLElement) {
            event.target.style.opacity = '1';
        }
    };

    // Function to handle drag over
    const dragOver = (event: DragEvent) => {
        event.preventDefault();
        console.log('Drag over');
    };

    // Function to handle drop
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
            saveListsState();
            event.dataTransfer?.clearData();
        }
    };

    // Function to save lists state to localStorage
    const saveListsState = () => {
        const lists = document.querySelectorAll('ul.list, ul.horizontal-list');
        const allListsData: { [key: string]: string[] } = {};

        lists.forEach((list, index) => {
            const items = list.querySelectorAll('li');
            const listData = Array.from(items).map(item => item.textContent || '');
            allListsData[`list${index + 1}`] = listData;
        });

        localStorage.setItem('savedLists', JSON.stringify(allListsData));
    };

    // Event delegation for drag and drop
    document.body.addEventListener('dragstart', (event) => {
        if (event.target instanceof HTMLElement && event.target.getAttribute('draggable') === 'true') {
            dragStart(event);
        }
    });

    document.body.addEventListener('dragend', (event) => {
        if (event.target instanceof HTMLElement && event.target.getAttribute('draggable') === 'true') {
            dragEnd(event);
        }
    });

    document.body.addEventListener('dragover', (event) => {
        if (event.target instanceof HTMLElement && (event.target.classList.contains('list') || event.target.classList.contains('horizontal-list'))) {
            dragOver(event);
        }
    });

    document.body.addEventListener('drop', (event) => {
        if (event.target instanceof HTMLElement && (event.target.classList.contains('list') || event.target.classList.contains('horizontal-list'))) {
            drop(event);
        }
    });

    console.log('Drag and drop initialized');
});
