
document.addEventListener('DOMContentLoaded', (event) => {
    


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
        console.log('Drag over');
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
    console.log('Drag and drop initialized');
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async () => {
            const list = document.getElementById('myList');
            if (list) {
                const items = list.querySelectorAll('li');
                const carNames = Array.from(items).map(item => item.textContent);
                const blob = new Blob([carNames.join('\n')], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'car-list.txt';
                a.click();
                URL.revokeObjectURL(url);
            }
        });
    }
});

