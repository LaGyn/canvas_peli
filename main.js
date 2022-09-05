const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.fillStyle = "orange";
canvas.fill();

ctx.beginPath();
ctx.arc(30,30, 30, 0, Math.PI * 2);
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



// Madon liikkuminen:

function move(){

}

function pelaa() {
    document.getElementById("pelinappi").style.display = "none";
}