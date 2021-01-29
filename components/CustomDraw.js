import { Controls } from './Controls.js';
import {Sheet} from './Sheet.js'

export class CustomDraw{
    
    _domParent;
    _domElement;

    _controls;
    _sheet;

    constructor(domParent, sheetHeight, sheetSize){

        this._domParent = domParent;
        this._domElement = document.createElement('div');
        this._domParent.appendChild(this._domElement);

        
        this._controls = new Controls(this._domElement)
        this._controls.onChangeAlpha(newAlpha => {
            this._sheet.selectedAlpha = newAlpha;
        })
        this._controls.onChangeColor(newColor => {
            this._sheet.selectedPaintColor = newColor;
        })
        this._controls.onChnageSize(newSize => {
            this._sheet.selectedPaintDimension = newSize;
        })
        this._controls.onClearSheet(() => {
            this._sheet.cancellaFoglio();
        })
        this._controls.onChangeBrush((newBrush) => {
            this._sheet.selectedBrush = newBrush;
        })


        this._sheet = new Sheet(this._domElement, sheetHeight, sheetSize);
        this._sheet.selectedAlpha = this._controls.selectedAlpha;
        this._sheet.selectedPaintColor = this._controls.selectedColor;
        this._sheet.selectedPaintDimension = this._controls.selectedSize;
    }

    enable(){
        this._sheet.enable();
    }

    disable(){
        this._sheet.disable();
    }

}