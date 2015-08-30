var Behavior = require("_behavior");

function findNearLink(obj, rc) {
  var links = rc.links.senders;
  var thelink = obj.pos.findInRange(links, 1);
  if (thelink && (thelink.energy !== thelink.energyCapacity))
  return thelink;
}

var b = new Behavior("miner_harvest");

b.when = function() {
  return true;
};

b.completed = function() {
  return false;
};

b.work = function(creep, rc) {
  var source = creep.getTarget();

  if (!creep.target) {
    source = _.find(rc.getSources(), function(s) {
      return (rc.getCreeps("miner", s.id).length === 0);
    });
  }

  if (source === null) {
    source = Game.getObjectById(creep.target);
  }

  if (source !== null) {
    creep.target = source.id;
    if (!creep.pos.isNearTo(source)) {
      creep.moveTo(source);
    } else {
      creep.harvest(source);
      var link = findNearLink(creep,rc);
        if (creep.pos.isNearTo(rc.room.storage)) {creep.transferEnergy(rc.room.storage);}
          else if (link) { creep.transferEnergy(link); } 
          else {creep.dropEnergy();}
    }
  }
};

module.exports = b;
