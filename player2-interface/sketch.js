const socket = io.connect('http://localhost:5500/', {path: '/real-time'});

let victorias=0;
let derrotas=0;

let selection = 1;
let t = 5;
let enemyselection=1;

const x = 100
const y = 400
const size = 500

let paperp = {
    x:x+150,
    y:y-250,
    size: 120
}

let rockp = {
    x:x,
    y:y-250,
    size: 120
}

let scissorsp = {
    x:x+300,
    y:y-250,
    size: 120
}


function preload() {
    scissors = loadImage('./images/scissors.png');
    paper = loadImage('./images/paper.png');
    rock = loadImage('./images/rock.png');
    backgroundi = loadImage("./images/Texturaroja.jpg");
}

function setup() {
    frameRate(60)
    createCanvas(windowWidth, windowHeight)
}

function draw() {
    background(backgroundi)
    noStroke();

    //timer
    textSize(35);
    fill(0);
    text("TIMER: "+ t, 800, 40);

    
    
    if(t>0){
        seleccion();
    }
    
    

    textSize(35);
    fill(0);
    text("Victorias: "+ victorias, x+200,40);
    text("Derrotas: "+ derrotas, x+200,80);

    switch(selection){
        case 0:
            image(rock, x, y, size, size)
 
        break;

        case 1:
            image(paper, x, y, size, size)
            
            
        break;
        case 2:
            image(scissors, x, y, size, size)
            
        break;
        default:
            image(paper, x, y, size, size)
        break;
    }

 
    image(rock, rockp.x, rockp.y, rockp.size, rockp.size)
    image(paper, paperp.x, paperp.y, paperp.size, paperp.size)
    image(scissors, scissorsp.x, scissorsp.y, scissorsp.size, scissorsp.size)


    //other user
    textSize(35);
    fill(0);
    text("Victorias: "+ derrotas, 1350, 40);
    text("Derrotas: "+ victorias, 1350, 80);


    if(t===0 ){
        MandarDatos(selection)
    }

    switch(enemyselection){
            
        case 0:
            translate(rock.width, 0);  // Mueve el punto de origen al final de la imagen original
            scale(-1, 1);
            image(rock, -800, 400, size, size);
        break;

        case 1:
            translate(paper.width, 0);  // Mueve el punto de origen al final de la imagen original
            scale(-1, 1);
            image(paper, -800, 400, size, size);
            
        break;
        case 2:
            translate(scissors.width, 0);  // Mueve el punto de origen al final de la imagen original
            scale(-1, 1);
            image(scissors, -800, 400, size, size);
            
        break;
        default:
            translate(paper.width, 0);  // Mueve el punto de origen al final de la imagen original
            scale(-1, 1);
            image(paper, -800, 400, size, size);
        break;
    }
}

function seleccion() {
    if (mouseX >= paperp.x && mouseX <= paperp.x + paperp.size  && mouseY >= paperp.y && mouseY <= paperp.y + paperp.size) {
    cursor(HAND);
    }
    else if (mouseX >= rockp.x && mouseX <= rockp.x + rockp.size  && rockp.y >= rockp.y && mouseY <= rockp.y + rockp.size) {
    cursor(HAND);
    }
    else if (mouseX >= scissorsp.x && mouseX <= scissorsp.x + scissorsp.size  && mouseY >= scissorsp.y && mouseY <= scissorsp.y + scissorsp.size) {
    cursor(HAND);
    }
    else {
    cursor(ARROW);
    }
}


function mouseClicked() {
    if(t>0){
        if (mouseX >= paperp.x && mouseX <= paperp.x + paperp.size  && mouseY >= paperp.y && mouseY <= paperp.y + paperp.size) {
            selection=1;
            }
            else if (mouseX >= rockp.x && mouseX <= rockp.x + rockp.size  && rockp.y >= rockp.y && mouseY <= rockp.y + rockp.size) {
                selection=0;
            }
            else if (mouseX >= scissorsp.x && mouseX <= scissorsp.x + scissorsp.size  && mouseY >= scissorsp.y && mouseY <= scissorsp.y + scissorsp.size) {
                selection=2;
            }
    }
}


async function MandarDatos(selection) {

    socket.emit ('enviar-elemento2', selection);
    console.log ("elemento 2 enviado", selection)

    await(socket.on('elemento1-recibido', (selecc)=>{
        console.log ("recibiendo1-elemento:", selecc)
        enemyselection = selecc;
    }))

    t=5;
}


socket.on('elemento2-recibido', (selecc)=>{
    console.log ("recibiendo2-elemento:", selecc)
    selection = selecc;
});

socket.on('tiempo-recibido', (ti)=>{
    console.log ("recibiendo-tiempo:", ti)
    t = ti;
});

socket.on('puntaje-recibido', (p)=>{
    console.log ("puntaje-elemento:", p)
    victorias = p.derrotas;
    derrotas = p.victorias;
});

