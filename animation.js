/*

This creates a frame of animation based on the objects in play and their motion.

It takes an array of shape objects on the screen, the context for the canvas element,
the gameCanvas its self and the start time of the animation. It then renders the frame
and feeds a new start time into the next frame via the requestAnimationFrame callback

*/

function animate (shapeArray, ctext, gameCanvas, startTime) {
	console.info("starting frame");
	var time = (new Date()).getTime() - startTime;
	
	/*
	I need to figure out how to impement object collision.

	Possible solutions: determine upper limit to objects
	
	cut canvas into sections and determine where square 
	is before detecting collisions with objects in its section.

	implement clever collision detection algorithm.

	Thinking either first or second option works best for this.
	*/

	/* 
	until I have that figured out, I'll just run some
	test animations. Those are below:
	*/
	ctext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

	for (var i = 0; i < shapeArray.length; i++) {
		shapeArray[i].move(time);
		shapeArray[i].borderAdjust(gameCanvas);
		shapeArray[i].draw(ctext);
	}
	console.info("requesting new frame");

	requestAnimationFrame(function() {animate(shapeArray, ctext, gameCanvas, time)});
}	
