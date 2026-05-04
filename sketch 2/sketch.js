//"Dani Lewis" example -- Sampling and Re-Drawing a font
//FINAL!
//Liat Berdugo
//credit: SuperHi

var font;
var points;
var nl = 0.01;

// preload the font
function preload() {
  font = loadFont("inconsolata-bold.ttf");
}

function setup() {
  createCanvas(1200, 600);
  textAlign(CENTER, CENTER); // centers horizontally and vertically

  // use textToPoints function built in to draw points
  // see https://p5js.org/reference/#/p5.Font/textToPoints
  points = font.textToPoints("Dani Lewis", 130, 330, 180, {
    sampleFactor: 0.1,
    simplifyThreshold: 0,
  });
}

function draw() {
  background("#e94e3c");
  noFill();
  stroke("#f3c043");

  // use beginShape() and endShape() to make a complex shape
  // see https://p5js.org/reference/#/p5/beginShape
  beginShape();
  points.forEach((point) => {
    let movement = createVector(0, 0);
    if (mouseX) {
      distance = dist(point.x, point.y, mouseX, mouseY);
      movement = createVector(point.x - mouseX, point.y - mouseY);
      movement = movement.mult(60 / distance);
    }

    const nx =
      movement.x +
      (noise(nl * point.x, nl * point.y, nl * frameCount) * 40 - 20);
    const ny =
      movement.y +
      (noise(nl * point.x, nl * point.y, nl * frameCount) * 40 - 20);
    vertex(point.x + nx, point.y + ny);
  });
  endShape();

  noStroke();
  fill("#f3c043");
  points.forEach((point) => {
    let movement = createVector(0, 0);
    if (mouseX) {
      distance = dist(point.x, point.y, mouseX, mouseY);
      movement = createVector(point.x - mouseX, point.y - mouseY);
      movement = movement.mult(60 / distance);
    }

    //     const move = 1 / distance
    const nx = movement.x;
    const ny = movement.y;
    circle(point.x + nx, point.y + ny, 5);
  });
}
