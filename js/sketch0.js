function setup() {
  // uncomment this line to make the canvas the full size of the window
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('myContainer');

}

function draw() {
  // draw stuff here
  ellipse(width/2, height/2, 500, 50);
}
