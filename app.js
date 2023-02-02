let blockNode = "";
let gridColumn = "";
let gridSize = 16;


const psRoot = document.querySelector(":root");
const board = document.getElementById("board");
//const block = document.getElementsByClassName("block");
const colorPicker = document.getElementById("color-picker");
const colorPicker_board = document.getElementById("board-color");

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

var penColor= '#BA7CC5';
colorPicker.value = penColor;

var boardColor = '#ffffff';
colorPicker_board.value = boardColor;


colorPicker.onchange = function(){
    changePenColor(this.value);
}

colorPicker_board.onchange = function(){
    changeBoardColor(this.value);
}

function changeBoardColor(color){
    psRoot.style.setProperty('--background', color);
}

function changePenColor(color){
    penColor = color;
}

for(let i=0; i<gridSize; i++){
    for(let j=0; j<gridSize; j++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.classList.add('default');
        block.addEventListener('mousedown',fillBlock);
        block.addEventListener('mouseover', fillBlock);

        board.appendChild(block);
    }
    gridColumn += ' 1fr';
}

board.style.gridTemplateColumns = gridColumn;

psRoot.style.setProperty('--color', '#BA7CC5');


function fillBlock(e){
    if(e.type === 'mouseover' && !mouseDown){
        return;
    }
    else{
        e.target.style.setProperty('background-color', penColor);
        e.target.classList.remove("default");
    }
        
}