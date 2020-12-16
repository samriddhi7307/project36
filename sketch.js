var dog1, dog, happydogimg, database, foodS, foodStock,background;
var feed, addFeed;
var feedTime,lastFeed;
var foodObj;

function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  happydogimg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  dog1 = createSprite(800,220);
  dog1.addImage(dog);
  dog1.scale = 0.15

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background("#2e8a57");
feedTime = database.ref("FeedTime");
feedTime.on("value", function(data){
  lastFeed = data.val();
});

fill(255)
textSize(20);
if(lastFeed >= 12){
  text("Last Feed : "+ lastFeed % 12 + "PM", 350,30);
} 
else if(lastFeed == 0){
text("Last Feed : 12 AM"+350,30);
}
else{
text("Last Feed : "+lastFeed + "AM",350,30);
}

foodObj.display();
drawSprites();
}

function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog1.addImage(happydogimg);
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  Food: foodObj.getFoodStock(),
  feedTime: hour()
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}