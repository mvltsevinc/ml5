let mobilenet;
//let puffin;
let video;
let label='';

function modelReady() {
  console.log("Model is ready!");
  mobilenet.predict(gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    //console.log(results);
    label = results[0].className;
    mobilenet.predict(gotResults);
  }
}

// function imageReady() {
//   image(puffin, 0, 0, width, height);
// }

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(640, 550);
  //puffin = createImg("images/puffin.jpg", imageReady);
  //puffin.hide();
  video = createCapture(VIDEO);
  video.hide();
  background(0);

  //mobilenet = ml5.imageClassifier("MobileNet", modelReady);
  mobilenet = ml5.imageClassifier("MobileNet", video, modelReady);
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}
