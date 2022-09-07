const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let canvasBgColor = 'rgb(169, 214, 93) ';
let canvasBorder = 'rgb(5, 141, 0)';
let vari = 'red';
this.gridSize = 30;

let ruokaX;
let ruokaY;

const mato = [
  { x: 255, y: 195 },
  { x: 225, y: 195 },
  { x: 195, y: 195 },
  { x: 165, y: 195 },
];

//document.addEventListener('keydown', liiku)

function checkSupported() {
    if (!canvas.getContext){
      alert("Selaimesi ei tue canvas-tagia!");
      return;
    } 
  } 

// True if changing direction
let suunnanVaihto = false;
// Horizontal velocity
let dx = 30;
// Vertical velocity
let dy = 0;

// Pelaa
/*pelaa(); */
document.addEventListener("keydown", vaihdaSuunta);
function pelaa() {
  checkSupported();
    document.getElementById('pelinappi').style.display = 'none';
    document.getElementById('aloitus').style.display = 'none';
    document.getElementById('pisteruutu').style.display = 'block';
    document.getElementById('canvas').style.display = 'block';
    main();
    RuokaSijainti();
}

function main() {
  if (peliOhi()) return;

    suunnanVaihto = false;
    setTimeout(function onTick() {
    clearCanvas();
    liikuMato()
    piirraMato();
    piirraRuoka();
    main();
  }, 200)
}

function clearCanvas() {
ctx.fillStyle = canvasBgColor;
ctx.strokestyle = canvasBorder;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function piirraMatoOsa(matoOsa) {   
  ctx.beginPath();
  ctx.arc(matoOsa.x, matoOsa.y, 15, 0, Math.PI * 2, true);
  ctx.fillStyle = vari;
  ctx.fill();
  ctx.closePath();
}

function piirraMato() {
  mato.forEach(piirraMatoOsa)
}
/*
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
}*/

// Madon liikkuminen://
  
function liikuMato(event){
  const head = {x: mato[0].x + dx, y: mato[0].y + dy};
  mato.unshift(head);
  if (mato[0].x === ruokaX && mato[0].y === ruokaY) {
    RuokaSijainti();
  } else {
    mato.pop();
  }
  
  /*
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
    madonBody.push(mato);*/
}

function vaihdaSuunta(event) {  
  const vasenNappi = 37;
  const oikeaNappi = 39;
  const ylosNappi = 38;
  const alasNappi = 40;
   // Prevent the snake from reversing
  
   if (suunnanVaihto) return;
   suunnanVaihto = true;
  const nappiPainettu = event.keyCode;
  const ylos = dy === -30;
  const alas = dy === 30;
  const oikealle = dx === 30;  
  const vasemmalle = dx === -30;

  if (nappiPainettu === vasenNappi && !oikealle)
  {    
      dx = -30;
      dy = 0;  
  }

  if (nappiPainettu === ylosNappi && !alas)
  {    
      dx = 0;
      dy = -30;
  }

  if (nappiPainettu === oikeaNappi && !vasemmalle)
  {    
      dx = 30;
      dy = 0;
  }

  if (nappiPainettu === alasNappi && !ylos)
  {    
      dx = 0;
      dy = 30;
  }
}

function peliOhi() {
  for (let i = 4; i < mato.length; i++){    
    if (mato[i].x === mato[0].x && mato[i].y === mato[0].y) 
    return true;
  }
  const vasenTormays = mato[0].x < 0;  
  const oikeaTormays = mato[0].x > canvas.width - 10;
  const ylaTormays = mato[0].y < 0;
  const alaTormays = mato[0].y > canvas.height - 10;
 
  return vasenTormays ||  oikeaTormays || ylaTormays || alaTormays;
  //document.getElementById("canvas").style.display = "none";
  //document.getElementById("lopetus").style.display = "block";
}

function luoKoordinaatit(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function RuokaSijainti() {
  ruokaX = luoKoordinaatit(0, canvas.width -10);
  ruokaY = luoKoordinaatit(0, canvas.height -10)
  mato.forEach(function onkoSyonytRuuan(osa) {
    if (osa.x == ruokaX && osa.y == ruokaY) {
      RuokaSijainti();
    }
  })
}

function piirraRuoka() {
  ctx.fillStyle = "rgb(0, 168, 0)"
  ctx.beginPath();
    ctx.arc(ruokaX, ruokaY, 15, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
}

/*function luoRuokaPallo() {
  suggestedPoint = [Math.floor(Math.random()*(canvas.width/gridSize))*gridSize, Math.floor(Math.random()*(canvas.height/gridSize))*gridSize];
  if (mato.some(onPiste)) {
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
} */
