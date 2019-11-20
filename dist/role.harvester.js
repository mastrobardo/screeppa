
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, spawner) {
        const IDACOLOR = 'e3e3e3';
        const VUELTACOLOR = 'ff00ff'
        if(creep.store.getFreeCapacity() > 0) {
            // console.log('harvester can work')
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                
                creep.moveTo(sources[0],{ 
                    visualizePathStyle: { stroke: IDACOLOR}
                });
            }
        }
        else {
        //   console.log('harvester full')
            if(creep.transfer(spawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                console.log('moving back -> ', spawner)
                creep.moveTo(spawner,   {
                    visualizePathStyle: { stroke: VUELTACOLOR }
                });
            }
        }
    }
}
module.exports = roleHarvester;