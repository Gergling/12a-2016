function SpriteConfig() {
    var data;

    function initialise(value) {
        data = value;
    }

    function abilities() {
        return data.abilities;
    }

    // function generators() {
    //     console.log('wtf')
    //     console.error('wtf')
    //     return 'wtf'
    // }

    this.initialise = initialise;
    this.abilities = abilities;
}

module.exports = SpriteConfig;
