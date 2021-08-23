//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg, foodObj;
var feeddog, addfood;
var fedTime, lastFed;
var gameState, readState;
var bedroomImg, gardenImg, washroomImg;

function preload() {
    //load images here
    dogImg = loadImage('images/Dog.png');
    happyDogImg = loadImage('images/happydog.png');
    bedroomImg = loadImage('images/Bed Room.png');
    gardenImg = loadImage('images/Garden.png');
    washroomImg = loadImage('images/Wash Room.png');
}

function setup() {
    createCanvas(900, 500);

    database = firebase.database();
    foodStock = database.ref('Food');
    foodStock.on("value", readStock);

    lastFed = database.ref('lastFed');
    lastFed.on("value", function (data) {
        lastFed = data.val();
    });

    dog = createSprite(750, 240, 80, 80);
    dog.addImage(dogImg);
    dog.scale = 0.15;

    // console.log(dog.x, dog.y);

    foodObj = new Food();

    feeddog = createButton('Feed the Dog');
    feeddog.position(width / 2 + 90, 150);
    feeddog.mousePressed(feed);

    addfood = createButton('Add Food');
    addfood.position(width / 2 - 10, 150);
    addfood.mousePressed(addFoods);

    readState = database.ref('gameState');
    readState.on("value", function (data) {
        gameState = data.val();
    });

}


function draw() {
    background(46, 139, 87);
    // background(bedroomImg);

    currentTime = hour();

    if (currentTime == (lastFed + 1)) {
        update("playing");
        foodObj.garden(width / 2, height / 2, width, height);
    }
    else if (currentTime == (lastFed + 2)) {
        update("sleeping");
        foodObj.bedroom(width / 2, height / 2, width, height);
    }
    else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
        update("bathing");
        foodObj.washroom(width / 2, height / 2, width, height);
    }
    else {
        update("hungry");
        foodObj.display();
    }

    drawSprites();

    // textSize(30);
    // fill('white');
    // text('x: ' + mouseX + '   y: ' + mouseY, 20, 50);

    foodObj.display(foodS);
    // console.log(foodObj.x, foodObj.y);

    // console.log(foodS);

    //add styles here

    fill('black');
    textSize(26);
    if (lastFed > 0 || lastFed <= 24) {
        if (lastFed >= 12) {
            text('Last Fed: ' + lastFed % 12 + ' PM', 160, 50);
        }
        else if (lastFed == 0) {
            text('Last Fed: 12 AM', 160, 50);
        }
        else {
            text('Last Feed: ' + lastFed + ' AM', 160, 50);
        }
    }

    fill('aliceblue');
    textSize(20);
    if (foodS >= 0) {
        // text('Food remaining: ' + foodS, 160, 180);
    }

    if (gameState != "hungry") {
        feeddog.hide();
        addfood.hide();
        dog.remove();
    }
    else {
        feeddog.show();
        addfood.show();
        dog.addImage(dogImg);
    }
    // console.log(gameState);

}

function update(state) {
    database.ref('/').update({
        gameState: state
    })
}

function feed() {
    dog.addImage(happyDogImg);
    dog.x = foodObj.x;
    dog.y = foodObj.y;
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1)

    database.ref('/').update({
        lastFed: hour()
    })
    if (foodS > 0) {
        database.ref('/').update({
            // Food: foodObj.getFoodStock()
            Food: foodS - 1
        })
    }
}

function addFoods() {
    dog.x = 440;
    dog.y = 250;
    foodS++;
    database.ref('/').update({
        Food: foodS
    })
}

function readStock(data) {
    foodS = data.val();
}

function writeStock(x) {
    if (x <= 0) {
        x = 0;
    }
    else {
        x -= 1;
    }
    database.ref('/').update({
        Food: x
    })
}