var Behavior = require("_behavior");

var b = new Behavior("miner_harvest");

b.when = function () {
  return true;
};

b.completed = function () {
  return false;
};

b.work = function (creep, rc) {
  var source = creep.getTarget();

  if (!creep.target) {
    source = _.find(rc.getSources(), function (s) {
      return (rc.getCreeps("miner", s.id).length === 0);
    });
  }

  if (source === null) {
    source = Game.getObjectById(creep.target);
  }

  if (source !== null) {
    creep.target = source.id;

    if (source.container && !(creep.pos.isEqualTo(source.container.pos))) {
      creep.moveTo(source.container);
    } else if (!creep.pos.isNearTo(source)) {
      creep.moveTo(source);
    }

    creep.harvest(source);
    var link;
    if (creep.memory.link) {
      link = Game.getObjectById(creep.memory.link);
    } else {
      link = rc.findNearLink(creep);
    }
    console.log("Link ist Objekt: " + link);
    // TODO: transfer only when full
    if (link) {
      creep.transfer(link, RESOURCE_ENERGY);
    } else {
      creep.drop(RESOURCE_ENERGY);
    }
  }
}

module.exports = b;