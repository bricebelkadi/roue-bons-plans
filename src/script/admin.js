import Config from "../service/config";
import Case, { caseType } from "../model/case";
import "../style/admin.css";

let currentDroppable = null;
let isDragging = false;

let draggableIndex = null;
let droppableIndex = null;


function generateInputs(index, type, value) {

    // Container html element creation
    const container = document.createElement('div')
    container.setAttribute('class', 'elem-container draggable');
    container.setAttribute('draggable', true);
    container.setAttribute('data-index', index.toString());
    container.ondragstart = handleDragStart;
    container.ondragend = handleDragStop;
    container.ondragenter = handleDragEnter;
    container.ondragleave = handleDragLeave;


    // Input html element creation
    const text = document.createElement('input');
    text.addEventListener('input', handleInput)
    text.setAttribute('type', 'text');
    text.setAttribute('data-index', index.toString());
    if (value) text.value = value;
    else text.setAttribute('disabled', true);

    // Select html element creation
    const select = document.createElement('select');
    select.setAttribute('data-index', index.toString());
    select.addEventListener('change', handleSelect)
    for (let elem of caseType) {
        const option = document.createElement('option');
        option.value = elem;
        option.innerText = elem;
        if (type === elem) option.selected = true
        select.appendChild(option);
    }

    // Up & Down button html element creation
    const upAndDownContainer = document.createElement('div');
    upAndDownContainer.setAttribute('class', 'up-and-down-buttons');
    const up = document.createElement('button');
    up.setAttribute('data-index', index.toString());
    up.setAttribute('data-isUp', "true");
    up.innerHTML = "&#8593;";
    up.onclick = handleUpAndDown
    const down = document.createElement('button');
    down.setAttribute('data-index', index.toString());
    down.setAttribute('data-isUp', "false");
    down.innerHTML = "&#8595;";
    down.onclick = handleUpAndDown
    upAndDownContainer.appendChild(up)
    upAndDownContainer.appendChild(down);


    container.appendChild(text);
    container.appendChild(select);
    container.appendChild(upAndDownContainer)
    return container
}

function handleDragEnter(e) {
    if (!isDragging) return;
    if (currentDroppable) {
        currentDroppable.style.borderTop = "";
        currentDroppable = null
        droppableIndex = null;

    }
    if (!currentDroppable) {
        let droppableBelow = e.target.closest('.draggable')
        droppableIndex = parseInt(droppableBelow.getAttribute('data-index'), 10)
        currentDroppable = droppableBelow;
        droppableBelow.style.borderTop = "20px solid red";
    }

}

function handleDragLeave(e) {
    if (!isDragging) return;
}

function handleDragStart(e) {
    draggableIndex = parseInt(e.currentTarget.closest('.draggable').getAttribute('data-index'), 10)
    isDragging = true;
}

function handleDragStop(e) {
    if (draggableIndex !== droppableIndex) {
        const roueConfig = Config.getConfig();
        const dataDrag = roueConfig.splice(draggableIndex, 1)[0];
        roueConfig.splice(droppableIndex, 0, dataDrag);
        Config.updateConfig(roueConfig);
        init(true);
        }
    isDragging = false;
    draggableIndex = null
    if (currentDroppable) {
        currentDroppable.style.borderTop = "";
        currentDroppable = null
        droppableIndex = null;
    }
}




function handleUpAndDown(e) {
    e.preventDefault()
    const isUp = e.target.getAttribute('data-isUp') === "true" ? true : false;
    const index = parseInt(e.target.getAttribute('data-index'), 10);
    const roueConfig = Config.getConfig();
    roueConfig.splice(index, 1);
    if (index == 0 && isUp) return;
    if (index == 19 && !isUp) return
    let newIndex = isUp ? index - 1 : index + 1;
    const valueHTML = document.querySelector(`input[type='text'][data-index='${index}']`);
    const value = valueHTML.value;
    const typeHTML = document.querySelector(`select[data-index='${index}']`);
    const type = typeHTML.value;
    roueConfig.splice(newIndex, 0, new Case(type, value));
    Config.updateConfig(roueConfig);
    init(true)
}

function handleSelect(e) {
    const text = document.querySelector(`input[type='text'][data-index='${e.target.getAttribute('data-index')}']`);
    if (e.target.value !== "win") {
        text.value = "";
        text.setAttribute('disabled', true)
    } else {
        text.removeAttribute('disabled')
    }
    Config.updateConfigIndex(e.target.getAttribute('data-index'), e.target.value, text.value);

}

function handleInput(e) {

    const select = document.querySelector(`select[data-index='${e.target.getAttribute('data-index')}']`);
    Config.updateConfigIndex(e.target.getAttribute('data-index'), select.value, e.target.value);
}


function init(isRefresh) {
    const roueConfig = Config.getConfig();
    const adminForm = document.getElementById("adminForm")
    if (isRefresh) adminForm.innerHTML = ""
    for (let i = 0; i < roueConfig.length; i++) {
        let html = generateInputs(i, roueConfig[i].type, roueConfig[i].value)
        adminForm.appendChild(html)
    }
};

init();