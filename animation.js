/*

This creates a frame of animation based on the objects in play and their motion.

It takes an array of shape objects on the screen, the context for the canvas element,
the gameCanvas its self and the start time of the animation. It then renders the frame
and feeds a new start time into the next frame via the requestAnimationFrame callback

*/

function animate (shapeArray, ctext, gameCanvas, confirmedCollisions, startTime) {
	//this is the time elapsed since the last frame. The divisor is 
	//arbitrary, chosen by what feels right.
	var time = ((new Date()).getTime() - startTime) / 10000000000000;
	
	/*
	going to go with quad-tree, I think. Either that or a static subdivision of the play area,
	but I think quad-tree works best in terms of the scalability of the game, in case I want
	to make lots more objects on the screen.
	*/

	/* 
	until I have that figured out, I'll just run some
	test animations. Those are below:
	*/
	ctext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	for (var h = 0; h < confirmedCollisions.length; h++) {
		//resolve collisions
	}
	confirmedCollisions.clear();
	for (var i = 0; i < shapeArray.length; i++) {
		shapeArray[i].applyAccel(time); 
		shapeArray[i].move(time);
		shapeArray[i].borderAdjust(gameCanvas);
		for (var j = i; j < shapeArray.length; j++) {
			if (shapeArray[i].checkCollision(shapeArray[j])) {
				confirmedCollisions.push([shapeArray[i], shapeArray[j]]);
			}
		}
		shapeArray[i].draw(ctext);
	}
	requestAnimationFrame(function() {animate(shapeArray, ctext, gameCanvas, confirmedCollisions, time)});
}	
