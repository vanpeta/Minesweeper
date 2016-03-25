

Minesweeper is my own version of the classic videogame.

Player is allowed to select the amount of rows and columns to buid his/her very own board. Also level selection is allowed:

1. easy - 10% of board tiles are mines
2. medium - 25% of board tiles are mines
3. hard - 50% of board tiles are mines

The goal is to mark all the hidden mines on the board using the space bar.



GOOD LUCK



Minesweeper was built using html, CSS, JavaScrip and Jquery. 

Wireframes

 ![Welcome Window](/Users/carlos/Desktop/Welcome Window.png)

 ![Game Console](/Users/carlos/Desktop/Game Console.png)

 ![Winner Window](/Users/carlos/Desktop/Winner Window.png)



 Extra features will be added in the near future, like a timer and a score table with best times to beat.

Developing process step by step:

1. building the board and a feature where the player can customize the board by selecting the number of rows and columns.

2. inserting mines ramdonly with the choice for the player to choose the level, harder the level results in a higher percentage of mines

3. clicking functionality:

   •clicking on a "safe tile" reveals it and reveals all the adjacent tiles that have not a mine and keep doing this until a tile next to a mine is revealed.

   •clicking on a tile next to a mine will reveals this tile and features the number of tiles with mines next to itself.

   •clicking on a tile with a mine will end the game.

4. marking mines, by positioning the mouse on a specific tile player can mark that tile as a mine by pressing the space bar.

5. win logic, player that marks all the mines in the board wins the game.

6. adding a mine counter to inform the player how many mines are left.

7. including some winning and losing messages.

8. adding a reset button and instructuons.

   ​