// export const TipiPennello = {
//     QUADRATO: 10,
//     ROTONDO: 20,
// };

import { Brushes } from '../utils/Brushes.js'


export class Sheet{

    _domParent;
    _myCanvas;
    _myContext;

    _isDrawing;

    _selectedBrush = Brushes[0];
    _selectedAlpha = 1;
    _selectedPaintDimension = 20;
    _selectedPaintColor = '#0015ff';
    _selectedPaintRotation = 0;
    _isEnabled = false;


    //coda di elementi da renderizzare
    _timer;
    _listPointToDraw = [];
    
   



    constructor(domParent, height, width){
        
        this._isDrawing = false;

        this._domParent = domParent;

        this._myCanvas =  document.createElement('canvas');
        this._myCanvas.className = 'sheet'
        this._myCanvas.width = width
        this._myCanvas.height = height
        
        this._myCanvas.addEventListener('mousedown', this._startDraw)
        this._myCanvas.addEventListener('mousemove', this._draw)
        document.addEventListener('mouseup', this._endDraw)

        this._myCanvas.addEventListener('pointerdown', this._startPenDraw)
        this._myCanvas.addEventListener('pointermove', this._penDraw)
        document.addEventListener('pointerup', this._endPenDraw)


        this._domParent.appendChild(this._myCanvas);
        
        this._myContext = this._myCanvas.getContext('2d');

        
        
    }


    /**
     * mi metto ad osservare la coda; se trovo elementi, li disegno
     */
    _initQueueHandler(){
        this._timer = setInterval(() => {
            if(this._listPointToDraw.length > 0){
                // console.log(this._listPointToDraw)
                this._drawPoint(this._listPointToDraw.shift());
            }
        }, 0)
    }


   
    /**
     * Disegna un'immagine custom
     * @param {*} destinationContext 
     * @param {*} x 
     * @param {*} y 
     * @param {*} alpha 
     * @param {*} size 
     * @param {*} image 
     * @param {*} rotation 
     */
    _drawImage = (destinationContext, x, y, alpha, size, image, rotation = 0) => {
        const halfSize = size / 2
        destinationContext.globalAlpha = alpha
        if (rotation % 360) {
            destinationContext.translate(x, y)
            destinationContext.rotate(rotation)
            destinationContext.drawImage(image, -halfSize, -halfSize, size, size)
            destinationContext.rotate(-rotation)
            destinationContext.translate(-x, -y)
        } else {
            destinationContext.drawImage(image, Math.round(x - halfSize), Math.round(y - halfSize), size, size)
        }
    }

    /**
     * Disegna un punto guardando coordinate, tipo di pennello, colore, alpha, ecc...
     * @param {l'evento che contiene le coordinate} ev 
     */
    _drawPoint = (ev) => {
        if(ev){
            // console.log(ev);
            let x = ev['pageX'] - this._myCanvas.offsetLeft;
            let y = ev['pageY'] - this._myCanvas.offsetTop;

            this._selectedBrush.handler(this._myContext, x, y, this._selectedAlpha, this._selectedPaintDimension, this.selectedPaintColor)
            // switch(this._selectedBrush){
            //     case TipiPennello.QUADRATO:
            //         this._drawSquare(this._myContext, x, y, this._selectedAlpha, this._selectedPaintDimension, this.selectedPaintColor, this._selectedPaintRotation)
            //         break;

            //     case TipiPennello.ROTONDO:
            //         this._drawCircle(this._myContext, x, y, this._selectedAlpha, this._selectedPaintDimension, this._selectedPaintColor);
            //         break;
            // }
        }
    }


    /**
     * Aggiunge un elemento alla coda da renderizzare
     * @param {oggetto con le informazioni sulla posizione} ev 
     */
    _addPointToQueue(ev){
        this._listPointToDraw.push(ev);
    }


    //#region handlers
        _startDraw = (ev) => {
            if(this._isEnabled){
                // ev.preventDefault()
                this._addPointToQueue(ev);
                this._isDrawing = true;

            }
        }
        
        _draw = (ev) => {
            // ev.preventDefault()
            if(this._isEnabled && this._isDrawing){
                this._addPointToQueue(ev);
            }
        }
        
        _endDraw = (ev) => {
            if(this._isEnabled){
                // ev.preventDefault()
                this._addPointToQueue(ev);
                this._isDrawing = false
            }
        }
    //#endregion

    //#region handlers Touch
        _startPenDraw = (ev) => {
            if(this._isEnabled){
                ev.preventDefault()
                ev.stopPropagation();
                this._drawPoint(ev);
                this._isDrawing = true;
            }
        }
        
        _penDraw = (ev) => {
            if(this._isEnabled && this._isDrawing){
                ev.preventDefault()
                ev.stopPropagation();
                this._drawPoint(ev);
            }
        }
        
        _endPenDraw = (ev) => {
            if(this._isEnabled){
                ev.preventDefault()
                ev.stopPropagation();
                this._drawPoint(ev);
                this._isDrawing = false
            }
        }
    //#endregion


    
    // //#region handlers per il sistema usando drawlines
    //     _startDraw = (ev) => {

    //         this._myContext.beginPath();
	// 		this._myContext.moveTo(ev['pageX'] - this._myCanvas.offsetLeft, ev['pageY'] - this._myCanvas.offsetTop);

    //         this._isDrawing = true;
    //     }
        
    //     _draw = (ev) => {
    //         if(this._isDrawing){
    //             this._myContext.strokeStyle = this._selectedPaintColor;
    //             this._myContext.lineWidth = this._selectedPaintDimension
    //             this._myContext.lineTo(ev['pageX'] - this._myCanvas.offsetLeft, ev['pageY'] - this._myCanvas.offsetTop);
	// 		    this._myContext.stroke();
    //         }
    //     }
        
    //     _endDraw = (ev) => {
    //         // console.log('end')
    //         // console.log(ev)
    //         // this._drawPoint(ev);

    //         this._isDrawing = false
    //     }
    // //#endregion
    


    //#region public methods

        get selectedPaintDimension() {
            return this._selectedPaintDimension;
        }
        set selectedPaintDimension(value) {
            this._selectedPaintDimension = value;
        }
        get selectedAlpha() {
            return this._selectedAlpha;
        }
        set selectedAlpha(value) {
            this._selectedAlpha = value;
        }
        get selectedPaintColor() {
            return this._selectedPaintColor;
        }
        set selectedPaintColor(value) {
            this._selectedPaintColor = value;
        }

        get selectedBrush(){
            return this._selectedBrush
        }
        set selectedBrush(value){
            this._selectedBrush = value;
        }

        enable(){
            this._initQueueHandler();
            this._isEnabled = true;
        }

        disable(){
            clearInterval(this._timer);
            this._isEnabled = false;
        }
        
        cancellaFoglio(){
            this._myContext.clearRect(0, 0, this._myCanvas.width, this._myCanvas.height);
        }

        resize(width, heigth){
            this._myCanvas.width = width;
            this._myCanvas.height = heigth;
        }

    //#endregion
}