function Point(x_coord, y_coord) {
	//for keeping track of corners

	this.x = x_coord;
	this.y = y_coord;
}

function Shape(xloc, yloc, fillStyle, controlled, physics) {
/*super class that contains all shapes in game. includes location
and velocity info, since all objects will have location and some
may move. Also contains fill style and border defaults*/
	//this.x and this.y refer to the center of shapes.
	this.x = xloc;
	this.y = yloc;
	this.origStyle = fillStyle;
	this.fillStyle = this.origStyle;
	this.borderWidth = 1;
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.control = controlled;
	this.physics = physics;
	this.collided = false;
}

Shape.prototype.move = function(time) {
	/*time is required
	
	changes position of object based on current or
	provided velocity multiplied by time. Also ensures
	that velocity doesn't exceed the physics' maxSpeed
	*/

	if (!((this.xVelocity == 0) && (this.yVelocity == 0))) {

		var linearSpeed = Math.sqrt((this.xVelocity*this.xVelocity) + (this.yVelocity*this.yVelocity));	
		if (linearSpeed >= this.physics.maxSpeed) {
			this.xVelocity /= (linearSpeed / this.physics.maxSpeed);
			this.yVelocity /= (linearSpeed / this.physics.maxSpeed);
		}
	}

	this.x += this.xVelocity * time;
	this.y += this.yVelocity * time;
	if (this.cnr) {
		for (i = 0; i < this.cnr.length; i++) {
			this.cnr[i].x += this.xVelocity * time;
			this.cnr[i].y += this.yVelocity * time;
		}
	}

}

Shape.prototype.checkCollision = function(shape) {
		axes = this.getAxes(shape).concat(shape.getAxes(this));

		for (i = 0; i < axes.length; i++) {
			axis = axes[i];
			projLengthA = this.getProj(axis, shape);
			projLengthB = shape.getProj(axis, this);

			centVec = new Vec2(this.x - shape.x, this.y - shape.y);
			centVec = Math.abs(centVec.dot(axis));
			
			if (projLengthA + projLengthB <= centVec) {
				return false;
			}
		}
		return true;
}
/*

Rectangle is the main game object. It needs to be controllable 
by the player applying acceleration to it which will change the velocity

Inherits from Shape

*/

function Rectangle(xloc, yloc, width, height, fillStyle, controlled, physics, keys, keymap) {
	Shape.call(this, xloc, yloc, fillStyle, controlled, physics);
	this.width = width;
	this.height = height;
	this.keys = keys;
	this.cnr = [new Point(xloc - this.width/2, yloc - this.height/2),
		    new Point(xloc + this.width/2, yloc - this.height/2),
		    new Point(xloc + this.width/2, yloc + this.height/2),
		    new Point(xloc - this.width/2, yloc + this.height/2)];
	this.l = keymap[0];
	this.u = keymap[1];
	this.r = keymap[2];
	this.d = keymap[3];
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.draw = function(ctext) {

//draws Rectangle object based on its location, width height
//and coloring info. Requires that the context is passed to it

	ctext.beginPath();
	ctext.rect((this.x - this.width / 2), (this.y - this.height / 2), this.width, this.height);
	ctext.fillStyle = this.fillStyle;
	ctext.fill();
	ctext.lineWidth = this.borderWidth;
	ctext.strokeStyle = "black";
	ctext.stroke();
}



Rectangle.prototype.applyAccel = function(time) {
	var xVel = 0;
	var yVel = 0;
	if (this.control) {
		if (this.keys[this.l]) {
			xVel += this.physics.acceleration * time * -1;
		}
		if (this.keys[this.r]) {
			xVel += this.physics.acceleration * time;
		}
	
		if (this.keys[this.u]) {
			yVel += this.physics.acceleration * time * -1;
		}
		if (this.keys[this.d]) {
			yVel += this.physics.acceleration * time;
		}
	}

	this.xVelocity += xVel;
	this.yVelocity += yVel;
	if (this.control) {
		this.xVelocity *= this.physics.surfaceFric;
		this.yVelocity *= this.physics.surfaceFric;
	}
}
/*
Rectangle.prototype.checkCollision = function(shape) {
	
	if (shape instanceof Rectangle) {
		//implement rect collision
		return !(Math.max(this.x, shape.x) - Math.min(this.x, shape.x) > (this.width / 2) + (shape.width / 2) || 
		Math.max(this.y, shape.y) - Math.min(this.y, shape.y) > (this.height / 2) + (shape.height / 2));
		
	}	
	if (shape instanceof Circle) {
	}
	return false;
}
*/
Rectangle.prototype.borderAdjust = function(gameCanvas) {
/*
runs interactions with the border of the playing area for rectangles.
Needs to be differnt than for Circles because of different way of 
calculating the distance from the right/bottom border.

Determines if the rectangle is positioned beyond the border. If so,
repositions the rectangle at the border.
*/
	//deals with x border
	this.xVelocity *= this.physics.eAbsorb;
	if (this.x >= gameCanvas.width - (this.width / 2)) {
		this.x = gameCanvas.width - (this.width / 2);
	}
	else if (this.x <= this.width / 2) {
		this.x = this.width / 2;
	}
	else {
		this.xVelocity /= this.physics.eAbsorb;
	}
	
	//deals with y border
	this.yVelocity *= this.physics.eAbsorb;
	if (this.y >= gameCanvas.height - (this.height / 2)) {
		this.y = gameCanvas.height - (this.height / 2);
	}
	else if (this.y <= this.height / 2) {
		this.y = this.height / 2;
	}
	else {
		this.yVelocity /= this.physics.eAbsorb;
	}

}

Rectangle.prototype.getAxes = function(shape) {

	rectAxes =  [new Vec2(this.cnr[1].x - this.cnr[0].x, this.cnr[1].y - this.cnr[0].y), new Vec2(this.cnr[3].x - this.cnr[0].x, this.cnr[3].y - this.cnr[0].y)];

	//normalize axis vectors
	for (i = 0; i < rectAxes.length; i ++) {
		if (!(rectAxes[i].x == 0 && rectAxes[i].y == 0)) {
			rectAxes[i].normalize();
		}
	}

	return rectAxes;

}

Rectangle.prototype.getRegion = function(shape) {
	//Used in Circle.getAxes
	if (shape.x < this.cnr[0].x) {
		if (shape.y < this.cnr[0].y) {
			return 0;
		}
		if (shape.y > this.cnr[3].y) {
			return 6;
		}
	}
	if (shape.x > this.cnr[1].x) {
		if (shape.y < this.cnr[1].y) {
			return 2;
		}
		if (shape.y > this.cnr[2].y) {
			return 4;
		}
	}
	return 1;
}

Rectangle.prototype.getProj = function(axis, shape) {

	var minimum = 0;
	var maximum = 0;
	var mincnr;
	var maxcnr;

	for (i = 0; i < this.cnr.length; i++) {
		tempVec = new Vec2(this.cnr[i].x - this.x, this.cnr[i].y - this.y);
		tempVal = tempVec.dot(axis);
		if (tempVal <= minimum) {
			minimum = tempVal;
			mincnr = this.cnr[i];
		}
		if (tempVal >= maximum) {
			maximum = tempVal;
			maxcnr = this.cnr[i];
		}
	}

	centersVec = new Vec2(this.x - shape.x, this.y - shape.y);
	if (centersVec.dot(axis) > 0) {
		returnVec = new Vec2(mincnr.x - this.x, mincnr.y - this.y);
		return Math.abs(returnVec.dot(axis));
	}
	else {
		returnVec = new Vec2(maxcnr.x - this.x, maxcnr.y - this.y);
		return Math.abs(returnVec.dot(axis));
	}
}

/*

Circle is the secondary object in the game. They are animated without
player input.

Inherits from Shape

*/

function Circle(xloc, yloc, radius, fillStyle, physics) {
	Shape.call(this, xloc, yloc, fillStyle, false, physics);
	this.radius = radius;
	this.circAccel = 20;
	this.timer = false;
	this.xAccel = 0;
	this.yAccel = 0;
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

Circle.prototype.applyAccel = function(time) {
	if (!this.timer) {
		setTimeout(function() {
			var angle = Math.random() * 2 * Math.PI;
	
			this.xAccel = this.circAccel * Math.cos(angle);
			this.yAccel = this.circAccel * Math.sin(angle);
			this.timer = false;
		}.bind(this), Math.random() * this.physics.randAccel + this.physics.randAccel);
		this.timer = true;
	}
	this.xVelocity += this.xAccel * time;
	this.yVelocity += this.yAccel * time;
}
/*
Circle.prototype.checkCollision = function(shape) {
	if (shape instanceof Circle) {
		var distance = Math.pow(this.x - shape.x, 2) + Math.pow(this.y - shape.y, 2);
		var distance = Math.sqrt(distance);
		return distance < this.radius + shape.radius;
	}	
	return false;
}
*/
Circle.prototype.borderAdjust = function(gameCanvas) {
/*
runs interactions with the border of the playing area for circles.
Needs to be differnt than for Rects because of different way of 
calculating the distance from the right/bottom border.

Determines if the circle is positioned beyond the border. If so,
repositions the circle at the border.
*/
	//deals with x border
	this.xVelocity *= this.physics.eAbsorb;
	if (this.x >= gameCanvas.width - this.radius) {
		this.x = gameCanvas.width - this.radius;
	}
	else if (this.x <= 0 + this.radius) {
		this.x = 0 + this.radius;
	}
	else {
		this.xVelocity /= this.physics.eAbsorb;
	}
	
	//deals with y border
	this.yVelocity *= this.physics.eAbsorb;
	if (this.y >= gameCanvas.height - this.radius) {
		this.y = gameCanvas.height - this.radius;
	}
	else if (this.y <= 0 + this.radius) {
		this.y = 0 +this.radius;
	}
	else {
		this.yVelocity /= this.physics.eAbsorb;
	}
}

Circle.prototype.getAxes = function(shape) {
	if (shape instanceof Circle) {
		circVec = new Vec2(this.x - shape.x, this.y - shape.y);
		if (!(circVec.x == 0 && circVec.y == 0)) {
			circVec.normalize();
		}
		return [circVec];
	}
	region = shape.getRegion(this);
	if (region % 2 != 0) {
		return [];
	}
	circVec = new Vec2(shape.cnr[region/2].x - this.x, shape.cnr[region/2].y - this.y);
	if (!(circVec.x == 0 && circVec.y == 0)) {
		circVec.normalize();	
	}
	return [circVec];
}

Circle.prototype.getProj = function(axis, shape) {
	return this.radius;
}
