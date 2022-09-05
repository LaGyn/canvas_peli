const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.fillStyle = "orange";
ctx.fill();

document.addEventListener('keydown', liiku)

function checkSupported() {
    if (canvas.getContext){
      ctx = canvas.getContext('2d');
      // Canvas is supported
    } else {
      // Canvas is not supported
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

function liiku(event){
    if (event.keyCode == 39){ // Nuoli oikealle
        sijainti = this.sijainti.x + this.suunta.x * this.vauhti;
    }

}

function pelaa() {
    document.getElementById("pelinappi").style.display = "none";
    document.getElementById("aloitus").style.display = "none";
    mato.draw();
}

function peliOhi() {
  document.getElementById("canvas").style.display = "none";
  document.getElementById("lopetus").style.display = "block";
}