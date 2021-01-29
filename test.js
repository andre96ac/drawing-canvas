import { CustomDraw } from './components/CustomDraw.js'


// drawSquare(ctx, 50, 150, 0.5, 80, 'rgb(255, 0, 0)', 30)
// drawSquare(ctx, 110, 150, 0.7, 80, 'rgb(0, 255, 255)', -40)

// drawCircle(ctx, 200, 150, 0.9, 50, 'rgb(255, 0, 0)')
// drawCircle(ctx, 240, 150, 0.9, 60, 'rgb(255, 255, 0)')
// drawCircle(ctx, 270, 150, 0.9, 70, 'rgb(0, 255, 255)')








let myDiv = document.getElementById('myContainer');

let width = window.innerWidth - (window.innerWidth/100*10)
let height = window.innerHeight - (window.innerHeight/100*15)
let myDrawingTable = new CustomDraw(myDiv, height, width);
myDrawingTable.enable();






