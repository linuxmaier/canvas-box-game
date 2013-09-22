function Shape(xloc, yloc) {
	this.x = xloc;
	this.y = yloc;
	this.fillStyle = "#FFFFFF";
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.acceleration = 20;
	this.maxSpeed = 100;
	this.eAbsorb = .75;
}


