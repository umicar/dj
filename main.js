song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(350, 300);
    canvas.position(500, 250);
    img = createCapture(VIDEO);
    img.hide();
poseNet= ml5.poseNet(img,modelLoaded);
poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is started ");
}

function gotPoses(results){
if(results.length>0){
    console.log(results);
    leftWristX= results[0].pose.leftWrist.x;
    leftWristY= results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

    rightWristX= results[0].pose.rightWrist.x;
    rightWristY= results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
}
}

function draw() {
    image(img, 0, 0, 350, 300);
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}