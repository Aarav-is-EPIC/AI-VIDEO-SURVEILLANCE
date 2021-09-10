var status="";
objects=[];
function preload(){
    video=createVideo("video.mp4");
}
function setup(){
    canvas=createCanvas(350,350);
    canvas.center();
    video.hide();
}
function draw(){
   image(video,0,0,350,350);
   if(status!=""){
   objectD.detect(video,gotResult);
   for(counter = 0; counter<objects.length;counter++){
       document.getElementById("status").innerHTML="Status:Objects Detected";
       document.getElementById("number_of_objects").innerHTML = "The Number of Objects:"+objects.length;
       


       fill("red");
       percent = floor(objects[counter].confidence*100);
       text(objects[counter].label+" "+percent+"%",objects[counter].x +15,objects[counter].y +15);
       noFill();
       stroke("red");
       rect(objects[counter].x,objects[counter].y,objects[counter].width,objects[counter].height);
   }
   }
}
function start(){
    objectD=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
}
function modelLoaded(){
    console.log("Model has been loaded.");
    status=true;
    video.loop()
    video.volume(1);
    video.speed(1);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}