const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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