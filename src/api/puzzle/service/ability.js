function cast(name, location, target) {
    // find scale and map from current battle
    console.log('casting', name, location, target)
    var ability = require('../../ability/service').find('spaceship', 'interstellar', name);
    // get tile for location
    // get tile for target. if target omitted, use location tile
    // check target falls within ability range of location
    location.distance(target);
    ability.effect(locationTile, targetTile);
}

module.exports = {
    cast: cast
};
