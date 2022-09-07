const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let canvasBgColor = 'rgb(169, 214, 93) ';
let canvasBorder = 'rgb(5, 141, 0)';
let vari = 'red';
this.gridSize = 30;

let ruokaX;
let ruokaY;
let pisteet = 0;

// Mato osien sijainnit arrayssa:
const mato = [
  { x: 270, y: 210 },
  { x: 240, y: 210 },
  { x: 210, y: 210 },
  { x: 180, y: 210 },
];

// Selaintuen tutkiminen: 

function checkSupported() {
  if (!canvas.getContext) {
    alert("Selaimesi ei tue canvas-tagia!");
    return;
  }
}

// Jos suuntaa vaihdetaan, niin on true
let suunnanVaihto = false;
// Horisontaalinen nopeus:
let dx = 30; // Mato lähtee alussa oikealle
// Vertikaalinen nopeus:
let dy = 0;

//Lisätään napeille eventlistener:
document.addEventListener("keydown", vaihdaSuunta);

// Pelin aloitus kun nappia painetaan:

function pelaa() {
  checkSupported();
  document.getElementById('pelinappi').style.display = 'none';
  document.getElementById('aloitus').style.display = 'none';
  document.getElementById('pisteruutu').style.display = 'block';
  document.getElementById('canvas').style.display = 'block';
  main();
  RuokaSijainti(); // Lasketaan ruualle sijainti
}

// Funktioiden kutsunta mainissa, ajastin:

function main() {
  if (peliOhi()) {
    document.getElementById("canvas").style.display = "none";
    document.getElementById("pisteruutu").style.display = "none";
    document.getElementById("lopetus").style.display = "block";
    document.getElementById("pisteetLopussa").innerHTML = pisteet;
  }
  suunnanVaihto = false;
  setTimeout(function onTick() {
    clearCanvas();
    liikuMato()
    piirraMato();
    piirraRuoka();
    main(); // Funktio kutsuu itseään niin kauan kunnes peli on ohi
  }, 200) // Madon liikkumisnopeus
}

// Tyhjennetään canvas:

function clearCanvas() {
  ctx.fillStyle = canvasBgColor;
  ctx.strokestyle = canvasBorder;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Piirretään matopallo:

function piirraMatoOsa(matoOsa) {
  ctx.beginPath();
  ctx.arc(matoOsa.x - 15, matoOsa.y - 15, 15, 0, Math.PI * 2, true);
  ctx.fillStyle = vari;
  ctx.fill();
  ctx.closePath();
}

// Piirretään kokonainen mato:

function piirraMato() {
  mato.forEach(piirraMatoOsa)
}

// Madon liikkuminen://

function liikuMato(event) {
  const head = { x: mato[0].x + dx, y: mato[0].y + dy };
  mato.unshift(head);
  if (mato[0].x === ruokaX && mato[0].y === ruokaY) { // Jos madon pään sijainti on sama kuin ruuan, ruokapallosta tulee uusi pää. Lisäksi kutsutaan ruokasijainti() ja lasketaan pisteet
    RuokaSijainti();
    laskePisteet();
  } else {
    mato.pop();
  }
}

// Suunnanvaihto:

function vaihdaSuunta(event) {
  const vasenNappi = 37;
  const oikeaNappi = 39;
  const ylosNappi = 38;
  const alasNappi = 40;

  if (suunnanVaihto) return; // Vain yksi suunnavaihto yhtä päivitystä kohden
  suunnanVaihto = true;
  const nappiPainettu = event.keyCode;
  const ylos = dy === -30;
  const alas = dy === 30;
  const oikealle = dx === 30;
  const vasemmalle = dx === -30;

  if (nappiPainettu === vasenNappi && !oikealle) { // Mato ei voi mennä vastakkaiseen suuntaan (syödä itseään)!
    dx = -30;
    dy = 0;
  }

  if (nappiPainettu === ylosNappi && !alas) {
    dx = 0;
    dy = -30;
  }

  if (nappiPainettu === oikeaNappi && !vasemmalle) {
    dx = 30;
    dy = 0;
  }

  if (nappiPainettu === alasNappi && !ylos) {
    dx = 0;
    dy = 30;
  }
}

// Pelin loppuminen:

function peliOhi() {
  for (let i = 4; i < mato.length; i++) {
    if (mato[i].x === mato[0].x && mato[i].y === mato[0].y)
      return true;
  }
  const vasenTormays = mato[0].x < 30;
  const oikeaTormays = mato[0].x > canvas.width;
  const ylaTormays = mato[0].y < 30;
  const alaTormays = mato[0].y > canvas.height;

  return vasenTormays || oikeaTormays || ylaTormays || alaTormays;
}

// Ruualle arvotaan koordinaatit:

function luoKoordinaatit(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 30) * 30;
}

// Ruoka tulostetaan uudelle paikalle, mikäli mato on tavoittanut ruuan:

function RuokaSijainti() {
  ruokaX = luoKoordinaatit(15, canvas.width - 15); // parametreina min ja max arvot, jotta ruoka ei tulostu osittain rajojen ulkopuolelle
  ruokaY = luoKoordinaatit(15, canvas.height - 15)
  mato.forEach(function onkoKohdalla(osa) {
    if (osa.x == ruokaX && osa.y == ruokaY) { // Jos madon osa on ruokasijainnissa, lasketaan uusi ruokasijainti
      RuokaSijainti();
    }
  })
}

// Ruokapallon piirtäminen:

function piirraRuoka() {
  ctx.fillStyle = "rgb(0, 168, 0)"
  ctx.beginPath();
  ctx.arc(ruokaX - 15, ruokaY - 15, 15, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
}

// Lasketaan pisteet:

function laskePisteet() {
  pisteet += 10;
  document.getElementById('pisteetNyt').innerHTML = pisteet;
}
