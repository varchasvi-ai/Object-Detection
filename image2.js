
img="";
status="";
objects=[];


function preload(){
    img=loadImage('https://static.scientificamerican.com/sciam/cache/file/528E0B49-CDD0-42D4-B5BAA3EBAEC01AE6_source.jpg');
}

function setup(){
    canvas= createCanvas(640,420);
    canvas.position(450,400);
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
}

function modelLoaded()
{
console.log("Model is Loaded!");
status=true;
objectDetector.detect(img, gotResult)
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(img,0,0,640,420);

    if(status!="")
    {
        for(i=0;i<objects.length; i++)
        {
            document.getElementById("status").innerHTML=" Status: Detection in Progress";
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " "+percent + "%", objects[i].x,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("status").innerHTML="Status: Detection Over";
        }
    }
}
