// Variables & stuff
var c = document.getElementById("mainCanvas");
var convNum = 1.73205080757;
c.height = window.innerHeight;
c.width = c.height;
s = c.width;
var hexSize = 3;
var redTurn = false;
var changed = false;
var started = false;
var flipping = false;
var ctx = c.getContext("2d");
ctx.lineWidth = 10;
var logo = new Image;
logo.src = "hexalogo.svg";
setTimeout(function(){ctx.drawImage(logo, 0, 0, s, s)}, 100);
var hexagons = [];
var hexImgs = [new Image, new Image, new Image, new Image];
hexImgs[0].src = "greyhex.svg";
hexImgs[1].src = "bluehex.svg";
hexImgs[2].src = "redhex.svg";
hexImgs[3].src = "darkgreyhex.svg";
for(var i = 0; i < 91; i++){
  hexagons[i] = [[0, 0], [0, 0], 0, [-1, -1, -1, -1, -1, -1], 0];
}
makeHexagons();
//Input
hexagons[60][2] = 3;
hexagons[58][2] = 3;
hexagons[36][2] = 3;
hexagons[38][2] = 3;
hexagons[40][2] = 3;
hexagons[62][2] = 3;
hexagons[78][2] = 3;
hexagons[60][4] = 3;
hexagons[58][4] = 3;
hexagons[36][4] = 3;
hexagons[38][4] = 3;
hexagons[40][4] = 3;
hexagons[62][4] = 3;
hexagons[78][4] = 3;
onmousedown = function(e){
  if(started) update(e.clientX - ((window.innerWidth-s) / 2), e.clientY);
  if(!started) start();
}

//Most stuff happens here
function  update(mX, mY){
  console.log("(" + mX + ", " + mY + ")");
  for(var i = 0; i < 91; i++){
    if((mX >= hexagons[i][0][0] - (s/26) && mX <= hexagons[i][0][0] + (s/26) && mY >= hexagons[i][0][1] - (s/26) && mY <= hexagons[i][0][1] + (s/26)) && hexagons[i][2] == 0){
      if(redTurn){
        flip(i, 2);
      } else {
        flip(i, 1);
      }
      console.log("This is hexagon " + i);
      do {
        changed = !changed;
        for(var i = 0; i < 91; i++){
          if(hexagons[i][2] != 0 && hexagons[i][2] != 3){
            var bNear = 0;
            var rNear = 0;
            if(hexagons[i][2] == 1){
              bNear += 1;
            }
            if(hexagons[i][2] == 2){
              rNear += 1;
            }
            //for(var j = 0; j < 6; j++){
            if(hexagons[i][3][0] != -1){
              if(hexagons[hexagons[i][3][0]][2] == 1){
                bNear += 1;
              }
              if(hexagons[hexagons[i][3][0]][2] == 2){
                rNear += 1;
              }
            }
            if(hexagons[i][3][1] != -1){
              if(hexagons[hexagons[i][3][1]][2] == 1){
                bNear += 1;
              }
              if(hexagons[hexagons[i][3][1]][2] == 2){
                rNear += 1;
              }
            }
            if(hexagons[i][3][2] != -1){
              if(hexagons[hexagons[i][3][2]][2] == 1){
                bNear += 1;
              }
              if(hexagons[hexagons[i][3][2]][2] == 2){
                rNear += 1;
              }
            }
            if(hexagons[i][3][3] != -1){
              if(hexagons[hexagons[i][3][3]][2] == 1){
                bNear += 1;
              }
              if(hexagons[hexagons[i][3][3]][2] == 2){
                rNear += 1;
              }
            }
            if(hexagons[i][3][4] != -1){
              if(hexagons[hexagons[i][3][4]][2] == 1){
                bNear += 1;
              }
              if(hexagons[hexagons[i][3][4]][2] == 2){
                rNear += 1;
              }
            }
            if(hexagons[i][3][5] != -1){
              if(hexagons[hexagons[i][3][5]][2] == 1){
                bNear += 1;
              }
              if(hexagons[hexagons[i][3][5]][2] == 2){
                rNear += 1;
              }
            }
            //}
            console.log(bNear + ", " + rNear + "(" + hexagons[i][1][0] + ", " + hexagons[i][1][1] + ")");
            if(redTurn){
              if((rNear > bNear) && hexagons[i][2] != 2){
                flip(i, 2);
                changed = true;
              }
              if((bNear > rNear) && hexagons[i][2] != 1){
                flip(i, 1);
                changed = true;
              }
            } else {
              if((bNear > rNear) && hexagons[i][2] != 1){
                flip(i, 1);
                changed = true;
              }
              if((rNear > bNear) && hexagons[i][2] != 2){
                flip(i, 2);
                changed = true;
              }
            }
          }
        }
      } while (changed);
      redTurn = !redTurn;
    }
  }
}

function start(){
  started = true;
  var logoY = 0;
  var startingSequence = setInterval(function(){
    logoY -= s/100;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, s, s);
    ctx.drawImage(logo, 0, logoY, s, s);
    if(logoY < -s){
      drawHexagons();
      clearInterval(startingSequence);
    }
  }, 1000/60);
}

//Creates the hexagons- they're squares rn- not anymore!!!!!
function makeHexagons(){
  var hexX = 0;
  var hexY = 0;
  for(var i = 0; i < 91; i++){
    hexagons[i][1][0] = hexX;
    hexagons[i][1][1] = hexY;
    hexY += 1;
    if(hexX == 9 && hexY == 7){
      hexX += 1;
      hexY = 5;
    }
    if(hexX == 8 && hexY == 8){
      hexX += 1;
      hexY = 4;
    }
    if(hexX == 7 && hexY == 9){
      hexX += 1;
      hexY = 3;
    }
    if(hexX == 6 && hexY == 10){
      hexX += 1;
      hexY = 2;
    }
    if(hexX == 5 && hexY == 11){
      hexX += 1;
      hexY = 1;
    }
    if(hexY == 11){
      hexY = 0;
      hexX += 1;
    }
  }
  for(var i = 0; i < 91; i++){
    hexagons[i][0][1] = hexagons[i][1][1] - 5;
    hexagons[i][0][0] = (hexagons[i][0][1]) / 1.9;
    hexagons[i][0][0] = Math.abs(hexagons[i][0][0]);
    hexagons[i][0][0] += hexagons[i][1][0];
    //if(hexagons[i][1][1] % 2 == 0){
      //hexagons[i][0][1] += 0.75;
    //}
    hexagons[i][0][1] += 5;
    hexagons[i][0][0] *= s/13;
    hexagons[i][0][1] *= s/14;
    hexagons[i][0][0] += s/13 * 1.5;
    hexagons[i][0][1] += s/13 * 1.5;
  }
  for(var i = 0; i < 91; i++){
    if(hexagons[i][1][1] == 5) for(var j = 0; j < 91; j++){
      if((hexagons[i][1][0] == hexagons[j][1][0] + 1) && (hexagons[i][1][1] == hexagons[j][1][1])){
        hexagons[i][3][0] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0] + 1) && (hexagons[i][1][1] == hexagons[j][1][1] - 1)){
        hexagons[i][3][1] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0]) && (hexagons[i][1][1] == hexagons[j][1][1] - 1)){
        hexagons[i][3][2] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0] - 1) && (hexagons[i][1][1] == hexagons[j][1][1])){
        hexagons[i][3][3] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0] + 1) && (hexagons[i][1][1] == hexagons[j][1][1] + 1)){
        hexagons[i][3][4] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0]) && (hexagons[i][1][1] == hexagons[j][1][1] + 1)){
        hexagons[i][3][5] = j;
      }
    }
    if(hexagons[i][1][1] < 5) for(var j = 0; j < 91; j++){
      if((hexagons[i][1][0] == hexagons[j][1][0] + 1) && (hexagons[i][1][1] == hexagons[j][1][1])){
        hexagons[i][3][0] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0] - 1) && (hexagons[i][1][1] == hexagons[j][1][1] - 1)){
        hexagons[i][3][1] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0]) && (hexagons[i][1][1] == hexagons[j][1][1] - 1)){
        hexagons[i][3][2] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0] - 1) && (hexagons[i][1][1] == hexagons[j][1][1])){
        hexagons[i][3][3] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0] + 1) && (hexagons[i][1][1] == hexagons[j][1][1] + 1)){
        hexagons[i][3][4] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0]) && (hexagons[i][1][1] == hexagons[j][1][1] + 1)){
        hexagons[i][3][5] = j;
      }
    }
    if(hexagons[i][1][1] > 5) for(var j = 0; j < 91; j++){
      if((hexagons[i][1][0] == hexagons[j][1][0] + 1) && (hexagons[i][1][1] == hexagons[j][1][1])){
        hexagons[i][3][0] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0] - 1) && (hexagons[i][1][1] == hexagons[j][1][1] + 1)){
        hexagons[i][3][1] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0]) && (hexagons[i][1][1] == hexagons[j][1][1] - 1)){
        hexagons[i][3][2] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0] - 1) && (hexagons[i][1][1] == hexagons[j][1][1])){
        hexagons[i][3][3] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0] + 1) && (hexagons[i][1][1] == hexagons[j][1][1] - 1)){
        hexagons[i][3][4] = j;
      }
      if((hexagons[i][1][0] == hexagons[j][1][0]) && (hexagons[i][1][1] == hexagons[j][1][1] + 1)){
        hexagons[i][3][5] = j;
      }
    }
  }
}

function drawHexagons(){
  var shrinkSize = 0;
  var speed = 0.05;
  var shrinkLoop = setInterval(function(){
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, s, s);
    for(var i = 0; i < 91; i++){
      //ctx.rotate(30*Math.PI/180);
      ctx.drawImage(hexImgs[hexagons[i][2]], hexagons[i][0][0]-(shrinkSize*hexSize*s/13/2), hexagons[i][0][1]-(hexSize*s/13/2), shrinkSize*hexSize*s/13, hexSize*s/13);
      //ctx.rotate(-30*Math.PI/180);
    }

    shrinkSize += speed;
    if(shrinkSize > 1.05){
      clearInterval(shrinkLoop);
    }
  }, 1000/60);
}

function flip(hex, nState){
  hexagons[hex][2] = nState;
  if(flipping){
    setTimeout(function(){flip(hex, nState)}, 500);
  } else {
    flipping = true;
    var shrinkSize = 1;
    var speed = -0.1;
    var shrinkLoop = setInterval(function(){
      ctx.fillStyle = "white";
      ctx.clearRect(0, 0, s, s);
      for(var i = 0; i < 91; i++){
        //ctx.rotate(30*Math.PI/180);
        if(i != hex) ctx.drawImage(hexImgs[hexagons[i][4]], hexagons[i][0][0]-(hexSize*s/13/2), hexagons[i][0][1]-(hexSize*s/13/2), hexSize*s/13, hexSize*s/13);
        //ctx.rotate(-30*Math.PI/180);
      }
      ctx.drawImage(hexImgs[hexagons[hex][4]], hexagons[hex][0][0]-(shrinkSize*hexSize*s/13/2), hexagons[hex][0][1]-(hexSize*s/13/2), shrinkSize*hexSize*s/13, hexSize*s/13);
      shrinkSize += speed;
      if(shrinkSize < 0){
        speed = 0.1;
        hexagons[hex][4] = nState;
      }
      if(shrinkSize > 1){
        flipping = false;
        clearInterval(shrinkLoop);
      }
    }, 1000/60);
  }
}
