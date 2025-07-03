Hector Vazquez
Hector_Vazuez@student.uml.edu
GUI 1, Summer 1 2025
Homework 5
One-Line Scrabble

For this assignment, we had to create a dynamic web page on which we can play a solo version of scrabble with one line of the board. The following features were able to be implemented:

-The player has a "hand" of tiles, selected from the proper distribution of letters
-The player has a rack where these tiles return to if dropped at an invalid location
-The tiles can be dropped onto the board, where they can no longer be moved
-The board will update to only allow dropping on spaces adjacent to tiles after the first tile drop
-The game will keep live track of the word score, taking bonus point spaces into consideration
-The player can draw new tiles at any time, up to 7
-The draws come from a "bag", so as the player expends tiles they will not be seen again
-The bag can fully empty, at which time there is no way to refill the bag
-The player can submit the word at any time, updating the total score and resetting the board
-The score is kept until the game is restarted
-The player can restart the game

Features that could be implemented with relative ease:
-Dropzone highlighting is possible to make clear which spaces are able to accept tiles after the first tile is dropped. This can be done using the dropzone class which is given to droppable tiles.
-A more generic draw system where a player can choose how many to draw, including above 7. This can be done using the drawTiles function, which can draw any number of tiles.