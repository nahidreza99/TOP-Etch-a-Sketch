const psRoot = document.querySelector(":root");
const board = document.getElementById("board");
const colorPicker = document.getElementById("color-picker");
const colorPicker_board = document.getElementById("board-color");
const paint = document.getElementById("paint");
const solid = document.getElementById("solid");
const rainbow = document.getElementById("rainbow");
const blocks = document.getElementsByClassName("block");
const clear = document.getElementById("clear");
const erase = document.getElementById("erase");
const slider = document.getElementById("grid-size");
const slideLabel = document.getElementById("size-label");
const gridline = document.getElementById("gridline");

let gridColumn = "";
var create = createBoard(16);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

var penColor= '#000000';
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
    if(!solid.classList.contains('selected')){
        solid.classList.add('selected');
        rainbow.classList.remove('selected');
        erase.classList.remove('selected');
    }
}

rainbow.onclick = function(){
    brush = "rainbow";
    if(!rainbow.classList.contains('selected')){
        rainbow.classList.add('selected');
        solid.classList.remove('selected');
        erase.classList.remove('selected');
    }
}

erase.onclick = function(){
    brush = "erase";
    if(!erase.classList.contains('selected')){
        erase.classList.toggle('selected');
        solid.classList.remove('selected');
        rainbow.classList.remove('selected');
    }
}

clear.onclick = function(){
    clearAll();
}

gridline.onclick = function(){
    board.classList.toggle('gridline')
    if(board.classList.contains('gridline')){
        gridline.classList.add('selected');
    }
    else{
        gridline.classList.remove('selected');
    }
};

slideLabel.innerHTML=16;
slider.oninput = (e)=>(changeBoard(e.target.value));

function changeBoard(value){
    updateSize(value);
    deleteBoard();
    createBoard(value);
}

function updateSize(value){
    slideLabel.innerHTML = value;
}

function deleteBoard(){
    board.innerHTML="";
    gridColumn = "";
}

function clearAll(){
    for(let i=0;i<blocks.length;i++){
        if(!blocks[i].classList.contains('default')){
            clearBlock(blocks[i]);
        }
    }
}

function clearBlock(b){
    b.style.removeProperty('background-color');
    b.classList.add('default');
}

function changeBoardColor(color){
    psRoot.style.setProperty('--background', color);
}

function createBoard(n){
    for(let i=0; i<n; i++){
        for(let j=0; j<n; j++){
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
}

function changePenColor(color){
    penColor = color;
    colorPicker.value = color;
}

function valueToHex(c) {
    var hex = c.toString(16);
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
    else if(brush==="erase"){
        if(!e.target.classList.contains('default')){
            clearBlock(e.target);
        }
    }
}