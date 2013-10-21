
function Shape(xloc, yloc, fillStyle) {

/*super class that contains all shapes in game. includes location
and velocity info, since all objects will have location and some
may move. Also contains fill style and border defaults*/

	//x and y are either xloc and yloc, or if no parameters become 0
	this.x = arguments[0] ? arguments[0] : 0;
	this.y = arguments[1] ? arguments[1] : 0;
	this.fillStyle = fillStyle;
	this.borderWidth = 1;
	this.xVelocity = 0;
	this.yVelocity = 0;
}

Shape.prototype.move = function(time, xVel, yVel) {
	/*time is required, xVel and yVel are optional
	
	changes position of object based on current or
	provided velocity multiplied by time.
	*/
	
	if (arguments[1]) {
		this.xVelocity = xVel;
	}
	if (arguments[2]) {
		this.yVelocity = yVel;
	}
	this.x += this.xVelocity * time;
	this.y += this.yVelocity * time;
	console.info("moved x " + this.x + " and y " + this.y);
}

/*

Rectangle is the main game object. It needs to be controllable 
by the player applying acceleration to it which will change the velocity

Inherits from Shape

*/

function Rectangle(xloc, yloc, width, height, fillStyle) {
	Shape.call(this, xloc, yloc, fillStyle);
	this.width = width;
	this.height = height;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.draw = function(ctext) {

//draws Rectangle object based on its location, width height
//and coloring info. Requires that the context is passed to it

	ctext.beginPath();
	ctext.rect(this.x, this.y, this.width, this.height);
	ctext.fillStyle = this.fillStyle;
	ctext.fill();
	ctext.lineWidth = this.borderWidth;
	ctext.strokeStyle = "black";
	ctext.stroke();
	console.info("drew rect");
}

Rectangle.prototype.borderAdjust = function(gameCanvas) {
/*
runs interactions with the border of the playing area for rectangles.
Needs to be differnt than for Circles because of different way of 
calculating the distance from the right/bottom border.

Determines if the rectangle is positioned beyond the border. If so,
repositions the rectangle at the border.
*/
	//deals with x border
	this.xVelocity *= -1;
	if (this.x >= gameCanvas.width - this.width) {
		this.x = gameCanvas.width - this.width;
	}
	else if (this.x <= 0) {
		this.x = 0;
	}
	else {
		this.xVelocity *= -1;
	}
	
	//deals with y border
	this.yVelocity *= -1;
	if (this.y >= gameCanvas.height - this.height) {
		this.y = gameCanvas.height - this.height;
	}
	else if (this.y <= 0) {
		this.y = 0;
	}
	else {
		this.yVelocity *= -1;
	}
	console.info("rect yVel = " + this.yVelocity);

}

/*

Circle is the secondary object in the game. They are animated without
player input.

Inherits from Shape

*/

function Circle(xloc, yloc, radius, fillStyle) {
	Shape.call(this, xloc, yloc, fillStyle);
	this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function(ctext) {

//draws Circle based on its location, radius and coloring
//info. Requires that the context is passed to it

	ctext.beginPath();
	ctext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
	ctext.fillStyle = this.fillStyle;
	ctext.fill();
	ctext.lineWidth = this.borderWidth;
	ctext.strokeStyle = "black";
	ctext.stroke();
	console.info("drew circ");
}

Circle.prototype.borderAdjust = function(gameCanvas) {
/*
runs interactions with the border of the playing area for circles.
Needs to be differnt than for Rects because of different way of 
calculating the distance from the right/bottom border.

Determines if the circle is positioned beyond the border. If so,
repositions the circle at the border.
*/
	//deals with x border
	this.xVelocity *= -1;
	if (this.x >= gameCanvas.width - this.radius) {
		this.x = gameCanvas.width - this.radius;
	}
	else if (this.x <= 0 + this.radius) {
		this.x = 0 + this.radius;
	}
	else {
		this.xVelocity *= -1;
	}
	
	//deals with y border
	this.yVelocity *= -1;
	if (this.y >= gameCanvas.height - this.radius) {
		this.y = gameCanvas.height - this.radius;
	}
	else if (this.y <= 0 + this.radius) {
		this.y = 0 +this.radius;
	}
	else {
		this.yVelocity *= -1;
	}
	console.info("circ vel = " + this.xVelocity);
}
