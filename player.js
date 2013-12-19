function Player(name, shapeinfo, physics, keys) {
	this.score = 0;
	this.name = name;
	this.shape = new Rectangle(shapeinfo.x, shapeinfo.y, shapeinfo.width, shapeinfo.height, shapeinfo.fillStyle, physics, keys, shapeinfo.keymap);
}