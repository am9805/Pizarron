let canvas = document.getElementById("myCanvas");
let deletee = document.getElementById("delete");
let save = document.getElementById("save");

let context = canvas.getContext("2d");
canvas.addEventListener("mousemove", defineImage, false);

deletee.addEventListener("click", erase, false);
save.addEventListener("click", guardarImagen, false);
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
    
    var color = document.inputForm.color;
    for (i = 0; i < document.inputForm.color.length; i++) {
        if (document.inputForm.color[i].checked) {
             color = document.inputForm.color[i];
            console.log(color.toString());
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
/**
 * Este método se encarga de borrar lo que exista en el trablero
 * @param {type} evt
 * @returns {undefined}
 */
function erase(evt){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 *Método para guardar una imagen, en esta se obtiene lo previamente dibujado en 
 * canvas y se descarga bajo el nombre de 'canvas' el tipo de la imagen queda
 * definido como .png
 * @param {type} evt
 * @return {undefined}
 */
function guardarImagen(evt){
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