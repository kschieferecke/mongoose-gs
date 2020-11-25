//const is just another let 
//we declare a constant variable called mongoose
//we set it equal to the return value of require('mongoose'); 
const mongoose = require('mongoose'); 

//access the connect method of the mongoose object
//pass in the localhost test database
//and some options inside of another object
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

//make another constant variable called db
//and we set it equal to the connection property of our mongoose object 
const db = mongoose.connection;

//but then we acces the on and once methods of our connection property from our mongoose object
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    //your tutorial and new code go here. 
    console.log("We're connected");

    /* schema  this is the schema for ingredients. it will be a schema inside a schema! 
    it takes three variables. and is declared using "const". 
    you declare const, then add "ingredientSchema". */
    const ingredientSchema = new mongoose.Schema({
        /* the variables have different data types
        this means that the first two variables declared will
        take only "string" inputs, and the third variable
        will take only inputs that are numbers. */
        name : String,
        measurement: String, 
        amount : Number 
    });
            /* create model from schema */
        const Ingredient = mongoose.model("ingredient", ingredientSchema);

    /*  this schema is the main schema we will be using for this assignment. just like the 
    ingredientSchema we declared, this schema is set up similarly. with, the ingredientSchema
    being called into "ingredients".  */
    const recipeSchema = new mongoose.Schema({
        name : String, 
        description: String,
        instructions: String,
        ingredients : [ingredientSchema] /* a schema inside a schema */
    }); 


    /* model */ 
    const Recipe = mongoose.model('recipe', recipeSchema); 

    /* documents or recipies! 
    here we are declaring/naming a new variable/object, which will be declared as a schema down some lines of code
    you will notice that the first part of the stoneSoupObj has the schema qualities, like name description and 
    instructions. the Ingredients portion of the object separates ingredients by curly brackets{} and you can use as 
    many ingredients as you want, separated by a comma. */ 
    let stoneSoupObj = {
        name : "Stone Soup", 
        description: "A soup made by tricked villagers",
        instructions: "Trick each villager into donating for the soup for everyone",
        ingredients : [ 
            { name : "Carrots",
            measurement: "Cups", 
            amount : 5 },
            
            { name : "Onions",
            measurement: "Cups", 
            amount : 5.5 },

            { name : "Whatever is on hand",
            measurement: "Cups", 
            amount : 5 
            }
        ]
    };
/* we are now declaring that "stoneSoupObj" will now hensforth be known as   */
    let stoneSoup = new Recipe(stoneSoupObj);


/* just like on the previous recipe, we are creating an addition to the document.
    this on is for a peanut butter pie.  */
    let pbPieObj = {
        name : "Peanut Butter Pie",
        description : "A super easy dessert",
        instructions : "whip together peanut butter, cool whip, cream cheese, and powdered sugar. put in a graham cracker crust, put in fridge to set.",
        ingredients : [
            {
                name : "peanut butter", 
                measurement : "the whole container, 16 oz",
                amount : 1
            },
            {
                name : "cool whip", 
                measurement : "the whole container, 8 oz",
                amount : 1
            },
            {
                name : "cream cheese", 
                measurement : "the whole container, 8 oz",
                amount : 1
            },
            {
                name : "powdered sugar", 
                measurement : "cups",
                amount : 2
            },
        ]
    };

    let peanutButterPie = new Recipe( pbPieObj);

    let creamCheeseFrostingObj = {
        name : "Cream Cheese Frosting",
        description : "the only frosting that matters",
        instructions : "whip together mix together ingredients, put on cake, brownies, or enjoy with some pretzels!",
        ingredients : [
            {
                name : "cream cheese", 
                measurement : "the whole container, 8 oz",
                amount : 1
            },
            {
                name : "powdered sugar", 
                measurement : "cups",
                amount : 2
            },
        ]
    };

    let creamCheeseFrosting = new Recipe (creamCheeseFrostingObj);

    // /* how to save a document after it's been created/updated */ 
    // fluffy.save(function(err, fluffy){
    //     if(err) return console.error(err); 
    //     fluffy.speak(); 
    // });

    // silence.save(function(err,cat){
    //     if(err) return console.error(err);
    //     cat.speak(); 
    // })
    
    // /*find is a method attached directly to our Kitten model/class */ 
    // Kitten.find(function(err, kittens){
    //     if(err) return console.error(err);
    //     console.log(kittens); 
    // })

    // /* mongoose supports mongodb's rich query language */ 
    // Kitten.find({ name: /^fluff/ }, function(err,cat){
    //     //check for errors
    //     //print to console. 
    // })


    /* write one of each CRUD operation on your database */

    /* this is the find method. this is 
    considered a "READ" in the CRUD operations.
     it should print out all of the recipes */

     Recipe.find({})
        .then(recipe => {
            console.log(recipe);
        })
        .catch(err => {
            console.log("error!!", err);
        });

        /*NOTE: THIS DOES NOT WORK THE WAY I WANT IT TO.
        it only logs the second recipe, peanut butter pie. 
        i was wanting to log the entirety of the recipe cannon */
    
    /* for my next trick, i will be attempting to write an 
    UPDATE operation. because i can only access the peanut butter pie
    object, i will be using that exclusively.  */
    
    db.Recipe.update (
        { name : "Peanut Butter Pie"},
        { name : "Easy Peanut Butter Pie!"}
    );


    /* i'm honestly not even sure this works. I believe it works.
    this is the CREATE function which will insert this into the database.  */
    Recipe.create({
        name: 'onion',
        description: 'the miracle vegetalbe ',
        instructions: 'slice onions how you desire, toss with ingredients, air fry at 350 for 20-30 minuites',
        ingredients: [
            {name: 'onions', measure: 'cup', amount: 2},
            {name: 'olive oil', measure: 'tablespoon', amount: 2},
            {name: 'salt', measure: 'teaspoon', amount: 1}
        ]
    }, function(err, onions){
        if (err) return console.error(err);
        console.log('onions!');
    });

    /* finally, i will be constructing the DELETE operation, which will delete 
    whatever i so choose from the database i created mwahahha */

    Recipe
        .findOneAndRemove ({
            name: "Cream Cheese Frosting"
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.error(err)
        })
    
});

/* 
NOTE:  the code you need to run this is 
node noSQLRecipe.js 
at current moment i am broken. i have many mistakes that need to be fixed. 
hopefully i can be fixed in the most logical way. 
*/