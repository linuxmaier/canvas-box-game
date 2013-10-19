
function Shape(xloc, yloc) {

/*super class that contains all shapes in game. includes location
and velocity info, since all objects will have location and some
may move. Also contains fill style and border defaults*/

	//x and y are either xloc and yloc, or if no parameters become 0
	this.x = arguments[0] ? arguments[0] : 0;
	this.y = arguments[1] ? arguments[1] : 0;
	this.fillStyle = "#FFFFFF";
	this.borderWidth = 1;
	this.xVelocity = 0;
	this.yVelocity = 0;
}
