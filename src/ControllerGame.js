var ControllerRoom = require("ControllerRoom");
var Debugger = require("_debugger");

var ControllerGame = function () {
	this.garbageCollection();
	// TODO: Warum wird das auch noch einmal in main.js aufgerufen

	this._rooms = {};
	for (var r in Game.rooms) {
		var room = Game.rooms[r];
		this._rooms[room.name] = new ControllerRoom(room, this);
	}
};

ControllerGame.prototype.processRooms = function () {
	for (var i in this._rooms) {
		var debug = new Debugger("processing room " + i);
		this._rooms[i].run();
		debug.end();
	}
};

/*
ControllerGame.prototype.processGlobal = function () {

	// scout
	if ( Game.cpuLimit > 400 ) {
		// TODO: Hardcode cpuLimit > Fail
    gc.scout();
	}
};
*/

ControllerGame.prototype.garbageCollection = function () {
	for (var c in Memory.creeps) {
		if (!Game.creeps[c]) {
			delete Memory.creeps[c];
		}
	}
};

module.exports = ControllerGame;
