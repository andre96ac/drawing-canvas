# Table_Encryptor
Simple engine which use canvas to draw shapes and brush strokes following mouse inputs.
##### The engine is really simple, so you can customize it as you wish. It's also possible to add custom brushes, see utils/Brushes.js for more info


### usage:

#### Creation:
```javascript

    import { CustomDraw } from './components/CustomDraw.js'


    let myDiv = document.createElement('div');

    let width = //sheet width
    let height = //sheet height

    let myDrawingTable = new CustomDraw(myDiv, height, width);

```

#### Start drawing:
```javascript

    myDrawingTable.enable();


```

#### Stop drawing: 
###### (call it when not drawing for best performances)
```javascript

    myDrawingTable.enable();


```

#### Testing:
run index.html using VsCode LiveServer or another static server to test the project


