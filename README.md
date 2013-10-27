canvas-box-game
===============

Simple game where you smash bubbles with boxes.

The game will be multiplayer and feature hazards that players can knock their opponents into to gain an advantage in the bubble popping extravaganza.

The basic structure of the program is this:

canvas-box-html.html

This is the main HTML page for the game. It contains the canvas element, links all the scripts in and starts the whole shebang off.

animation.js

This runs the animation loop that powers the game. It iterates through an array containing all the game shapes and figures out where they're going, moves them there, draws them and kicks off the next frame.

shapes.js

This contains all the useful methods for manipulating and creating shapes. Most of the meat of the program is here, and if there's a bug it usually relates back to this file.

physics.js

This just contains one object that informs the rest of the game on basic physics principles.

cbgstyle.css

This is the style sheet. Will be nicely filled out once the game is done, I promise.


