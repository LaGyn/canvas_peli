const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;
let canvasBgColor = 'rgb(223, 173, 81)';
let canvasBorder = 'rgb(5, 141, 0)';
let vari = 'red';
this.gridSize = 30;

const mato = [
  {x: 15, y: 15},
  {x: 30, y: 15},
  {x: 45, y: 15},
  {x: 60, y: 15},
  {x: 75, y: 15}
];

//document.addEventListener('keydown', liiku)

function checkSupported() {
    if (!canvas.getContext){
      alert("Selaimesi ei tue canvas-tagia!");
    } 
  } 

// True if changing direction
let suunnanVaihto = false;
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;

// Pelaa
pelaa();
document.addEventListener("keydown", vaihdaSuunta);

function pelaa() {
    document.getElementById('pelinappi').style.display = 'block';
    document.getElementById('aloitus').style.display = 'none';
    document.getElementById('pisteruutu').style.display = 'block';
    document.getElementById('canvas').style.display = 'block';
    if (peliOhi()) return;

    suunnanVaihto = false;
    setTimeout(function onTick() {
    clearCanvas();
    liikuMato()
    piirraMato();
    // Call main again
    pelaa();
  }, 100)
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
  mato.pop();
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
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
   // Prevent the snake from reversing
  
   if (suunnanVaihto) return;
   suunnanVaihto = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;  
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight)
  {    
      dx = -10;
      dy = 0;  
  }

  if (keyPressed === UP_KEY && !goingDown)
  {    
      dx = 0;
      dy = -10;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft)
  {    
      dx = 10;
      dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp)
  {    
      dx = 0;
      dy = 10;
  }
}



function peliOhi() {
  for (let i = 4; i < mato.length; i++){    
    if (mato[i].x === mato[0].x && mato[i].y === mato[0].y) 
    return true
  }
  const hitLeftWall = mato[0].x < 0;  
  const hitRightWall = mato[0].x > canvas.width - 10;
  const hitToptWall = mato[0].y < 0;
  const hitBottomWall = mato[0].y > canvas.height - 10;
 
  return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall
  //document.getElementById("canvas").style.display = "none";
  //document.getElementById("lopetus").style.display = "block";
}

/*function luoRuokaPallo() {
  suggestedPoint = [Math.floor(Math.random()*(canvas.width/gridSize))*gridSize, Math.floor(Math.random()*(canvas.height/gridSize))*gridSize];
  if (matoBody.some(onPiste)) {
    luoRuokaPallo();
  } else {
    ctx.fillStyle = "rgb(20, 200, 10)";
    ctx.beginPath();
    ctx.arc(suggestedPoint[0], suggestedPoint[1], 15, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
  }
}:*/

/*function onPiste(element, index, array) {
  return (element[0] == suggestedPoint[0] && element[1] == suggestedPoint[1]);
}

function onSyonytItsensa() {
  return(element[0] == currentPosition['x'] && element[1] == currentPosition['y']);
}*/