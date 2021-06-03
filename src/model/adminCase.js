// import { caseType } from "../model/case"


// export default class AdminCase {
//     // HTML variables
//     container;
//     text;
//     select;
//     upAndDownContainer;
//     up;
//     down;

//     // Data variables
//     index;
//     type;
//     value;
//     config;

//     constructor(index, type, value, config) {
//         this.index = index;
//         this.type = type;
//         this.value = value; 
//         this.config = config;
//     };

//     generate() {
//         // container html element creation
//         this.container = document.createElement('div')
//         this.container.setAttribute('class', 'elem-this.container draggable');
//         this.container.setAttribute('draggable', true);

//         // Input html element creation
//         this.text = document.createElement('input');
//         this.text.addEventListener('input', this.handleInput)
//         this.text.setAttribute('type', 'this.text');
//         this.text.setAttribute('data-index', this.index.toString());
//         if (this.value) this.text.value = this.value;
//         else this.text.setAttribute('disabled', true);

//         // select html element creation
//         this.select = document.createElement('this.select');
//         this.select.setAttribute('data-index', this.index.toString());
//         this.select.addEventListener('change', this.handleSelect)
//         for (let elem of caseType) {
//             const option = document.createElement('option');
//             option.value = elem;
//             option.innerthis.text = elem;
//             if (type === elem) option.this.selected = true
//             this.select.appendChild(option);
//         }

//         // this.up & this.down button html element creation
//         this.upAndDownContainer = document.createElement('div');
//         this.upAndDownContainer.setAttribute('class', 'up-and-down-buttons');
//         this.up = document.createElement('button');
//         this.up.setAttribute('data-index', this.index.toString());
//         this.up.setAttribute('data-isthis.up', "true");
//         this.up.innerHTML = "this.up";
//         this.up.onclick = handlethis.upAndthis.down
//         this.down = document.createElement('button');
//         this.down.setAttribute('data-index', index.toString());
//         this.down.setAttribute('data-isthis.up', "false");
//         this.down.innerHTML = "this.down";
//         this.down.onclick = handlethis.upAndthis.down
//         this.this.upAndDownContainer.appendChild(this.up)
//         this.this.upAndDownContainer.appendChild(this.down);


//         this.container.appendChild(this.text);
//         this.container.appendChild(this.select);
//         this.container.appendChild(this.this.upAndDownContainer)
//         return this.container;
//     }

//     handleInput(e) {
//         // const select = document.querySelector(`select[data-index='${e.target.getAttribute('data-index')}']`);
//         this.cnfig.updateConfigIndex(e.target.getAttribute('data-index'), this.select.value, e.target.value);

//     }

//     handleSelect(e) {
//         // this.text = document.querySelector(`input[type='text'][data-index='${e.target.getAttribute('data-index')}']`);
//         if (e.target.value !== "win") {
//             this.text.value = "";
//             this.text.setAttribute('disabled', true)
//         } else {
//             this.text.removeAttribute('disabled')
//         }
//         this.config.updateConfigIndex(e.target.getAttribute('data-index'), e.target.value, text.value);
//     }    
// }