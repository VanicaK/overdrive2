var score = 0;
var gun, bluebubble, redbubble, bullet, backBoard;

var gunImg, bubbleImg, bulletImg, blastImg, backBoardImg;

var redBubbleGroup, blueBubbleGroup, bulletGroup;
var magSize = 10;
var reloading=false;

var life = 3;
var score = 0;
var gameState = 1
var cooldown=0;
var burst,burstImg;
var blast
function preload() {
  gunImg = loadImage("josephTommyGun.png")
  blastImg = loadImage("blast.png")
  burstImg=loadImage("boom.png");



  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg = loadImage("back.jpg")
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  backBoard = createSprite(50, height / 2, 50, height);
  backBoard.addImage(backBoardImg)

  gun = createSprite(100, height / 2, 50, 50);
  gun.addImage(gunImg)
  gun.scale = 0.2

  bulletGroup = createGroup();
  blueBubbleGroup = createGroup();
  redBubbleGroup = createGroup();

  heading = createElement("h1");
  scoreboard = createElement("h1");
  title = createElement("h1");
  xed = createElement("h2");
  mag = createElement("h2");
  tip=createElement("h3");
}

function draw() {
  background("#BDA297");

  heading.html("Life: " + life)
  heading.style('color:red');
  heading.position(150, 20)

  mag.html("Bullets Loaded:" + magSize+"/10");
  mag.style('color:red');
  mag.position(150, 50)

  tip.html("hold "+"R"+" to reload");
  tip.style('color:red');
  tip.position(150,70);

  xed.html("Xedbubble's");
  xed.style('color:green');
  xed.position(width / 2 - 25, 7.5)

  title.html("Tommy Gun Overdrive!")
  title.style('color:green');
  title.position(width / 2 - 150, 20);

  scoreboard.html("Score: " + score)
  scoreboard.style('color:red');
  scoreboard.position(width - 200, 20)

  if (gameState === 1) {
    gun.y = mouseY;
    cooldown-=1;

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if (keyDown("space")) {
      shootBullet();
    }

    if(keyDown("r")){
      if(magSize<10&&frameCount%6.5===0){
        reloading=true;
        magSize+=1;
      }
    }
    if(!keyDown("r")){
      reloading=false;
    }

    if (blueBubbleGroup.collide(backBoard)) {
      handleGameover(blueBubbleGroup);
    }
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }

  
    redBubbleGroup.collide(bulletGroup, handleDestroy);
    blueBubbleGroup.collide(bulletGroup, handleDestroy);


    drawSprites();
  }
  if (gameState == 2) {
    text("skill issue lmao", width / 2, height / 2);
    textSize(20);
  }



}

function drawblueBubble() {
  bluebubble = createSprite(width - 5, random(50, height - 50), 40, 40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8 - 1.5 * (score / 10);
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble() {
  redbubble = createSprite(width - 5, random(50, height - 50), 40, 40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.2;
  redbubble.velocityX = -8 - 1.5 * (score / 10);
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet() {
  if (magSize > 0&&reloading==false) {
    if(cooldown<0){
    bullet = createSprite(150, width / 2, 50, 20)
    bullet.y = gun.y + 15
    bullet.addImage(bulletImg)
    bullet.scale = 0.12
    bullet.velocityX = 7 + 1.5*(score/10);
    bulletGroup.add(bullet);
    magSize -= 1;
    cooldown=2;
    }
  }
}

function handleBubbleCollision(bubbleGroup) {
  if (life > 0) {
    score = score + 1;
  }

  //blast = createSprite(bullet.x + 60, bullet.y, 50, 50);
  //blast.addImage(blastImg)

  //  blast= sprite(bullet.x+60, bullet.y, 50,50);
  // blast.addImage(blastImg)

  //  blast= createSprite(bullet.x+60, bullet.y, 50,50);
  // blast.addImage(blastImg)

  //  blast= createSprite(bullet.x+60, bullet.y, 50,50);
  // image(blastImg)


  //blast.scale = 0.3
  //blast.life = 20
  bulletGroup.destroyEach()
  bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup) {

  life = life - 1;
  bubbleGroup.destroyEach();


  if (life === 0) {
    gameState = 2


  }

}

function handleDestroy(bullet, bubble) {
  bubble.destroy();
  bullet.destroy();
  score = score + 2;
  /*blast = createSprite(bullet.x + 60, bullet.y, 50, 50);
  blast.addImage(blastImg);
  blast.scale = 0.3
  blast.life = 20*/
  explode(bubble.x,bubble.y)
}
function explode(x,y){
  burst=createSprite(x,y,20,20);
  burst.addImage(burstImg);
  burst.scale=0.1
  burst.life=20;
}