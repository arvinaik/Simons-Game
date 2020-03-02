function RNG() {
  var BlkNo = Math.floor(Math.random() * 4)
  return BlkNo
};

function RandomBlock() {

  var BlkNo = RNG();
  switch (BlkNo) {
    case 0:
      var BlkCol = "green";
      break;
    case 1:
      var BlkCol = "red";

      break;
    case 2:
      var BlkCol = "yellow";

      break;
    case 3:
      var BlkCol = "blue";

      break;

    default:
      break;

  }
  return BlkCol
};

function animateBlock(color) {

  switch (color) {
    case "green":
      $("#green").addClass("pressed");
      var greensound = new Audio("sounds/green.mp3");
      greensound.play();
      setTimeout(function f1() {
        $("#green").removeClass("pressed")
      }, 300);
      break;
    case "red":
      $("#red").addClass("pressed");
      var redsound = new Audio("sounds/red.mp3");
      redsound.play();
      setTimeout(function f2() {
        $("#red").removeClass("pressed")
      }, 300);
      break;
    case "yellow":
      $("#yellow").addClass("pressed");
      var yellowsound = new Audio("sounds/yellow.mp3");
      yellowsound.play();
      setTimeout(function f3() {
        $("#yellow").removeClass("pressed")
      }, 300);
      break;
    case "blue":
      $("#blue").addClass("pressed");
      var bluesound = new Audio("sounds/blue.mp3");
      bluesound.play();
      setTimeout(function f4() {
        $("#blue").removeClass("pressed")
      }, 300);
      break;
    default:
      break;

  }
};

function GameOver() {
  started = false;
  var failureSound = new Audio("sounds/wrong.mp3");
  failureSound.play();
  $("body").addClass("game-over");
  setTimeout(function removeGameOver() {
    $("body").removeClass("game-over");
  }, 300)
  $("#level-title").text("Restart by pressing any key")
  $(document).keypress(StartGame)
  $(document).click(StartGame)
};

CorrectBlocks = [];
BlocksChosen = [];
var started = false
var level = 0;


$(document).on("keypress", StartGame);
$(document).on("click", StartGame);
function StartGame() {

  if (started === false) {
    level = 0;
    CorrectBlocks = [];
    started = true;



  } else {
    return;
  }
  LevelUp();
};



function LevelUp() {
  BlocksChosen = [];
  level += 1;
  $("#level-title").text("Level " + level);
  CorrectBlocks.push(RandomBlock());
  setTimeout(animateBlock, 500, CorrectBlocks[level - 1]);
};




$(".btn").click(RecordAnswer);


function RecordAnswer() {
  var BlockPick = this.getAttribute("id");
  animateBlock(BlockPick);
  BlocksChosen.push(BlockPick);
  CheckAnswer();
};

function CheckAnswer() {
  for (var i = 0; i < BlocksChosen.length; i++) {
    if (BlocksChosen[i] == CorrectBlocks[i]) {

    } else {
      GameOver();
      return;
    }
  }
  if (BlocksChosen.length == level) {
    setTimeout(LevelUp, 500);
  }
};

/*  for (var i = 0; i < level; i++) {
  if (BlocksChosen[i] == CorrectBlocks[i]) {

  } else {
    GameOver();
    return;
  }
}
if (BlocksChosen.length == level) {
  LevelUp();
}
THE ONLY DIFFERENCE BETWEEN THIS CODE AND OUR CHECK ANSWER FUNCTION IS WHETHER WE DEFINE I BY LEVEL OR BY THE LENGTH OF THE BLOCKS CHOSEN LIST
HOWEVER THIS DIFFERENCE MAKES A DIFFERENCE WHEN LEVEL > 1
THIS IS BECAUSE WHEN LEVEL IS 2, WHEN WE CLICK ANY BOX, THE WHOLE FUNCTION WILL RUN.
LETS TAKE IT FOR LEVEL 2, THE PROPER ORDER IS RED AND YELLOW
AFTER LEVELLING UP FROM 1 TO 2, WE WIPED THE BLOCKS CHOSEN BOX AND IT IS JUST []
THUS WHEN WE CLICK ANY BUTTON AND THE WHOLE FUNCTION RUNS, BASED ON THE FOR LOOP, IT CHECKS THE 2 LISTS AGAINST EACH OTHER BASED ON THE Level
THIS MEANS WHEN WE HAVE CLICKED ANY ONE BOX, LETS SAY RED WHICH IS THE PROPER COLOR, OUR BLOCKS CHOSEN LOOKS LIKE ["RED"]
HOWEVER BECAUSE WE HAVE DEFINED THE FOR LOOP BY THE LEVEL, WHEN WE CLICK THIS ONE BUTTON, IT WILL CHECK BLOCKSCHOSEN[0], WHICH MATCHES CORRECTBLOCKS[0]
HOWEVER IMMEDIATELY AFTER WITHIN THE SAME CLICK IT WILL CHECK BLOCKSCHOSEN[1] AGAINST CORRECTBLOCKS[1] = yellow
HOWEVER AS BLOCKSCHOSEN[1] DOES NOT EXIST YET, THIS CAUSES BLOCKSCHOSEN[1] = NIL != CORRECTBLOCKS[1], GIVING US A GameOver

ON THE OTHER HAND, BY USING A FOR LOOP BASED ON THE LENGTH OF BLOCKSCHOSEN, WHEN WE HAVE CLICKED ONE BUTTON, IT ONLY CHECKS BLOCKSCHOSEN[0]
*/
