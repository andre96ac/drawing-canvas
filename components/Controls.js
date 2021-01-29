import { Brushes } from '../utils/Brushes.js'

export class Controls{
    _domColorPicker
    _domAlphaPicker
    _domSizePicker
    _domBtnClear
    _domBrushOptions = []

    _domParent
    _domContainer

    _handlerChangeColor
    _handlerChangeAlpha
    _handlerChangeSize
    _handlerClear
    _handlerChangeBrush


    constructor(domParent){

        this._evChangeColor = new CustomEvent('changeColor');
        this._evChangeAlpha = new Event('changeAlpha');
        this._evChangeSize = new Event('changeSize');
        this._evClear = new Event('clear');


        let _this = this;
        this._domParent = domParent;

        this._domContainer = document.createElement('div');
        this._domContainer.className = 'sheet-controls';
        this._domParent.appendChild(this._domContainer);

        let divAlpha = document.createElement('div');
        this._domContainer.appendChild(divAlpha);
        let labelAlpha = document.createElement('p');
        labelAlpha.innerText = 'Opacità'
        divAlpha.appendChild(labelAlpha);
        this._domAlphaPicker = document.createElement('input');
        this._domAlphaPicker.setAttribute('type', 'range');
        this._domAlphaPicker.setAttribute('min', '0');
        this._domAlphaPicker.setAttribute('max', '1');
        this._domAlphaPicker.setAttribute('step', '.01');
        this._domAlphaPicker.addEventListener('change', (ev) => { this._handlerChangeAlpha(ev.target.value) })
        divAlpha.appendChild(this._domAlphaPicker);
        
        let divSize = document.createElement('div');
        this._domContainer.appendChild(divSize);
        let labelSize = document.createElement('p');
        labelSize.innerText = 'Dimensione';
        divSize.appendChild(labelSize);
        this._domSizePicker = document.createElement('input');
        this._domSizePicker.setAttribute('type', 'range');
        this._domSizePicker.setAttribute('min', '1');
        this._domSizePicker.setAttribute('max', '150');
        this._domSizePicker.setAttribute('step', '1');
        this._domSizePicker.addEventListener('change', (ev) => { this._handlerChangeSize(ev.target.value) })
        divSize.appendChild(this._domSizePicker);


        this._domColorPicker = document.createElement('input');
        this._domColorPicker.setAttribute('type', 'color');
        this._domColorPicker.addEventListener('change', (ev) => { this._handlerChangeColor(ev.target.value) })
        this._domContainer.appendChild(this._domColorPicker);


        this._domBtnClear = document.createElement('input');
        this._domBtnClear.setAttribute('type', 'button');
        this._domBtnClear.setAttribute('value', 'Cancella');
        this._domBtnClear.addEventListener('click', () => { this._handlerClear() })
        this._domContainer.appendChild(this._domBtnClear);

        let  brushContainer = document.createElement('select');
        this._domContainer.appendChild(brushContainer);

        Brushes.forEach(brush => {
            let newDomBrushOption = document.createElement('option');
            newDomBrushOption.innerText = brush.label;
            newDomBrushOption.addEventListener('click', (ev) => { this._handlerChangeBrush(brush)})
            brushContainer.appendChild(newDomBrushOption);
            this._domBrushOptions.push(newDomBrushOption);
        })


    }

    get selectedColor(){
        return this._domColorPicker.value;
    }
    get selectedSize(){
        return this._domSizePicker.value;
    }
    get selectedAlpha(){
        return this._domAlphaPicker.value;
    }
   

  

    onChangeColor(handler){
        this._handlerChangeColor = handler;
    }

    onChnageSize(handler){
        this._handlerChangeSize = handler;
    }

    onChangeAlpha(handler){
        this._handlerChangeAlpha = handler;
    }

    onClearSheet(handler){
        this._handlerClear = handler;
    }

    onChangeBrush(handler){
        this._handlerChangeBrush = handler;
    }


}