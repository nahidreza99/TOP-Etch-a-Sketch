let blockNode = "";
let gridColumn = "";
let gridSize = 16;


const psRoot = document.querySelector(":root");
const board = document.getElementById("board");
const colorPicker = document.getElementById("color-picker");
const colorPicker_board = document.getElementById("board-color");
const paint = document.getElementById("paint");
const solid = document.getElementById("solid");
const rainbow = document.getElementById("rainbow");


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

var brush = "solid";
solid.onclick = function(){
    brush = "solid";
    changeBrush();
}

rainbow.onclick = function(){
    brush = "rainbow";
    changeBrush();
}



function changeBrush(){
    solid.classList.toggle('selected');
    rainbow.classList.toggle('selected');
}

function changeBoardColor(color){
    psRoot.style.setProperty('--background', color);
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

function changePenColor(color){
    penColor = color;
    colorPicker.value = color;
}


function valueToHex(c) {

    var hex = c.toString(16);
    console.log(c+": "+hex);
    if(hex.length < 2){
        hex = "0"+hex;
    }
    return hex;
  
}

function rgbToHex(r, g, b) {

    return(valueToHex(r) + valueToHex(g) + valueToHex(b));
  
}

function generateColor() {
    let r = Math.floor((Math.random() * 255));
    let g = Math.floor((Math.random() * 255));
    let b = Math.floor((Math.random() * 255));


    return "#"+rgbToHex(r,g,b);
}

function fillBlock(e){
    if(e.type === 'mouseover' && !mouseDown){
        return;
    }

    if(brush==="solid"){
        e.target.style.setProperty('background-color', penColor);
        e.target.classList.remove("default");
    }
    else if(brush==="rainbow"){
        let color = generateColor();
        changePenColor(color);
        e.target.style.setProperty('background-color', penColor);
        e.target.classList.remove("default");
    }
    else{
        e.target.classList.add('default');
    }
}