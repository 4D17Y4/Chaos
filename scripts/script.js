// add on click listerner to night
var dark = true;

var show = document.getElementById("show");
show.addEventListener("click", function (e) {
  if (!drawAll) {
    show.innerHTML = "Hide";
  } else {
    show.innerHTML = "Show";
  }
  drawAll = !drawAll;
});

var themeButton = document.getElementById("theme");
themeButton.addEventListener("click", function (e) {
  var githubButton = document.getElementById("github");
  if (dark) {
    document.body.className = "";
    themeButton.className = "btn btn-outline-primary";
    githubButton.className = "btn btn-outline-primary";
    show.className = "btn btn-outline-primary";
    themeButton.innerHTML = "Dark";
  } else {
    document.body.className = "dark";
    show.className = "btn btn-outline-warning";
    githubButton.className = "btn btn-outline-warning";
    themeButton.className = "btn btn-outline-warning";
    themeButton.innerHTML = "Light";
  }
  dark = !dark;
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
  // call update again after 1 sec
  setTimeout(update, 1000 / div);

  // requestAnimationFrame(update);
}

for (let i = 0; i < noOfPendulums; i++) {
  addDoublePenulum();
}

update();
