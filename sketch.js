let streams = [];
let fadeInterval = 1.6;
let symbolSize = 30;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);

  let x = 0;
  for (let i = 0; i <= width / symbolSize; i++) {
    let stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize;
  }

  textFont("Consolas");
  textSize(symbolSize);
}

function draw() {
  background(0, 150);
  streams.forEach(function (stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.value;

  this.switchInterval = round(random(2, 25));

  this.setToRandomSymbol = function () {
    let charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(0x30a0 + floor(random(0, 97)));
      } else {
        // set it to numeric
        this.value = floor(random(0, 10));
      }
    }
  };

  this.rain = function () {
    this.y = this.y >= height ? 0 : (this.y += this.speed);
  };
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 35));
  this.speed = random(2, 4);

  this.generateSymbols = function (x, y) {
    let opacity = 250;
    let first = round(random(0, 4)) == 1;
    for (let i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first, opacity);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= 255 / this.totalSymbols / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  };

  this.render = function () {
    this.symbols.forEach(function (symbol) {
      if (symbol.first) {
        fill(140, 255, 170, symbol.opacity);
      } else {
        fill(0, 255, 70, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  };
}
