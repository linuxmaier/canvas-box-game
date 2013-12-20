function Player(name, shapeinfo, physics, keys) {
	this.score = 0;
	this.name = name;
	this.shape = new Rectangle(shapeinfo.x, shapeinfo.y, shapeinfo.width, shapeinfo.height, shapeinfo.fillStyle, physics, keys, shapeinfo.keymap);
	this.fricDebuff = 1;
	this.acceDebuff = 1;
}

Player.debuff = new function(type) {
	
}

function shapeInfo (x, y, width, height, color, keymap) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.fillStyle = color;
	this.keymap = keymap;
}
