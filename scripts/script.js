// add on click listerner to night
var dark = true;
document
  .querySelector('.theme input[type="checkbox"]')
  .addEventListener("click", function (e) {
    if (dark) {
      console.log("dark enabled");
      document.body.className = "";
    } else {
      console.log("light enabled");
      document.body.className = "dark-theme";
    }
    dark = !dark;
  });

document
  .querySelector('.show input[type="checkbox"]')
  .addEventListener("click", function (e) {
    drawAll = !drawAll;
  });

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// add a bob on the canvas with random color and random length
function addDoublePenulum() {
  let dp = new DoublePendulum(
    suspensionx,
    suspensiony,
    length,
    length,
    (3 * Math.PI) / 4 + (Math.PI / 2) * Math.random(),
    Math.PI / 2 + Math.PI * Math.random(),
    mass,
    mass,
    getRandomColor()
  );
  doublePendulum.push(dp);
}

var lastTime;

// update the bobs
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < doublePendulum.length; i++) {
    if (doublePendulum[i].y > canvas.height + 200) {
      doublePendulum.splice(i, 1);
    } else {
      doublePendulum[i].update();
    }
  }
  requestAnimationFrame(update);
}

for (let i = 0; i < noOfPendulums; i++) {
  addDoublePenulum();
}

update();
