// physics
const suspensionx = innerWidth / 2;
const suspensiony = innerHeight / 2;

// updates per second
const div = 100;
var gravity = 9.8;
const mass = 2;
const length = 150;
const lengthScale = 150;

const damping = 0.999999;
const radius = 7;

let doublePendulum = [];

class DoublePendulum {
  constructor(
    susx,
    susy,
    length1,
    length2,
    angle1,
    angle2,
    mass1,
    mass2,
    color
  ) {
    this.tilt = randomTilt ? Math.random() * 2 * Math.PI : 0;
    this.length1 = length1;
    this.length2 = length2;
    this.angle1 = angle1;
    this.angle2 = angle2;
    this.color = color;
    this.mass1 = mass1;
    this.mass2 = mass2;
    this.w1 = 0;
    this.w2 = 0;
    this.alpha1 = 0;
    this.alpha2 = 0;

    this.bob1 = new Bob(
      susx,
      susy,
      this.length1,
      this.angle1,
      radius,
      this.color,
      B1hasTrail,
      true
    );

    this.bob2 = new Bob(
      this.bob1.x,
      this.bob1.y,
      this.length2,
      this.angle2,
      radius,
      this.color,
      B2hasTrail
    );
  }

  totalEnergy() {
    var totalEnergy =
      (1 / 2) * this.mass1 * this.w1 * this.w1 * this.angle1 * this.angle1 +
      (1 / 2) * this.mass2 * this.w2 * this.w2 * this.angle2 * this.angle2 +
      this.mass1 * gravity * this.length1 * (1 - Math.cos(this.angle1)) +
      this.mass2 * gravity * this.length2 * (1 - Math.cos(this.angle2));

    return totalEnergy;
  }

  update() {
    // update angular acceleration , angular velocity and angle.

    // https://www.myphysicslab.com/pendulum/double-pendulum-en.html

    this.length1 /= lengthScale;
    this.length2 /= lengthScale;
    gravity /= div;
    gravity /= div;

    this.alpha1 =
      (-gravity * (2 * this.mass1 + this.mass2) * Math.sin(this.angle1) -
        this.mass2 * gravity * Math.sin(this.angle1 - 2 * this.angle2) -
        2 *
          Math.sin(this.angle1 - this.angle2) *
          this.mass2 *
          (this.w2 * this.w2 * this.length2 +
            this.w1 *
              this.w1 *
              this.length1 *
              Math.cos(this.angle1 - this.angle2))) /
      this.length1 /
      (2 * this.mass1 +
        this.mass2 -
        this.mass2 * Math.cos(2 * this.angle1 - 2 * this.angle2));

    this.alpha2 =
      (2 *
        Math.sin(this.angle1 - this.angle2) *
        (this.w1 * this.w1 * this.length1 * (this.mass1 + this.mass2) +
          gravity * (this.mass1 + this.mass2) * Math.cos(this.angle1) +
          this.w2 *
            this.w2 *
            this.length2 *
            this.mass2 *
            Math.cos(this.angle1 - this.angle2))) /
      this.length2 /
      (2 * this.mass1 +
        this.mass2 -
        this.mass2 * Math.cos(2 * this.angle1 - 2 * this.angle2));

    this.length1 *= lengthScale;
    this.length2 *= lengthScale;

    gravity *= div;
    gravity *= div;

    // update veclocity
    this.w1 += this.alpha1;
    this.w2 += this.alpha2;

    this.w1 *= damping;
    this.w2 *= damping;

    // update angle
    this.angle1 += this.w1;
    this.angle2 += this.w2;

    this.angle1 = ((this.angle1 * 2 * Math.PI) % 360) / (2 * Math.PI);
    this.alpha2 = ((this.angle2 * 2 * Math.PI) % 360) / (2 * Math.PI);

    this.bob1.update(suspensionx, suspensiony, this.tilt + this.angle1);
    this.bob2.update(this.bob1.x, this.bob1.y, this.tilt + this.angle2);
  }
}
