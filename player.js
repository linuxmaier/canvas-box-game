function Player(name, shapeinfo, physics, keys, number) {
	this.score = 0;
	this.name = name;
	this.shape = new Rectangle(shapeinfo.x, shapeinfo.y, shapeinfo.width, shapeinfo.height, shapeinfo.fillStyle, physics, keys, shapeinfo.keymap, this);
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

function randomColor() {
	var letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
