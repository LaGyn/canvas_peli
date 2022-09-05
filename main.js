const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const mato = {
    
}
ctx.beginPath();
ctx.arc(15, 15, 15, 0, Math.PI * 2);
ctx.fillStyle = 'red';
ctx.fill();
ctx.closePath();

function checkSupported() {
    if (canvas.getContext){
      ctx = canvas.getContext('2d');
      // Canvas is supported
    } else {
      // Canvas is not supported
      alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
  }

function Position(position, speed){
    this.position = position;
    this.speed = speed;
}

// Madon liikkuminen:

function move(){
    let positionX = 15;
    let positionY = 15;
    let speed = 5;

}

function pelaa() {
    document.getElementById("pelinappi").style.display = "none";
}