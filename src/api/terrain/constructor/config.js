function TerrainConfig() {
    var data = {
        impediment: 0,
        impassable: false,
        label: 'Undescribed Terrain'
    };

    function initialise(value) {
        Object.keys(value).forEach(function (prop) {
            data[prop] = value[prop];
        });
        return this;
    }

    this.initialise = initialise;
}

module.exports = TerrainConfig;
