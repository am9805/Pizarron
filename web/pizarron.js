let canvas = document.getElementById("myCanvas");
let deletee = document.getElementById("delete");
let save = document.getElementById("save");
let color = '#2ff455';
let context = canvas.getContext("2d");
var isDrawing;
deletee.addEventListener("click", erase, false);
save.addEventListener("click", guardarImagen, false);

function setColor(col){
    color = col;
}

//Funcion que toma las coordenadas x y y
function getCurrentPos(evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

canvas.onmousedown = function (e) {
    isDrawing = true;
    context.lineWidth = 0;
    context.lineJoin = context.lineCap = 'round';
    context.moveTo(e.clientX, e.clientY);
};
canvas.onmousemove = function (e) {
    let currentPos = getCurrentPos(e);
    if (isDrawing) {
        let rect = canvas.getBoundingClientRect();
        context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        context.strokeStyle = color;
        context.stroke();
    
    let json = JSON.stringify({
        "color": color.value,
        "coords": {
            "x": currentPos.x,
            "y": currentPos.y
        }

    });
    drawImageText(json);
    sendText(json);
    }
};

canvas.onmouseup = function () {
    isDrawing = false;
};

window.onmouseup = function () {
    isDrawing = false;
};

//Funcion para tomar el color y la forma desde el formulario HTML5
function defineImage(evt) {
    let currentPos = getCurrentPos(evt);
    if (evt.buttons !== 1) {
        return;
    }
    var color = document.inputForm.color;
    for (i = 0; i < document.inputForm.color.length; i++) {
        if (document.inputForm.color[i].checked) {
            color = document.inputForm.color[i];
            console.log(color.toString());
            break;
        }
    }
    let json = JSON.stringify({
        "color": color.value,
        "coords": {
            "x": currentPos.x,
            "y": currentPos.y
        }

    });
    let json ;
    sendText(json);
    
}
function drawImageText(image) {
    let json = JSON.parse(image);
}
/**
 * Este método se encarga de borrar lo que exista en el trablero
 * @param {type} evt
 * @returns {undefined}
 */
function erase(evt) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 *Método para guardar una imagen, en esta se obtiene lo previamente dibujado en 
 * canvas y se descarga bajo el nombre de 'canvas' el tipo de la imagen queda
 * definido como .png
 * @param {type} evt
 * @return {undefined}
 */
function guardarImagen(evt) {
    var tipo = "image/png";
    var imagenData = canvas.toDataURL(tipo);
    var imagenDescargada = document.createElement('a');
    imagenDescargada.download = 'myCanvas';
    imagenDescargada.href = imagenData;
    imagenDescargada.dataset.downloadurl = [tipo, imagenDescargada.download,
    imagenDescargada.href].join(':');
    document.body.appendChild(imagenDescargada);
    imagenDescargada.click();
    document.body.removeChild(imagenDescargada);

}