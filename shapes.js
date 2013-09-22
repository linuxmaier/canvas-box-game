
function Shape(xloc, yloc) {

/*super class that contains all shapes in game. includes location
and velocity info, since all objects will have location and some
may move. Also contains fill style and border defaults*/

	this.x = xloc;
	this.y = yloc;
	this.fillStyle = "#FFFFFF";
	this.borderWidth = 1;
	this.xVelocity = 0;
	this.yVelocity = 0;
}
