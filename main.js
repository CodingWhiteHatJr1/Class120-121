function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}
function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotresult);
}
function modelLoaded() {
   console.log("Your Model has been Loaded");
}
var previousResult = "";
function gotresult(error, results) {
  if(error){
    console.error(error);
  }else{
    if((results[0].confidence>0.5)&&(previousResult!=results[0].label)){
      console.log(results);
      previousResult = results[0].label;
      var synth = window.speechSynthesis;
      speakData = "Object Detected is-"+results[0].label;
      var Utterthis = new SpeechSynthesisUtterance(speakData);
      synth.speak(Utterthis);

      document.getElementById("star").innerHTML = results[0].label;
      document.getElementById("shine").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}
