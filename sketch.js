var mySong;
var img1;
var img2;

function preload(){
  mySong = loadSound('./assets/Hedwig.mp3');
  img1=loadImage('./assets/hp1.png');
  img2=loadImage('./assets/hp2.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();

  analyser=new p5.Amplitude();
  analyser.setInput();
}

function draw() {
  background(30);
  var w = windowWidth/3;
  var h = windowHeight/1.2;
  var str = windowWidth/273;

  var p1 = windowWidth/6;
  var p2 = windowHeight/7;

  if (mySong.isPlaying() == false) {
      mySong.play();
    }

  var level = analyser.getLevel();
  var size = map(level, 0, 1, w+50, h);
  var t= random(size/20, size/10);
  var sc = map(level, 0, 1, 0.85, 0.95);
  var le = 'Welcom To Magic World!';

  if (frameCount > 100 && frameCount < 500){
    textSize(37);
    textStyle(BOLD);
    textFont('Lobster Two');
    textAlign(CENTER);
    fill(148, 18, 202, 150);
    text(le, windowWidth/2, windowHeight/9);

    imageMode(CENTER);
    image(img1, windowWidth/2, windowHeight/2 + 50, img1.width/16, img1.height/16);
  }

  if(frameCount < 530){
  push();
  frameRate(100);
  circle(w, h, size, p1, p2);
  pop();
} else if(frameCount < 650) {
  push();
  frameRate(7);
  translate(width/2, height/2);
  for(var i = 0; i < 50; i++){
  drawSquares(size, t, sc, str);
  }
  pop();
} else {
  background(0);
  imageMode(CENTER);
  image(img2, windowWidth/2, windowHeight/2, img1.width/1.2, img1.height/3);

  var hertz = map(level, 0, 1, 20.0, 440.0);
  stroke(random(50,200), random(0,50), random(100,200),200);
  for (var j = 0; j < width; j=j+=4) {
    var angle = map(j, 0, width, TWO_PI * hertz, 0);
    var sinValue = sin(angle) * 30 * (size/5);
    line(j, sinValue, j, height-sinValue);
    fill(random(50,200), random(0,50), random(100,200),200);
    ellipse(j, height-sinValue, 3.5);
  }

}


}

var a = 0;

function drawSquares(_size, _t, _sc, _str){

  this.size = _size;
  this.t = _t;
  this.sc = _sc;
  this.str = _str;

  strokeWeight(str);
  fill(random(50,200), random(0,50), random(100,200), this.t);
  angleMode(RADIANS);
  rotate(a);
  scale(this.sc);
  rectMode(CENTER);
  rect(0,0,this.size,this.size);
  a = a + 0.005;

  push();
  var x=(this.size/3) * cos(frameCount/100.0 * 4);
  var y=(this.size/3) * sin(frameCount/100.0 * 4);
  var x2=(this.size/4) * cos(frameCount/100.0);
  var y2=(this.size/4) * sin(frameCount/100.0);
  translate(width/2,height/2);
  stroke(random(50,200), random(0,50), random(100,200), 200);
  line(x,y,x2,y2);
  pop();
}

var num = 15;

function circle(_w, _h, _size, _p1, _p2){

  this.w = _w;
  this.h = _h;
  this.size = _size;
  this.p1 = _p1;
  this.p2 = _p2
  var col=lerpColor(color(148, 18, 202, 200),color(207, 17, 199, 200),frameCount/this.size);

	stroke(col);
	fill('grey');

  for (var i = 0; i < num; i++) {
		var
			t = frameCount / 200.0 * TWO_PI,
			angle = TWO_PI / num * i,
			d = map(sin(t + angle * 3), -1, 1, 100, 200),
			x = this.w + cos(angle) * d,
			y = this.w + sin(angle) * d,
			dd = 20;
		  x2 = map(sin(t), -1, 1, width / 2 - dd, width / 2 + dd) + cos(angle) * 20,
			y2 = map(cos(t), -1, 1, width / 2 - dd, width / 2 + dd) + sin(angle) * 20,
			sz = map(sin(t + angle * 3), -1, 1, 25, 75),
			sz2 = map(sin(t + angle * 3), -1, 1, 0, sz * .9);

		noFill();
		ellipse(x+this.p1, y-this.p2, sz, sz);
		ellipse(x+this.p1, y-this.p2, sz2, sz2);
		fill('white');
		ellipse(x+this.p1, y-this.p2, 5, 5);
	}
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
