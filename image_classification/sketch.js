let mobilenet;
let video;
let label = "";
let predictor;
let slider;
let addButton;
let trainButton;

function modelReady() {
  console.log("Model is ready!");
}

function videoReady() {
  console.log("Video is ready!");
}

function whileTraining(loss) {
  if(loss == null){
    console.log("Training Completed");
    predictor.predict(gotResults);
  }else{
    console.log(loss);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    label = results;
    predictor.predict(gotResults);
  }
}

function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);

  mobilenet = ml5.featureExtractor("MobileNet", modelReady);
  predictor = mobilenet.regression(video, videoReady);

  slider = createSlider(0,1,0.5,0.01);


  addButton = createButton("add example image");
  addButton.mousePressed(function() {
    predictor.addImage(slider.value()); // bir resim al buna slider in o anki degerini ata
  });

  trainButton = createButton("train");
  trainButton.mousePressed(function() {
    predictor.train(whileTraining);
  });
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}
