var containerName = 'myContainer';
var s = function(p) {

  var x = 100; 
  var y = 100;

  var wcontainer = document.getElementById(containerName).parentNode.clientWidth;
  var hcontainer = document.getElementById(containerName).parentNode.clientHeight;

  p.setup = function() {
    var mycanvas = p.createCanvas(wcontainer, hcontainer);
  };

  p.draw = function() {
    p.background(0);
    p.fill(255);
    p.rect(x,y,50,50);
  };

  p.keyPressed = function() {
    if ((p.keyCode === 32) || (p.keyCode === p.RETURN || p.keyCode === p.ENTER)){
      console.log('enter pressed.');
      // var score = t0 - time();
      // store_score(info, score);
      // start_again();
    }
  };
};

// function store_score(info, score) {
    
// }

// function time(){
//     return new Date().getTime();
// }

var myp5 = new p5(s, containerName);
