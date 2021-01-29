/**
 * ######################### Add custom Brushes here! ###########################
 * 
 * label: String //a name for the brush
 * value: number //a univocal identifier
 * handler: function (destinationContext, x, y, alpha, size, color) {} //function to draw a single shape of the brush, using the specified context, position, alpha, size and color
 * 
 */





export const Brushes = [
    {
        //square
        value: 10,
        label: 'Quadrato',
        handler: (destinationContext, x, y, alpha, size, color, rotation = 0) => {
            const halfSize = size / 2
            destinationContext.globalAlpha = alpha
            destinationContext.fillStyle = color
            if (rotation % 90) {
                destinationContext.translate(x, y)
                destinationContext.rotate(rotation)
                destinationContext.fillRect(-halfSize, -halfSize, size, size)
                destinationContext.rotate(-rotation)
                destinationContext.translate(-x, -y)
            } 
            else {
                destinationContext.fillRect(x - halfSize, y - halfSize, size, size)
            }
        }

    },
    {
        //circle
        value: 20,
        label: 'Rotondo',
        handler: (destinationContext, x, y, alpha, size, color) => {
            destinationContext.beginPath()
            destinationContext.fillStyle = color
            destinationContext.globalAlpha = alpha
            destinationContext.lineJoin = 'round'
            destinationContext.lineCap = 'round'
            destinationContext.arc(x, y, size / 2, 0, 2 * Math.PI, true)
            destinationContext.fill()
        }
    },
    {
        //triangle
        value: 30,
        label: 'Triangolo',
        handler: (destinationContext, x, y, alpha, size, color) => {
            var height = size * (Math.sqrt(3)/2);

            destinationContext.beginPath()
            destinationContext.fillStyle = color
            destinationContext.globalAlpha = alpha
            let startY = y - height/2
            destinationContext.moveTo(x, startY);
            destinationContext.lineTo(x+size/2, startY+height);
            destinationContext.lineTo(x-size/2, startY+height);
            destinationContext.lineTo(x, startY);
            destinationContext.fill();
        }
    }
]