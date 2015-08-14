var containerName = 'rlsquare';
var s = function(p) {
  var wcontainer = document.getElementById(containerName).parentNode.clientWidth;
  var hcontainer = document.getElementById(containerName).parentNode.clientHeight;
  var params;  // params we're optimizing to determing the full sketch
  var tInPass;  // how far through this sigmoid pass we are
  var tTotalPass;
  var hsv1, hsv2, pColor1;  // ingredients needed to blend into col
  var col;  // current color
  var FRAMERATE = 30;
  var forwardPass = true;  // if we're on forward or backward pass through colors

  ////// EVENT LISTENERS
  p.setup = function() {  // onInit
    var mycanvas = p.createCanvas(wcontainer, hcontainer);
    p.frameRate(FRAMERATE);
    p.colorMode(p.HSB); // set colors with HSB (same as HSV)
    params = getNewParams();
    setupRLSquare(params);
    console.log(params);
    tTotalPass = params.tforward;
  };

  p.draw = function() { // onFrame
    p.background(0);
    p.fill(255);

    tInPass += 1/FRAMERATE;  // frame2second
    if(tInPass>=tTotalPass){
      forwardPass = !forwardPass;
      tTotalPass = forwardPass ? params.forward : params.backward;
      tInPass = 0.;  // reset pass timer
    }

    // update color
    updateColor();
  };


  p.keyPressed = function() {  // onKey
    if ((p.keyCode === 32) || (p.keyCode === p.RETURN || p.keyCode === p.ENTER)){
      var k = p.keyCode;
      if(k===32){console.log('space pressed');}
      else if(k===p.RETURN){console.log('return pressed');}
      else if(k===p.ENTER){console.log('enter pressed');}
      params = getNewParams();
      setupRLSquare(params);
      // var score = t0 - time();
      // store_score(info, score);
      // start_again();
    }
  };

  ////// SUBROUTINES (don't return things, not modular)
  function setupRLSquare(params){
    tInPass = 0;
    pColor1 = 0.;
    col = makeColor(params, pColor1);
    p.background(col['h'], col['s'], col['v']);  // set square color
  }

  function updateColor(){
    pColor1 = calculatePercentColorOne(tInPass, tTotalPass, params.steepness);
    if( !forwardPass ){ pColor1 = 1. - pColor1; }
    var hsv1 = [params.h1, params.s1, params.v1];
    var hsv2 = [params.h2, params.s2, params.v2];
    col = makeColor(hsv1, hsv2, pColor1);
    p.background(col['h'], col['s'], col['v']);  // set square color
  }

  function getNewParams(){  //FIXME: need to make pass params from backend with ajax
    var params = [];
    for(var i=0; i<10; i++){
    params.push(Math.random());
    }
    // TODO: ajax stuff started below
    // params = $.ajax(myRoute), {
    //   success: function(res){
    //     params = res;
    //   }
    //   error: function(){
    //     alert('params not successfully passed');}
    // }
    return params;
  }


  ////// HELPERS (modular; return things)
  function logistic(x, steepness, offset){
    var y = 1./(1. + (Math.exp(-steepness*(x-offset))));
    return y;
  }

  function calculatePercentColorOne(tInPass, tTotalPass, steepness){
    var range = 12.;  // in sigmoid world, will ossilate bt [-range/2., range/2.]
    var percentThroughPass = tInPass / tTotalPass;
    var pColor1 = logistic(percentThroughPass*range, steepness, range/2.);
    return pColor1;
  }

  function makeColor(hsv1, hsv2, pColor1){
        var w1 = pColor1;
        var w2 = 1. - pColor1;
        w1 *= 255.;
        w2 *= 255.;
        return {'h': hsv1[0]*w1 + hsv2[0]*w2,
                's': hsv1[1]*w1 + hsv2[1]*w2,
                'v': hsv1[2]*w1 + hsv2[2]*w2};
  };

  function time(){
      return new Date().getTime();
  }
};  // end s

var myp5 = new p5(s, containerName);
