var sound;
var fft;

function preload(){
  //sound = loadSound("VSQ_MUSIC_0001.mp3");
  //sound = loadSound("VSQ_MUSIC_0002.mp3");
  /*sound = loadSound("VSQ_MUSIC_0009.mp3");*/
  //sound = loadSound("VSQ_MUSIC_0013.mp3");
  /*sound = loadSound("VSQ_MUSIC_0014.mp3");*/
  //sound = loadSound("VSQ_MUSIC_0017.mp3");
  //sound = loadSound("透明エレジー 4／25リマスタ_n_buna_202311230107.mp3");
  // sound = loadSound("ウミユリ.mp3")
  sound = loadSound("WiPE_OUT_MEMORIES.mp3")
}

function setup(){//起動したら一度だけ実行される
  createCanvas(800,800);
  background(0, 0, 255);//背景色を灰色に設定　RED、Green、Blue

  fft = new p5.FFT(0.8, 128);
  fft. setInput(sound);

  sound. loop();
  getAudioContext().suspend();
  colorMode(HSB, 255);
}

function draw(){//setup後に繰り返し実行される

  drawCircles();
  drawLines();
}

function drawCircles(){

  noFill();
  //noSmooth();
  blendMode(BLEND);
  background(0);

  blendMode(ADD);

  var spectrum = fft.analyze();

  for(var i = 0; i < spectrum.length; i++){
//color
    let hue = map(i, 0, spectrum.length - 1, 0, 255);
// get circle diameter
    var diameter = map(spectrum[i], 0, 255, 0, height/1.5);
//枠線の色と太さを設定
    if (spectrum[i] > 0){
      strokeWeight(10);
      stroke(hue, 255, 150, 50);
    }else {
      strokeWeight(1);
      stroke(0);
    }

    // square(width / 2, height / 2, diameter, diameter);
    // line(width / 2, height / 2, diameter, diameter);
    ellipse(width / 2, height / 2, diameter, diameter);

  }
}

function drawLines(){
  //background(0);
  var spectrum = fft.analyze();//解析結果をspectrumに入れる

  for (var i = 0; i < spectrum.length; i++){

//色を設定する
    let hue  = map(i, 0 ,spectrum.length - 1, 0, 255);
    fill(0, 0,70,100);
    
//グラフを書く
  var x = map(i, 0, spectrum.length, 0, windowWidth);
  var h = -windowHeight + map(spectrum[i], 0, 255, windowHeight, 0);
  //stroke("gray")
  rect (x, windowHeight, windowWidth / spectrum.length, h);
  
  }
}

/*function mousePressed() {
  if (sound.isPlaying()) {
    sound.stop();
  } else {
    sound.loop();
  }
}*/

function mousePressed(){
  userStartAudio();
}





/*var osc;//オシレータ用変数

function setup() {
  createCanvas(400,400);
  osc = new p5.Oscillator('sinewave');//オシレータを作ってoscに入れる
  osc.amp(1);//音量
  osc.freq(440);//周波数
  osc.start();//処理開始

  getAudioContext().suspend();

  // put setup code here
}

function draw() {

  if(mouseIsPressed){
    console.log("pressed");
    osc.amp(1);
  }

  else{
    console.log("released");
    osc.amp(0);
  }

  osc.freq(mouseX);
  // put drawing code here
}

function mousePressed(){
  userStartAudio();
}*/

/*
let mySound;
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('assets/doorbell');
}

function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(canvasPressed);
  background(220);
  text('tap here to play', 10, 20);
}

function canvasPressed() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  mySound.play();
}*/


