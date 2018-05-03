let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
canvas.addEventListener("mousemove", defineImage, false);

let clear = document.getElementById("clear");
clear.addEventListener("click", clearCanvas, false);

//Funcion que toma las coordenadas x y y
function getCurrentPos(evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//Funcion para tomar el color y la forma desde el formulario HTML5
function defineImage(evt) {
    let currentPos = getCurrentPos(evt);
    if (evt.buttons !== 1){
        return;
    }
    for (i = 0; i < document.inputForm.color.length; i++) {
        if (document.inputForm.color[i].checked) {
            var color = document.inputForm.color[i];
            break;
        }
    }

    for (i = 0; i < document.inputForm.shape.length; i++) {
        if (document.inputForm.shape[i].checked) {
            var shape = document.inputForm.shape[i];
            break;
        }
    }

    let json = JSON.stringify({
//  "shape": shape.value,
        "color": color.value,
        "coords": {
            "x": currentPos.x,
            "y": currentPos.y
        }

    });
    drawImageText(json);
    sendText(json);
}
function drawImageText(image) {
    console.log("drawImageText");
    let json = JSON.parse(image);
    context.fillStyle = json.color;
    switch (json.shape) {
        case "circle":
        default:
            context.beginPath();
            context.arc(json.coords.x, json.coords.y, 30, 2 * Math.PI, 0);
            context.fill();
            break;
    }

}

function clearCanvas(evt) {
    var json = JSON.stringify({
        "color": '#FFFFFF',
        "size": 5000,
        "coords": {
            "x": 20,
            "y": 20
        }
    });
    drawImageText(json);
    sendText(json);
}