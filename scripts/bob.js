var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
ctx.lineCap = "round";

// aesthetic
var drawAll = false;
const bobColor = "#000000";
const stringColor = "#000000";
const B1hasTrail = false;
const B2hasTrail = true;
var randomTilt = true;
const noOfPendulums = 10;

class Bob {
  constructor(susx, susy, length, angle, radius, color, hasTrail) {
    randomTilt ? (this.tilt = (Math.random() * Math.PI) / 2) : (this.tilt = 0);
    this.x = susx + length * Math.sin(angle);
    this.y = susy + length * Math.cos(angle);
    this.radius = radius;
    this.color = color;
    this.length = length;
    this.angle = angle;
    this.hasTrail = hasTrail;
    this.trail = [];
  }

  drawString() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.susx, this.susy);
    ctx.strokeStyle = stringColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  drawTrail() {
    let prev = this.trail[0];
    let lineWidth = 2;
    for (let i = 1; i < this.trail.length; i++) {
      ctx.beginPath();
      ctx.moveTo(prev[0], prev[1]);
      ctx.lineTo(this.trail[i][0], this.trail[i][1]);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = lineWidth;
      lineWidth += 0.4;
      ctx.stroke();
      ctx.closePath();
      prev = this.trail[i];
    }
  }

  draw() {
    if (drawAll) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = bobColor;
      ctx.fill();
      ctx.closePath();
      this.drawString();
    }
    if (this.hasTrail) this.drawTrail();
  }

  update(susx, susy, newangle) {
    this.susx = susx;
    this.susy = susy;
    this.angle = newangle;
    this.x = susx + this.length * Math.sin(this.tilt + newangle);
    this.y = susy + this.length * Math.cos(this.tilt + newangle);
    this.trail.push([this.x, this.y]);
    if (this.trail.length > 40) {
      this.trail.shift();
    }
    this.draw();
  }
}
