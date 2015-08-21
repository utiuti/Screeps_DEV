var Behavior = require("_behavior");

var b = new Behavior("get_energy_link");

function findLinks(rc) {
  return _.filter(rc.links.receivers, function(s) {
    return s.energy > 0;
  });
}

b.when = function(creep, rc) {
  var links = findLinks(rc);
  console.log(links);
  return (creep.energy === 0 && links);
};

b.completed = function(creep, rc) {
  var target = Game.getObjectById(creep.target);
  return (target === null || creep.energy === creep.energyCapacity);
};

b.work = function(creep, rc) {
  var target = creep.getTarget();
  console.log("Link Target: " + target);
  if ( target === null ) {
     var links = findLinks(rc);
     console.log("Links ID: " + links.id);
     creep.target = links.id;
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