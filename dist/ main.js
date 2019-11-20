
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleBuilder = require('role.upgrader');


const SPAWNNAME = 'Thas';
const HARV = 'HARV-';
const BUILD = 'BUILD-';
const UPG = 'TECH-';


module.exports.loop = function () {
    
    const SPAWNER =   Game.spawns[SPAWN];
    
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    for (var name in Game.rooms) {
      console.log(
        'Room "' + name + '" has ' + Game.rooms[name].energyAvailable + " energy"
        );
    }
    
    console.log(Game.spawns[SPAWN])
    let harvesters = _.filter(Game.creeps, creep => creep.memory.role == 'harvester');
    let builders = _.filter(Game.creeps, creep => creep.memory.role == 'builder');
    let upgraders = _.filter(Game.creeps, creep => creep.memory.role == 'upgrader');

    if(harvesters.length < 5) {
        let newName = HARV + Game.time;
        console.log('spawn harv')
        SPAWNER.spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    
    if(builders.length < 2) {
       let newName = BUILD + Game.time;
        console.log('spawn build')
        SPAWNER.spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});
    }
    
    if(upgraders.length < 2) {
        let newName = UPG + Game.time;
        console.log('spawn techies')
        SPAWNER.spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }

    for(let name in Game.creeps) {
        const creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep, Game.spawns[SPAWN]);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
          if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}