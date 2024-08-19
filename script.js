const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
let draggedElement = null;

// Add event listeners for draggable elements
draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
    elem.addEventListener("touchstart", touchStart);
    elem.addEventListener("touchmove", touchMove);
    elem.addEventListener("touchend", touchEnd);
});

// Add event listeners for droppable elements
droppableElements.forEach(elem => {
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
    elem.addEventListener("touchenter", dragEnter);
    elem.addEventListener("touchmove", dragOver);
    elem.addEventListener("touchleave", dragLeave);
    elem.addEventListener("touchend", touchDrop);
});

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
    draggedElement = event.target;
    console.log('Drag Started');
}

function touchStart(event) {
    draggedElement = event.target;
    console.log('Touch Started');
}

function touchMove(event) {
    event.preventDefault();
    const touch = event.targetTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.classList.contains('droppable')) {
        target.dispatchEvent(new Event('dragenter', { bubbles: true }));
    }
}

function touchEnd(event) {
    const touch = event.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.classList.contains('droppable')) {
        target.dispatchEvent(new Event('drop', { bubbles: true }));
    }
    console.log('Touch Ended');
}

function dragEnter(event) {
    if (!event.target.classList.contains("dropped")) {
        event.target.classList.add("droppable-hover");
    }
    console.log('Hovered on Droppable');
}

function dragOver(event) {
    if (!event.target.classList.contains("dropped")) {
        event.preventDefault();
    }
    console.log('Preventing Default');
}

function dragLeave(event) {
    if (!event.target.classList.contains("dropped")) {
        event.target.classList.remove("droppable-hover");
    }
    console.log('Leaving Droppable');
}

function wrongans() {
    const wrongElement = new Audio('media/wrong.mp3');
    wrongElement.play();
    document.body.style.backgroundColor = 'red';

    setTimeout(() => {
        document.body.style.backgroundColor = ''; 
        wrongElement.pause(); 
        wrongElement.currentTime = 0; 
    }, 600);
}

function rightans() {
    const successElement = new Audio('media/success.mp3');
    successElement.play();
    document.body.style.backgroundColor = 'green';

    setTimeout(() => {
        document.body.style.backgroundColor = ''; 
        successElement.pause(); 
        successElement.currentTime = 0;
    }, 1100);
}

function checkAllDraggableElements() {
    return Array.from(draggableElements).every(elem => elem.classList.contains('dragged'));
}

function drop(event) {
    event.preventDefault();
    event.target.classList.remove("droppable-hover");
    console.log(event + ' event' + event.id + ' event.id');
    const draggableElementData = draggedElement.id;
    console.log(draggableElementData + ' draggableElementData');

    const droppableElementData = event.target.getAttribute("data-draggable-id");
    console.log(droppableElementData + ' droppableElementData');

    const isCorrectMatching = draggableElementData === droppableElementData;
    const draggableElement = document.getElementById(draggableElementData);
    console.log(draggableElement.id + draggableElement + ' draggableElement');
    if (isCorrectMatching) {

        event.target.classList.add("dropped");
        event.target.classList.remove("droppable");
        draggableElement.removeEventListener("dragstart", dragStart);
        draggableElement.removeEventListener("touchstart", touchStart);
        draggableElement.removeEventListener("touchmove", touchMove);
        draggableElement.removeEventListener("touchend", touchEnd);
        event.target.removeEventListener("dragenter", dragEnter);
        event.target.removeEventListener("dragover", dragOver);
        event.target.removeEventListener("dragleave", dragLeave);
        event.target.removeEventListener("drop", drop);
        event.target.removeEventListener("touchenter", dragEnter);
        event.target.removeEventListener("touchmove", dragOver);
        event.target.removeEventListener("touchleave", dragLeave);
        event.target.removeEventListener("touchend", touchDrop);
        draggableElement.classList.add("dragged");
        draggableElement.setAttribute("draggable", "false");

        event.target.insertAdjacentHTML("afterbegin", `<div class="droppable"><img src="media/${draggableElementData}.jpg" class="drag-pic"></div>`);

        rightans();
    } else {
        wrongans();
    }

    if (checkAllDraggableElements()) {
        const cheerElement = new Audio('media/crowd-cheering.mp3');
        cheerElement.play();
        setTimeout(() => {
            cheerElement.pause(); 
            cheerElement.currentTime = 0; 
        }, 5000);
    }

    draggedElement = null;
}

function touchDrop(event) {
    event.preventDefault();
    event.target.classList.remove("droppable-hover");
    console.log(event + ' event' + event.id + ' event.id');
    const draggableElementData = draggedElement.id;
    console.log(draggableElementData + ' draggableElementData');

    const droppableElementData = event.target.getAttribute("data-draggable-id");
    console.log(droppableElementData + ' droppableElementData');

    const isCorrectMatching = draggableElementData === droppableElementData;
    const draggableElement = document.getElementById(draggableElementData);
    console.log(draggableElement.id + draggableElement + ' draggableElement');
    if (isCorrectMatching) {

        event.target.classList.add("dropped");
        event.target.classList.remove("droppable");
        draggableElement.removeEventListener("dragstart", dragStart);
        draggableElement.removeEventListener("touchstart", touchStart);
        draggableElement.removeEventListener("touchmove", touchMove);
        draggableElement.removeEventListener("touchend", touchEnd);
        event.target.removeEventListener("dragenter", dragEnter);
        event.target.removeEventListener("dragover", dragOver);
        event.target.removeEventListener("dragleave", dragLeave);
        event.target.removeEventListener("drop", drop);
        event.target.removeEventListener("touchenter", dragEnter);
        event.target.removeEventListener("touchmove", dragOver);
        event.target.removeEventListener("touchleave", dragLeave);
        event.target.removeEventListener("touchend", touchDrop);
        draggableElement.classList.add("dragged");
        draggableElement.setAttribute("draggable", "false");

        event.target.insertAdjacentHTML("afterbegin", `<div class="droppable"><img src="media/${draggableElementData}.jpg" class="drag-pic"></div>`);

        rightans();
    } else {
        wrongans();
    }

    if (checkAllDraggableElements()) {
        const cheerElement = new Audio('media/crowd-cheering.mp3');
        cheerElement.play();
        setTimeout(() => {
            cheerElement.pause(); 
            cheerElement.currentTime = 0; 
        }, 5000);
    }

    draggedElement = null;
}
