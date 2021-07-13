song = "";

function preload() {
    song=loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(350, 300);
    canvas.position(500, 250);
    img = createCapture(VIDEO);
    img.hide();
}

function draw() {
    image(img, 0, 0, 350, 300);
}

function play(){
    song.play();
}