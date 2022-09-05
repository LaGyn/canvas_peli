const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

class Mato {
   constructor({sijainti, vauhti, suunta}){
        this.sijainti = sijainti;
        this.vauhti = vauhti;
        this.suunta = suunta;
    }
    draw(){
    ctx.beginPath();
    ctx.arc(15, 15, 15, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
    }
}

const mato = new Mato({
    sijainti: {
        x: 15,
        y: 15
    },
    suunta: {
        x: 1,
        y: 1
    },
    vauhti: 5,
    
})

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