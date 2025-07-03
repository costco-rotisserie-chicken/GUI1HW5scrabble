/*
Hector Vazquez
Hector_Vazuez@student.uml.edu
GUI 1, Summer 1 2025
Homework 5
index.js
*/

function drawTiles(bag, num){ //draw a hand - removes from bag
    const hand = [];
    for(let i = 0; i < num && bag.length > 0; i++){ //loop num times or until bag is empty
        const draw = Math.floor(Math.random() * bag.length); //choose a random bag position
        hand.push(bag.splice(draw, 1)[0]); //take it out of the bag list and put it into the hand
    }
    
    hand.forEach(tile => { //create a tile with correct image and properties
        const newTile = document.createElement("img");
        newTile.id = tile.letter;
        newTile.classList.add("tile");
        newTile.setAttribute("src", "graphics_data/Scrabble_Tiles/Scrabble_Tile_"+tile.letter+".jpg");
        newTile.setAttribute("alt", tile.letter);
        newTile.setAttribute("data-value", tile.value);
        $("#rack").append(newTile); //add it to the rack

        $("#rack").children().draggable({ //make the tiles in the rack draggable
            revert: "invalid",
            zIndex: 100
        });
    }
    );
}

function updateWordScore(){ //updates the current word score
    let totalScore = 0; 
    let scoreMult = 1;

    $(".filled").each( function() { //checks each filled tile
        let letterValue = parseInt($(this).find('img:nth-child(1)').attr("data-value")); //find the tile img and get the value attr
        const position = parseInt($(this).attr("id").replace("space", "")); //get the position of the tile
        if(position == 3 || position == 13) { //checking for double word score spaces
            scoreMult *= 2;
        }
        if(position == 7 || position == 9) { //checking for double letter score
            letterValue *= 2;
        }
        totalScore += letterValue; //add letter score to word score
    });

    $("#livescore").text("Current Word Score: " + totalScore * scoreMult); //update word score, also taking into account double word spaces
}

$( function() {
    const pieces = [ //Very similar to Ramon Meza, I saw this and found it simple and more useful than trying to reinvent the wheel.
        {"letter":"A", "value":1, "amount":9},
        {"letter":"B", "value":3, "amount":2},
	    {"letter":"C", "value":3, "amount":2},
	    {"letter":"D", "value":2, "amount":4},
	    {"letter":"E", "value":1, "amount":12},
	    {"letter":"F", "value":4, "amount":2},
	    {"letter":"G", "value":2, "amount":3},
	    {"letter":"H", "value":4, "amount":2},
	    {"letter":"I", "value":1, "amount":9},
	    {"letter":"J", "value":8, "amount":1},
	    {"letter":"K", "value":5, "amount":1},
	    {"letter":"L", "value":1, "amount":4},
	    {"letter":"M", "value":3, "amount":2},
	    {"letter":"N", "value":1, "amount":5},
	    {"letter":"O", "value":1, "amount":8},
	    {"letter":"P", "value":3, "amount":2},
	    {"letter":"Q", "value":10, "amount":1},
	    {"letter":"R", "value":1, "amount":6},
	    {"letter":"S", "value":1, "amount":4},
	    {"letter":"T", "value":1, "amount":6},
	    {"letter":"U", "value":1, "amount":4},
	    {"letter":"V", "value":4, "amount":2},
	    {"letter":"W", "value":4, "amount":2},
	    {"letter":"X", "value":8, "amount":1},
	    {"letter":"Y", "value":4, "amount":2},
	    {"letter":"Z", "value":10, "amount":1}
    ];

    let bag = []; //creating a tile bag to draw from - "unfurling" the base table
    pieces.forEach(tile => { //take each tile
        for (let i = 0; i < tile.amount; i++) { //and add amount of them
            bag.push({letter: tile.letter, value: tile.value}); //with the related letter and value
        }
    });

    drawTiles(bag, 7); //initial draw to rack

    let currentScore = 0; //initial score

    
    
    $(".tile").draggable({ //make tiles draggable but return if the place doesn't accept tiles
        revert: "invalid",
        zIndex: 100
    });

    let firstTile = true; //first tile on board can go anywhere - using different logic to handle first and the rest of the tiles
    $(".board_space").droppable( { //on drop
        accept: ".tile",
        drop :function(event, ui) {
            
            $(this).append(ui.helper); //attach the tile to the space
            ui.helper.css({ //make it look a little nicer
                top: "0px",
                left: "0px",
                position: "relative"
            });
            ui.helper.draggable("disable"); //disable tile from being dragged again

            if(firstTile){ //first tile logic
                $(".board_space").droppable("disable"); //disable entire board - only specific spaces want to be playable

                let index = parseInt($(this).attr("id").replace("space", "")); //.find what space tile is on
                let left = -1;
                let right = -1;
                if (index > 1){         //check to see if left and right spaces exist
                    left = index - 1;
                }
                if (index < 15){
                    right = index + 1;
                }
                if(left != -1) {        //if left and right spaces exist, give them the dropzone class and make them droppable
                    $("#space"+left).addClass("dropzone");
                    $("#space"+left).droppable("enable");
                }
                if(right != -1){
                    $("#space"+right).addClass("dropzone");
                    $("#space"+right).droppable("enable");
                }
                $(this).addClass("filled"); //give the current tile the filled class
                firstTile = false; //no longer the first tile, next drop should follow alternate logic
            }

            else { //alternate logic
                let index = parseInt($(this).attr("id").replace("space", "")); //get board space
                let left = -1;
                let right = -1;
                if (index > 1){
                    left = index - 1;
                }
                if (index < 15){
                    right = index + 1;
                }                               //if left and right exist and are not filled, make them droppable
                if(left != -1 && !$("#space"+left).hasClass("filled")) {
                    $("#space"+left).addClass("dropzone");
                    $("#space"+left).droppable("enable");
                }
                if(right != -1 && !$("#space"+right).hasClass("filled")){
                    $("#space"+right).addClass("dropzone");
                    $("#space"+right).droppable("enable");
                }
                $(this).droppable("disable"); //current tile is no longer droppable, remove dropzone and mark it as filled
                $(this).removeClass("dropzone");
                $(this).addClass("filled");
            }
            updateWordScore(); //always update score after drop
        }
    } );


    $("#rack").droppable( { //rack logic, appends tile to rack when dropped on the rack
        accept: ".tile",
        drop :function(event, ui) {
            $(this).append(ui.helper);
            ui.helper.css({
                top: "0px",
                left: "0px",
                position: "relative"
            });
        }
    } );

    $("#submitWord").on("click", function() { //Submits current word and adds it to the total score
        firstTile = true; //next tile dropped will function as a first tile
        let wordScore = parseInt($("#livescore").text().replace("Current Word Score: ", "")); //Can easily cheat by editing score text directly but w/e
        $(".filled").html(""); //empty any filled spaces
        $("#livescore").text("Current Word Score: 0"); //reset current word score
        $(".board_space").droppable("enable");      //enable droppable for entire board, remove filled and dropzone designations
        $(".board_space").removeClass("dropzone");
        $(".board_space").removeClass("filled");
        currentScore += wordScore;

        $("#totalscore").text("Total: " + currentScore); //update total score

    });

    $("#reset").on("click", function() { //reloads the page to reset the game - simple but effective
        location.reload();
    });

    $("#drawNew").on("click", function() { //draws new tiles up to 7
        const rackLength = $("#rack").children().length; //check how many tiles in rack
        drawTiles(bag, 7 - rackLength); //draw up to 7
    });
} );

