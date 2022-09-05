function checkSupported() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext){
      ctx = canvas.getContext('2d');
      // Canvas is supported
    } else {
      // Canvas is not supported
      alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
  }