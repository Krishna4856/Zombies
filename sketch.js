let PLAY=1;
let END=0;
let gameState=PLAY;
let bg,bgImg;
let player, shooterImg, shooter_shooting;
let exSound,loseSound,winSound;
let zom,zomImg;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  exSound=loadSound("assets/explosion.mp3");
  loseSound=loadSound("assets/lose.mp3");
  winSound=loadSound("assets/win.mp3");
  zomImg=loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(displayWidth,displayHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1300, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


zomGroup=createGroup();   

}

function draw() {
  background(0); 



if(gameState===PLAY){
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-20
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+20
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}
if(zomGroup.isTouching(player)||touches.length>0){
  gameState=END;
  exSound.play();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
swzom();
}
else if(gameState===END){
  zomGroup.destroyEach();
  //loseSound.play();
  zomGroup.setLifetimeEach(-1);
  zomGroup.setVelocityXEach(0);
}
drawSprites();

}
function swzom(){
if(frameCount % 30===0){
  var zom=createSprite(displayWidth-1000,displayHeight-300,20,20);
  zom.velocityX=-10;
  zom.scale=0.2;
  zom.y=Math.round(random(displayWidth-1200,displayHeight-600));
  zom.addImage(zomImg);
  zom.lifetime=500;
  zomGroup.add(zom);
}
}