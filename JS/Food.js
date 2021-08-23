class Food {
    constructor() {
        var foodStock, lastFed;
        this.bottle = loadImage('images/milk.png');
    }

    display(food) {
        var x = 40, y = 160;
        this.foodStock = food;
        // console.log(this.foodStock);

        imageMode(CENTER);
        image(this.bottle, 950, 220, 70, 70);

        if (this.foodStock != 0) {
            // console.log(this.foodStock);
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 == 0) {
                    x = 40;
                    y += 50;
                }
                image(this.bottle, x, y, 50, 50);
                x += 30;
                // console.log(x, y);
                this.x = x;
                this.y = y;
            }
        }

    }

    getFoodStock() {

    }

    updateFoodStock() {

    }

    deductFood() {

    }

    bedroom(x, y, w, h) {
        imageMode(CENTER)
        image(bedroomImg, x, y, w, h);
    }

    garden(x, y, w, h) {
        imageMode(CENTER)
        image(gardenImg, x, y, w, h);
    }

    washroom(x, y, w, h) {
        imageMode(CENTER)
        image(washroomImg, x, y, w, h);
    }
}
