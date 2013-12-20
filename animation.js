/*

This creates a frame of animation based on the objects in play and their motion.

It takes an array of shape objects on the screen, the context for the canvas element,
the gameCanvas its self and the start time of the animation. It then renders the frame
and feeds a new start time into the next frame via the requestAnimationFrame callback

*/

function animate (shapeArray, ctext, gameCanvas, confirmedCollisions, startTime, physics) {
	//this is the time elapsed since the last frame. The divisor is 
	//arbitrary, chosen by what feels right.
	var time = ((new Date()).getTime() - startTime) / 10000000000000;
	
	requestAnimationFrame(function() {animate(shapeArray, ctext, gameCanvas, confirmedCollisions, time, physics)});
	/*
	going to go with quad-tree, I think. Either that or a static subdivision of the play area,
	but I think quad-tree works best in terms of the scalability of the game, in case I want
	to make lots more objects on the screen.
	*/
	for (var h = 0; h < confirmedCollisions.length; h++) {
		for (var g = 0; g < confirmedCollisions[h].length; g++) {
			confirmedCollisions[h][g].collided = true;
			if (confirmedCollisions[h][g].__proto__ == confirmedCollisions[h][(g+1)%2].__proto__) {
				confirmedCollisions[h][g].fillStyle = "#FF0066";
			}
			else if (confirmedCollisions[h][g] instanceof Circle) {
				confirmedCollisions[h][g].doomed = true;
			}
			else {
				confirmedCollisions[h][g].player.score += Math.round(70 / confirmedCollisions[h][(g+1)%2].radius);
			}
		}
	}
/*
	for (var g = 0; g < shapeArray.length; g++) {
		if (shapeArray[g].collided) {
			shapeArray[g].fillStyle = "#FF0066";
			if (shapeArray[g].player) {
				if (!shapeArray[g].collider) {
					shapeArray[g].player.score += 1;
				}
			}
			else if (shapeArray[g].collider) {
				shapeArray.splice(g, 1);
				shapeArray.push(new Circle(gameCanvas, physics));
			}
		}
		else {
			shapeArray[g].fillStyle = shapeArray[g].origStyle;
			shapeArray[g].collider = false;
		}
		shapeArray[g].collided = false;
	}
*/	for (var x = 0; x < shapeArray.length; x++) {
		if (shapeArray[x].doomed) {
			shapeArray.splice(x, 1);
			shapeArray.push(new Circle(gameCanvas, physics));
		}
	}
	ctext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	//clears confirmedCollisions
	confirmedCollisions.length = 0;
	
	for (var i = 0; i < shapeArray.length; i++) {
		if (!shapeArray[i].collided) {
			shapeArray[i].fillStyle = shapeArray[i].origStyle;
		}
		shapeArray[i].collided = false;
		shapeArray[i].applyAccel(time); 
		shapeArray[i].move(time, gameCanvas);
		for (var j = i + 1; j < shapeArray.length; j++) {
			if (!(shapeArray[i] === shapeArray[j]) && shapeArray[i].checkCollision(shapeArray[j])) {
				confirmedCollisions.push([shapeArray[i], shapeArray[j]]);
			}
		}
		shapeArray[i].draw(ctext);
	}
	var players = new Array();
	for (var k = 0; k < shapeArray.length; k++) {
		if (shapeArray[k].player) {
			players.push(shapeArray[k].player);
		}
	}
	var scoreString = "";
	for (var l = 0; l < players.length; l++) {
		scoreString += players[l].name + ": " + players[l].score + " ";
	}
	ctext.font = '12pt Calibri';
	ctext.fillStyle = "black";
	ctext.fillText(scoreString, 10, gameCanvas.height - 10);
}

