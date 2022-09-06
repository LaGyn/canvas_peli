const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

this.gridSize = 30;
const madonBody = [];
ctx.fill();
canvas.width = 800;
canvas.height = 600;

document.addEventListener('keydown', liiku)
//setInterval(liiku,100)
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
    nopeusx: -5,
    nopeusy: -5,
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

// Madon liikkuminen://
  
function liiku(event){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    mato.draw();
    if (event.keyCode == 39){ // Nuoli oikealle
        mato.x += mato.nopeusX;
    }
    if (event.keyCode == 37){ // Nuoli vasemmalle
        mato.x += mato.nopeusx;
    }
    if (event.keyCode == 40){ // Nuoli alas
        mato.y += mato.nopeusY;
    }
    if (event.keyCode == 38){ // Nuoli ylös
        mato.y += mato.nopeusy;
    }
    //Liikkumisrajoitukset:
    if (mato.x >= 785){
      mato.nopeusX = 0;
    }
    if (mato.x < 15){
      mato.nopeusx = 0;
    }
    if (mato.y >= 585){
      mato.nopeusY = 0;
    }
    if (mato.y < 15){
      mato.nopeusy = 0;
    }
    madonBody.push(mato);
}

function pelaa() {
    document.getElementById("pelinappi").style.display = "none";
    document.getElementById("aloitus").style.display = "none";
    document.getElementById("pisteruutu").style.display = "block";
    document.getElementById("canvas").style.display = "block";
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

function onSyonytItsensa() {
  return(element[0] == currentPosition['x'] && element[1] == currentPosition['y']);
}