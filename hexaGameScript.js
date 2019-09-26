// Variables & stuff
var scale = 2;
if(localStorage.mobile == undefined) localStorage.mobile = "false";
var c = document.getElementById("mainCanvas");
var convNum = 1.73205080757;
c.height = window.innerHeight;
if(localStorage.mobile == "false") c.height *= scale;
document.body.style.zoom = 1 / scale;
if(localStorage.mobile == "true") document.body.style.zoom = 1;
c.width = c.height;
s = c.width;
var body = document.getElementById("body");
var hexSize = 3;
var makeTimerHappen;
var turn = 0;
var players = 2;
var changed = false;
var bgColors = [0, 0, 0];
var started = false;
var flipping = false;
var ctx = c.getContext("2d");
ctx.lineWidth = 10;
var logo = new Image;
var undoButton = new Image;
undoButton.src = "Assets/UndoButton.svg";
var replayButton = new Image;
replayButton.src = "Assets/ReplayButton.svg";
var backButton = new Image
backButton.src = "Assets/BackButton.svg";
var playButton = new Image;
playButton.src = "Assets/PlayButton.svg";
logo.src = "hexalogo.svg";
var numbers = [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image];
var oldMoves = [];
var turnNumber = 0;
var upArrow = new Image;
var downArrow = new Image;
upArrow.src = "Assets/UpArrow.svg";
downArrow.src = "Assets/DownArrow.svg";
for(var i = 0; i < numbers.length; i++){
  numbers[i].src = "Assets/" + i + ".svg";
}
logo.onload = function(){ctx.drawImage(logo, 0, -s * (1/6), s, s);};
ctx.textAlign = "center";
ctx.font = s / 25 + "px Yeee";
ctx.fillText("", 0, 0);
document.fonts.onloadingdone = function () {
  ctx.fillText("# of players:", s * (4.6 / 8), s * (3.0675 / 4));
}
//playButton.onload = function(){ctx.drawImage(playButton, s * (1/4) - ((s / 2) / 2), s * (3/4) - ((s / 2) / 2), s / 2, s / 2);};
downArrow.onload = function(){ctx.drawImage(downArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) + (s / 12), s / 4, s / 4);};
upArrow.onload = function(){ctx.drawImage(upArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) - (s / 12), s / 4, s / 4);};
numbers[2].onload = function(){ctx.drawImage(numbers[players], s * (3 / 4) - (s / 10), s * (3/4) - ((s / 5) / 2), s / 5, s / 5);};
var hexagons = [];
var hexImgs = [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image];
hexImgs[0].src = "greyhex.svg";
hexImgs[1].src = "Assets/RedHex.svg";
hexImgs[2].src = "Assets/BlueHex.svg";
hexImgs[3].src = "darkgreyhex.svg";
hexImgs[4].src = "Assets/YellowHex.svg";
hexImgs[5].src = "Assets/GreenHex.svg";
hexImgs[6].src = "Assets/PurpleHex.svg";
hexImgs[7].src = "Assets/LightBlueHex.svg";
var colorLoop;
for(var i = 0; i < 91; i++){
  hexagons[i] = [[0, 0], [0, 0], 0, [-1, -1, -1, -1, -1, -1], 0];
}
makeHexagons();
//Input
hexagons[60][2] = 3;
hexagons[57][2] = 3;
hexagons[24][2] = 3;
hexagons[27][2] = 3;
hexagons[30][2] = 3;
hexagons[63][2] = 3;
hexagons[84][2] = 3;
hexagons[60][4] = 3;
hexagons[57][4] = 3;
hexagons[24][4] = 3;
hexagons[27][4] = 3;
hexagons[30][4] = 3;
hexagons[63][4] = 3;
hexagons[84][4] = 3;

var time = 0;

var optionsOpen = false;

onmousedown = function(e){
  if(!optionsOpen){
    var x = (e.clientX * scale);
    x -= ((window.innerWidth - (s / scale)) * (scale / 2));
    var y = e.clientY * scale;
    if(e.which == 1){
      if(started && !flipping) update(x, y);
      if(!started){
        //if(Math.hypot(y - s * (3/4), x -  s * (1/4)) < s / 12) start();
        if(Math.hypot(y - (s * (3/4) - (s / 12)), x - (s * (3 / 4))) < s / 50){
          players++;
          if(players > 6) players = 2;
          ctx.clearRect(s * (2 / 4) - (s / 10), s * (3/4) - ((s / 5) / 2), s / 5 + (s / 2), s / 5);
          ctx.drawImage(numbers[players], s * (3 / 4) - (s / 10), s * (3/4) - ((s / 5) / 2), s / 5, s / 5);
          ctx.drawImage(downArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) + (s / 12), s / 4, s / 4);
          ctx.drawImage(upArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) - (s / 12), s / 4, s / 4);
          ctx.fillText("# of players:", s * (4.6 / 8), s * (3.0675 / 4));
        }
        if(Math.hypot(y - (s * (3/4) + (s / 12)), x - (s * (3 / 4))) < s / 50){
          players--;
          if(players < 2) players = 6;
          ctx.clearRect(s * (2 / 4) - (s / 10), s * (3/4) - ((s / 5) / 2), s / 5 + (s / 2), s / 5);
          ctx.drawImage(numbers[players], s * (3 / 4) - (s / 10), s * (3/4) - ((s / 5) / 2), s / 5, s / 5);
          ctx.drawImage(downArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) + (s / 12), s / 4, s / 4);
          ctx.drawImage(upArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) - (s / 12), s / 4, s / 4);
          ctx.fillText("# of players:", s * (4.6 / 8), s * (3.0675 / 4));
        }
      }
    }
  }
}
onmousemove = function(e){
  var x = (e.clientX * scale);
  x -= ((window.innerWidth - (s / scale)) * (scale / 2));
  var y = e.clientY * scale;
  if(Math.hypot(y - (s * (3/4) - (s / 12)), x - (s * (3 / 4))) < s / 50 && !started){
    console.log("yeet");
    ctx.clearRect(s * (2 / 4) - (s / 10), s * (3/4) - ((s / 5) / 2), s / 5 + (s / 2), s / 5);
    ctx.drawImage(numbers[players], s * (3 / 4) - (s / 10), s * (3/4) - ((s / 5) / 2), s / 5, s / 5);
    ctx.drawImage(downArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) + (s / 12), s / 4, s / 4);
    ctx.drawImage(upArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) - (s / 12), s / 4, s / 4);
    ctx.fillText("# of players:", s * (4.6 / 8), s * (3.0675 / 4));
  }
  if(Math.hypot(y - (s * (3/4) + (s / 12)), x - (s * (3 / 4))) < s / 50 && !started){
    console.log("Yee");
    ctx.clearRect(s * (2 / 4) - (s / 10), s * (3/4) - ((s / 5) / 2), s / 5 + (s / 2), s / 5);
    ctx.drawImage(numbers[players], s * (3 / 4) - (s / 10), s * (3/4) - ((s / 5) / 2), s / 5, s / 5);
    ctx.drawImage(downArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) + (s / 12), s / 4, s / 4);
    ctx.drawImage(upArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) - (s / 12), s / 4, s / 4);
    ctx.fillText("# of players:", s * (4.6 / 8), s * (3.0675 / 4));
  }
}
ontouchstart = function(e){
  if(started) update(e.touches[0].clientX - ((window.innerWidth-s) / 2), e.touches[0].clientY);
  if(!started){
    var x = e.touches[0].clientX - ((window.innerWidth-s) / 2);
    var y = e.touches[0].clientY;
    if(Math.hypot(y - s * (3/4), x -  s * (1/4)) < s / 12) start();
    if(Math.hypot(y - (s * (3/4) - (s / 12)), x - (s * (3 / 4))) < s / 50){
      players++;
      if(players > 6) players = 2;
      ctx.clearRect(s * (3 / 4) - (s / 10), s * (3/4) - ((s / 5) / 2), s / 5, s / 5);
      ctx.drawImage(numbers[players], s * (3 / 4) - (s / 10), s * (3/4) - ((s / 5) / 2), s / 5, s / 5);
      ctx.drawImage(downArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) + (s / 12), s / 4, s / 4);
      ctx.drawImage(upArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) - (s / 12), s / 4, s / 4);
      ctx.fillText("# of players:", s * (4.6 / 8), s * (3.0675 / 4));
    }
    if(Math.hypot(y - (s * (3/4) + (s / 12)), x - (s * (3 / 4))) < s / 50){
      players--;
      if(players < 2) players = 6;
      ctx.clearRect(s * (3 / 4) - (s / 10), s * (3/4) - ((s / 5) / 2), s / 5, s / 5);
      ctx.drawImage(numbers[players], s * (3 / 4) - (s / 10), s * (3/4) - ((s / 5) / 2), s / 5, s / 5);
      ctx.drawImage(downArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) + (s / 12), s / 4, s / 4);
      ctx.drawImage(upArrow, s * (3 / 4) - (s / 8), s * (3/4) - ((s / 4) / 2) - (s / 12), s / 4, s / 4);
      ctx.fillText("# of players:", s * (4.6 / 8), s * (3.0675 / 4));
    }
  }
  localStorage.mobile = "true";
}

var winner = "yee";

//Most stuff happens here
function  update(mX, mY){
  if(mX >= (s * (6 /8)) && mY >= (s * (6 /8))) undo();
  console.log("(" + mX + ", " + mY + ")");
  //Send mouse to shadow realm
  if(winner != "yee"){
    mX = "shadow realm";
  }
  for(var i = 0; i < 91; i++){
    if((mX >= hexagons[i][0][0] - (s/26) && mX <= hexagons[i][0][0] + (s/26) && mY >= hexagons[i][0][1] - (s/26) && mY <= hexagons[i][0][1] + (s/26)) && hexagons[i][2] == 0){
      oldMoves[turnNumber] = [];
      for(var j = 0; j < 91; j++){
        oldMoves[turnNumber][j] = hexagons[j][2];
      }
      turnNumber++;
      switch(turn){
        case 0:
          flip(i, 1);
          break;
        case 1:
          flip(i, 2);
          break;
        case 2:
          flip(i, 4);
          break;
        case 3:
          flip(i, 5);
          break;
        case 4:
          flip(i, 6);
          break;
        case 5:
          flip(i, 7);
          break;
      }
      //console.log("This is hexagon " + i);
      do {
        changed = !changed;
        var order;
          switch(turn){
            case 0:
              order = [1, 7, 6, 5, 4, 2];
              break;
            case 1:
              order = [2, 1, 7, 6, 5, 4];
              break;
            case 2:
              order = [4, 2, 1, 7, 6, 5];
              break;
            case 3:
              order = [5, 4, 2, 1, 7, 6];
              break;
            case 4:
              order = [6, 5, 4, 2, 1, 7];
              break;
            case 5:
              order = [7, 6, 5, 4, 2, 1];
              break;
          }
          for(var k = 0; k < 6; k++){
            for(var i = 0; i < 91; i++){
              if(hexagons[i][2] != 0 && hexagons[i][2] != 3){
                var near = [-1, 0, 0, -1, 0, 0, 0, 0];
                near[hexagons[i][2]]++;
                for(var j = 0; j < 6; j++){
                  if(hexagons[i][3][j] != -1){
                    if(hexagons[hexagons[i][3][j]][2] != 0 && hexagons[hexagons[i][3][j]][2] != 3)
                    near[hexagons[hexagons[i][3][j]][2]]++;
                  }
                }
                if(near[order[k]] > near[hexagons[i][2]]){
                  flip(i, order[k]);
                  changed = true;
                }
              }
            }
          }
      } while (changed);
      turn++;
      while(chessTimerBoxChecked && !(chessTimes[turn] > 0)){
        turn++;
        if(turn >= players) turn = 0;
      }
      time = 0;
      startTimerThingy();
      if(turn >= players) turn = 0;
      switch(turn){
        case 0:
          bgColorFadeTo(255, 0, 0);
          break;
        case 1:
          bgColorFadeTo(0, 150, 255);
          break;
        case 2:
          bgColorFadeTo(255, 255, 0);
          break;
        case 3:
          bgColorFadeTo(0, 255, 0);
          break;
        case 4:
          bgColorFadeTo(255, 0, 255);
          break;
        case 5:
          bgColorFadeTo(0, 255, 255);
          break;
      }
    }
  }
  updateScoreboard();
  if(getScore()[6] == 0){
    var winnerNum = 0;
    for(var i = 0; i < getScore().length; i++){
      if(getScore()[i] > winnerNum){
        winnerNum = getScore()[i];
        winner = i;
      }
    }
    switch(winner){
      case 0:
        winner = "Red";
        break;
      case 1:
        winner = "Blue";
        break;
      case 2:
        winner = "Yellow"
        break;
      case 3:
        winner = "Green";
        break;
      case 4:
        winner = "Purple";
        break;
      case 5:
        winner = "Cyan";
        break;
    }
    console.log(winner + " Wins!");
    document.getElementById("winScreen").style.display = "flex";
    document.getElementById("winScreen").innerHTML = "<span id='winText'>" + winner + " Wins!</span>";
    
  }
}

function start(){

  startTimerThingy();
  /*
  var logoY =  -s * (1/6);
  var choicesY = 0;*/
  var opacity = 0;
  var startingSequence = setInterval(function(){
    /*logoY -= s/100;
    choicesY += s/100;
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, s, s);
    ctx.drawImage(logo, 0, logoY, s, s);
/*
    ctx.drawImage(hexImgs[1], 0, s * (3/4) + choicesY, hexSize*s/13, hexSize*s/13);
    ctx.drawImage(hexImgs[2], (hexSize*s/13/3), s * (3/4) + choicesY, hexSize*s/13, hexSize*s/13);
    //3 player option
    ctx.drawImage(hexImgs[1], s * (2.8/8), s * (3/4) + choicesY, hexSize*s/13, hexSize*s/13);
    ctx.drawImage(hexImgs[2], s * (2.8/8) + (hexSize*s/13/3), s * (3/4) + choicesY, hexSize*s/13, hexSize*s/13);
    ctx.drawImage(hexImgs[4], s * (3.1/8), s * (3/4) - (hexSize*s/13/3.4) + choicesY, hexSize*s/13, hexSize*s/13);
    //4 player option
    ctx.drawImage(hexImgs[1], s * (5.8/8), s * (3/4) + choicesY, hexSize*s/13, hexSize*s/13);
    ctx.drawImage(hexImgs[2], s * (5.8/8) + (hexSize*s/13/3), s * (3/4) + choicesY, hexSize*s/13, hexSize*s/13);
    ctx.drawImage(hexImgs[4], s * (6.1/8), s * (3/4) - (hexSize*s/13/3.4) + choicesY, hexSize*s/13, hexSize*s/13);
    ctx.drawImage(hexImgs[5], s * (6.1/8) - (hexSize*s/13/3), s * (3/4) - (hexSize*s/13/3.4) + choicesY, hexSize*s/13, hexSize*s/13);
    if(logoY < -s){
      drawHexagons();
      started = true;
      body.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
      bgColors = [255, 0, 0];
      clearInterval(startingSequence);
    }
    */
    opacity += 0.01;
    if(opacity > 1) opacity = 1;
    ctx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
    document.getElementById("actualPlayButton").style.opacity = 1 - (opacity * 3);
    ctx.fillRect(0, 0, s, s);
    if(opacity >= 0.5 && !started){
      document.getElementById("actualPlayButton").style.opacity = 0;
      document.getElementById("actualPlayButton").parentNode.removeChild(document.getElementById("actualPlayButton"));
      drawHexagons();
      document.getElementById("BackButton").style.width = "20vh";
      document.getElementById("ReplayButton").style.width = "20vh";
      updateScoreboard();
      if(turnTimerBoxChecked){
        document.getElementById("timerContainer").style.display = "block";
        document.getElementById("time").style.display = "block";
      }
      if(chessTimerBoxChecked){
        setChessTimes();
      }
      started = true;
      bgColors = [255, 255, 255];
      bgColorFadeTo(255, 0, 0);
      clearInterval(startingSequence);
      /*if(getTurnMaxTime()){
        setInterval(function(){
          turn++;
        }, getMaxTurnTime() * 1000);
      }*/
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
  var speed = 0.1;
  if(localStorage.mobile == "true"){
    ctx.clearRect(0, 0, s, s);
    for(var i = 0; i < 91; i++){
      ctx.drawImage(hexImgs[hexagons[i][2]], hexagons[i][0][0]-(hexSize*s/13/2), hexagons[i][0][1]-(hexSize*s/13/2), hexSize*s/13, hexSize*s/13);
    }
  } else {
    var shrinkLoop = setInterval(function(){
      ctx.fillStyle = "white";
      ctx.clearRect(0, 0, s, s);
      ctx.drawImage(undoButton, s * (7/8), s * (6/8), hexSize * s / 30, hexSize * s / 30);
      for(var i = 0; i < 91; i++){
        //ctx.rotate(30*Math.PI/180);
        ctx.drawImage(hexImgs[hexagons[i][2]], hexagons[i][0][0]-(shrinkSize*hexSize*s/13/2), hexagons[i][0][1]-(hexSize*s/13/2), shrinkSize*hexSize*s/13, hexSize*s/13);
        //ctx.rotate(-30*Math.PI/180);
      }
      shrinkSize += speed;
      if(shrinkSize > 1.05){
        clearInterval(shrinkLoop);
      }
    }, 1000/30);
  }
}

function flip(hex, nState){
  hexagons[hex][2] = nState;
  if(flipping){
    setTimeout(function(){flip(hex, nState)}, 500);
  } else {
    if(localStorage.mobile == "false") flipping = true;
    var shrinkSize = 1;
    var speed = -0.2;
    if(localStorage.mobile == "true"){
      drawHexagons();
      flipping = false;
    } else {
      var shrinkLoop = setInterval(function(){
        ctx.fillStyle = "white";
        ctx.clearRect(0, 0, s, s);
        ctx.drawImage(undoButton, s * (7/8), s * (6/8), hexSize * s / 30, hexSize * s / 30);
        for(var i = 0; i < 91; i++){
          //ctx.rotate(30*Math.PI/180);
          if(i != hex) ctx.drawImage(hexImgs[hexagons[i][4]], hexagons[i][0][0]-(hexSize*s/13/2), hexagons[i][0][1]-(hexSize*s/13/2), hexSize*s/13, hexSize*s/13);
          //ctx.rotate(-30*Math.PI/180);
        }
        ctx.drawImage(hexImgs[hexagons[hex][4]], hexagons[hex][0][0]-(shrinkSize*hexSize*s/13/2), hexagons[hex][0][1]-(hexSize*s/13/2), shrinkSize*hexSize*s/13, hexSize*s/13);
        if(shrinkSize <= 0){
          speed = 0.2;
          hexagons[hex][4] = nState;
        }
        shrinkSize += speed;
        if(shrinkSize > 1){
          flipping = false;
          clearInterval(shrinkLoop);
        }
      }, 1000/30);
    }
  }
}

function bgColorFadeTo(r, g, b){
  clearInterval(colorLoop);
  var dif = 0;
  if(Math.abs(r - bgColors[0]) > dif){
    dif = Math.abs(r - bgColors[0]);
  }
  if(Math.abs(g - bgColors[1]) > dif){
    dif = Math.abs(g - bgColors[1]);
  }
  if(Math.abs(b - bgColors[2]) > dif){
    dif = Math.abs(b - bgColors[2]);
  }
  var speed = dif / 10;

  colorLoop = setInterval(function(){
    if(bgColors[0] > r){
      bgColors[0] -= speed;
    }
    if(bgColors[0] < r){
      bgColors[0] += speed;
    }
    if(bgColors[1] > g){
      bgColors[1] -= speed;
    }
    if(bgColors[1] < g){
      bgColors[1] += speed;
    }
    if(bgColors[2] > b){
      bgColors[2] -= speed;
    }
    if(bgColors[2] < b){
      bgColors[2] += speed;
    }
    body.style.backgroundColor = "rgba(" + bgColors[0] + ", " + bgColors[1] + ", " + bgColors[2] + ", 0.3)";
    if(bgColors[0] == r && bgColors[1] == g && bgColors[2] == b){
      clearInterval(colorLoop);
    }
  }, 1000/60);
}

function undo(){
  if(turnNumber > 0){
    turnNumber--;
    turn--;
    if(turn < 0) turn = players - 1;
    switch(turn){
      case 0:
        bgColorFadeTo(255, 0, 0);
        break;
      case 1:
        bgColorFadeTo(0, 150, 255);
        break;
      case 2:
        bgColorFadeTo(255, 255, 0);
        break;
      case 3:
        bgColorFadeTo(0, 255, 0);
        break;
      case 4:
        bgColorFadeTo(255, 0, 255);
        break;
      case 5:
        bgColorFadeTo(0, 255, 255);
        break;
    }
    for(var i = 0; i < 91; i++){
      hexagons[i][2] = oldMoves[turnNumber][i];
    }
    if(turnNumber == 0) makeHexagons();
    flipAllHexagons();
    startTimerThingy();
  }
}

function flipAllHexagons(){
  var shrinkSize = 1;
  var speed = -0.1;
  if(localStorage.mobile == "true"){
    drawHexagons();
  } else {
    var shrinkLoop = setInterval(function(){
      ctx.fillStyle = "white";
      ctx.clearRect(0, 0, s, s);
      ctx.drawImage(undoButton, s * (7/8), s * (6/8), hexSize * s / 30, hexSize * s / 30);
      for(var i = 0; i < 91; i++){
        //ctx.rotate(30*Math.PI/180);
        ctx.drawImage(hexImgs[hexagons[i][4]], hexagons[i][0][0]-(shrinkSize*hexSize*s/13/2), hexagons[i][0][1]-(hexSize*s/13/2), shrinkSize*hexSize*s/13, hexSize*s/13);
        //ctx.rotate(-30*Math.PI/180);
      }
      shrinkSize += speed;
      if(shrinkSize < 0){
        speed = 0.1;
        for(var i = 0; i < 91; i++){
          hexagons[i][4] = oldMoves[turnNumber][i];
        }
      }
      if(shrinkSize > 1){
        clearInterval(shrinkLoop);
      }
    }, 1000/60);
  }
}

function getScore(){
  var score = [0, 0, 0, 0, 0, 0, 0];
  for(var i = 0; i < hexagons.length; i++){
    switch(hexagons[i][2]){
      case 1:
        score[0]++;
        break;
      case 2:
        score[1]++;
        break;
      case 4:
        score[2]++;
        break;
      case 5:
        score[3]++;
        break;
      case 6:
        score[4]++;
        break;
      case 7:
        score[5]++;
        break;
      case 0:
        score[6]++;
        break;
    }
  }
  return score;
}

function replay(){
  /*var replayer = setInterval(function(){
    undo();
    if(turnNumber == 0){
      clearInterval(replayer);
    }
  }, 500);*/
  for(var i = 0; i < 91; i++){
    hexagons[i] = [[0, 0], [0, 0], 0, [-1, -1, -1, -1, -1, -1], 0];
  }
  makeHexagons();
  //Input
  hexagons[60][2] = 3;
  hexagons[57][2] = 3;
  hexagons[24][2] = 3;
  hexagons[27][2] = 3;
  hexagons[30][2] = 3;
  hexagons[63][2] = 3;
  hexagons[84][2] = 3;
  hexagons[60][4] = 3;
  hexagons[57][4] = 3;
  hexagons[24][4] = 3;
  hexagons[27][4] = 3;
  hexagons[30][4] = 3;
  hexagons[63][4] = 3;
  hexagons[84][4] = 3;

  turn = 0;

  turnNumber = 0;

  oldMoves = [];

  setChessTimes();

  startTimerThingy();
  winner = "yee";

  bgColorFadeTo(255, 0, 0);

  flipAllHexagons();
  updateScoreboard();

  document.getElementById("winScreen").style.display = "none";
}

function updateScoreboard(){
  document.getElementById("scoreboard").hidden = false;
  var scoreboard = document.getElementsByClassName("score");
  document.getElementById("score6").hidden = false;
  console.log(scoreboard);
  for(var i = 0; i < 7; i++){
    scoreboard[i].innerHTML = getScore()[i];
    if(i >= players && i != 6){
      document.getElementById("score" + i).hidden = true;
    } else document.getElementById("score" + i).hidden = false;
  }
}

function openOptions(){
  if(document.getElementById('optionsScreen').style.display == 'block'){
    document.getElementById('optionsScreen').style.display = 'none';
    optionsOpen = false;
  } else {
    document.getElementById('optionsScreen').style.display = 'block';
    optionsOpen = true;
  }
}

var turnTimerBoxChecked = false;

var chessTimerBoxChecked = false;

var chessTimes = [0, 0, 0, 0, 0, 0];

function turnTimerBox(){
  console.log("yeeee");
  document.getElementById("chessTimerCheckBox").checked = false;
  turnTimerBoxChecked = !turnTimerBoxChecked;
  if(turnTimerBoxChecked){
    document.getElementById("turnTimerBox").style.display = "block";
    document.getElementById("turnTimerBox").display = "block";
  } else {
    document.getElementById("turnTimerBox").style.display = "none";
    document.getElementById("turnTimerBox").display = "none";
  }
  chessTimerBoxChecked = false;

  document.getElementById("chessTimerBox").style.display = "none";
  document.getElementById("chessTimerBox").display = "none";
}

function getTurnMaxTime(){
  if(document.getElementById("actualTurnTimerBox").value > 60){
    document.getElementById("actualTurnTimerBox").value = 60
  }
  if(turnTimerBoxChecked) return 1 * document.getElementById("actualTurnTimerBox").value;
  return false;
}

function setChessTimes(){
  for(var i = 0; i < chessTimes.length; i++){
    chessTimes[i] = Math.floor(document.getElementById("actualChessTimerBox").value * 60 + 0.5);
  }
}

function chessTimerBox(){
  document.getElementById("turnTimerCheckBox").checked = false;
  console.log("yeeee");
  chessTimerBoxChecked = !chessTimerBoxChecked;
  if(chessTimerBoxChecked){
    document.getElementById("chessTimerBox").style.display = "block";
    document.getElementById("chessTimerBox").display = "block";
  } else {
    document.getElementById("chessTimerBox").style.display = "none";
    document.getElementById("chessTimerBox").display = "none";
  }

  turnTimerBoxChecked = false;

  document.getElementById("turnTimerBox").style.display = "none";
  document.getElementById("turnTimerBox").display = "none";
}

function startTimerThingy(){
  time = 0;
  if(document.getElementById("time").innerHTML = getTurnMaxTime() - time < 10){
    document.getElementById("time").innerHTML = getTurnMaxTime() - time + "&nbsp;&nbsp;";
  } else document.getElementById("time").innerHTML = getTurnMaxTime() - time;
  clearInterval(makeTimerHappen);
  makeTimerHappen = setInterval(function(){
    time++;
    console.log(time);
    if(turnTimerBoxChecked) {
      if(document.getElementById("time").innerHTML = getTurnMaxTime() - time < 10){
        document.getElementById("time").innerHTML = getTurnMaxTime() - time + "&nbsp;&nbsp;";
      } else document.getElementById("time").innerHTML = getTurnMaxTime() - time;
    }
    if(time >= getTurnMaxTime() && getTurnMaxTime() != 0){
      time = 0;
      if(document.getElementById("time").innerHTML = getTurnMaxTime() - time < 10){
        document.getElementById("time").innerHTML = getTurnMaxTime() - time + "&nbsp;&nbsp;";
      } else document.getElementById("time").innerHTML = getTurnMaxTime() - time;
      turn++;
      if(turn >= players) turn = 0;
      switch(turn){
        case 0:
          bgColorFadeTo(255, 0, 0);
          break;
        case 1:
          bgColorFadeTo(0, 150, 255);
          break;
        case 2:
          bgColorFadeTo(255, 255, 0);
          break;
        case 3:
          bgColorFadeTo(0, 255, 0);
          break;
        case 4:
          bgColorFadeTo(255, 0, 255);
          break;
        case 5:
          bgColorFadeTo(0, 255, 255);
          break;
      }
    } else if(chessTimerBoxChecked){
      if(chessTimes[turn] > 0){
        chessTimes[turn]--;
      }
      if(chessTimes[turn] <= 0){
        chessTimes[turn] = "0:00";
        if(getPlayersLeft() == 1){
          for(var i = 0; i < players; i++){
            if(chessTimes[i] > 0){
              winner = i;
            }
          }
          switch(winner){
            case 0:
              winner = "Red";
              break;
            case 1:
              winner = "Blue";
              break;
            case 2:
              winner = "Yellow"
              break;
            case 3:
              winner = "Green";
              break;
            case 4:
              winner = "Purple";
              break;
            case 5:
              winner = "Cyan";
              break;
          }
          console.log(winner + " Wins!");
          document.getElementById("winScreen").style.display = "flex";
          document.getElementById("winScreen").innerHTML = "<span id='winText'>" + winner + " Wins!</span>";
          return "Yeet";
        }
        while(!(chessTimes[turn + 1] > 0)){
          turn++;
          if(turn >= players){
            turn = 0;
          }
        }
        switchTurn();
      }
      for(var i = 0; i < players; i++){
        document.getElementsByClassName("chessTime")[i].innerHTML = secondsToMinuteText(chessTimes[i]);
      }
    }
  }, 1000);
}
function secondsToMinuteText(n){
  if(!(n > 0)){
    return "0:00";
  }
  var s = "";
  s += Math.floor(n / 60);
  s += ":";
  if(n % 60 < 10){
    s += "0";
  }
  s += (n % 60);
  return s;
}

function switchTurn(){
  turn++;
  if(turn >= players) turn = 0;
  switch(turn){
    case 0:
      bgColorFadeTo(255, 0, 0);
      break;
    case 1:
      bgColorFadeTo(0, 150, 255);
      break;
    case 2:
      bgColorFadeTo(255, 255, 0);
      break;
    case 3:
      bgColorFadeTo(0, 255, 0);
      break;
    case 4:
      bgColorFadeTo(255, 0, 255);
      break;
    case 5:
      bgColorFadeTo(0, 255, 255);
      break;
  }
}

function getPlayersLeft(){
  var numLeft = players;
  for(var i = 0; i < players; i++){
    if(!(chessTimes[i] > 0)){
      numLeft--;
    }
  }
  return numLeft;
}