song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftwrist = 0;
scoreRightWrist=0;
function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(550, 500);
    canvas.position(400, 150);
    img = createCapture(VIDEO);
    img.hide();
    poseNet = ml5.poseNet(img, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is started ");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
        console.log("scoreLeftWrist = " + scoreLeftwrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw() {
    image(img, 0, 0, 550, 500);

    fill("#ff0000");
    stroke("#ff0000");
    if(scoreRightWrist>0.2 ){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }

       else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }

        else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }

        else if(rightWristY>400){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
    if (scoreLeftwrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        numberleftWristY = Number(leftWristY);
        removedecimal = floor(numberleftWristY);
        volume = removedecimal / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }

}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}