var dog, happyDog, dogimage;
var database;
var foodS = 20;
var foodStock;

function preload()
{
  //load images here
  dogimage = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  dog = createSprite(250,300,100,100);
  dog.scale = 0.25;
  dog.addImage(dogimage);
}

function readStock(data){
 foodS = data.val();
}

function writeStocks(x){
  if(x <= 0){
    x = 0;
  }

  else{
    x = x - 1
  }

  database.ref('/').update({Food: x})
}
var pasttime;
var delay = 15;
var state = "sit";

function draw() {  
  if(frameCount -pasttime == delay){
    dog.addImage(dogimage)
  state = "sit"}
  
  background(87, 179, 97)
  drawSprites();
  textSize(15)
  fill("white")
  textAlign(CENTER);
  text("Press Up arrow to feed the dog milk", 250, 60);
  textSize(30);
  text("Food remaining: " + foodS, 250, 200);
  
  if(keyWentDown(UP_ARROW) && state === "sit"){
    writeStocks(foodS);
    dog.addImage(happyDog)
    pasttime =frameCount
    state = "eat"
  }
  if(keyWentDown("R")){
   
    writeStocks(21);
    
  }
  //add styles here

}



