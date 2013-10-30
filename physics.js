//contains an object which controls the physics constants of the game.

var gamePhysics = {
	//multiplier applie to velocity to slow movement
	surfaceFric: .99,
	//rate of increase for moving shapes
	acceleration: 20,
	//top limit on speed for objects to move
	maxSpeed: 40,
	//energy absorbtion by walls
	eAbsorb: -.75,
	//time until random accel choice in milliseconds
	randAccel: 250
};


