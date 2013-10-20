
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
};

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
}

Circle.prototype.move(xVel, yVel, canvas) {
	this.x += xVel;
	this.y += yVel;

	if (this.x >= canvas.width - this.radius) {
		this.x = canvas.width - this.radius;
	}
	else if (this.x <= radius) {
		this.x = radius;
	}

	if (this.y >= canvas.height - this.radius) {
		this.y = canvas.height - this.radius);
	}
	else if (this.y <= radius) {
		this.y = radius;
	}
}
