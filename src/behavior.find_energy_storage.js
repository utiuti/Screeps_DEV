var Behavior = require("_behavior");

var b = new Behavior("find_energy_storage");

b.when = function(creep, rc) {
  console.log("Creep Energy: " + creep.energy + " Storage: " + rc.room.storage);
  return (creep.energy === 0 && rc.room.storage);
};

b.completed = function(creep, rc) {
  var target = Game.getObjectById(creep.target);
  return (target === null || creep.energy === creep.energyCapacity);
};

b.work = function(creep, rc) {
  var target = creep.getTarget();

  if ( target === null ) {
     creep.target = rc.room.storage.id;
  }

  if ( target !== null ) {
    if ( !creep.pos.isNearTo(target) ) {
      creep.moveToEx(target);
    } else {
      target.transferEnergy(creep);
      creep.target = null;
    }
  }
};

module.exports = b;