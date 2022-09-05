const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

this.gridSize = 30;
madonBody = [];
ctx.fill();

document.addEventListener('keydown', liiku)

function checkSupported() {
    if (!canvas.getContext){
      alert("Selaimesi ei tue canvas-tagia!");
    } 
  } 

const mato = {
    x: 15,
    y: 15,
    nopeusX: 5,
    nopeusY: 5,
    radius: 15,
    color: 'red',
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        }
}

// Madon liikkuminen:
/*
function draw(){
    //ctx.clearRect(0,0,canvas.width, canvas.height);
    mato.draw();
    mato.x += mato.nopeusX;
    mato.y += mato.nopeusY;
}*/
  
function liiku(event){
    mato.draw();
    if (event.keyCode == 39){ // Nuoli oikealle
        mato.x += mato.nopeusX;
    }

}

function pelaa() {
    document.getElementById("pelinappi").style.display = "none";
    document.getElementById("aloitus").style.display = "none";
    luoRuokaPallo();
    mato.draw();
}

function peliOhi() {
  document.getElementById("canvas").style.display = "none";
  document.getElementById("lopetus").style.display = "block";
}

function luoRuokaPallo() {
  suggestedPoint = [Math.floor(Math.random()*(canvas.width/gridSize))*gridSize, Math.floor(Math.random()*(canvas.height/gridSize))*gridSize];
  if (madonBody.some(onPiste)) {
    luoRuokaPallo();
  } else {
    ctx.fillStyle = "rgb(20, 200, 10)";
    ctx.beginPath();
    ctx.arc(suggestedPoint[0], suggestedPoint[1], 15, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
  }
}

function onPiste(element, index, array) {
  return (element[0] == suggestedPoint[0] && element[1] == suggestedPoint[1]);
}