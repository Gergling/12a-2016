function Attribute(parent, config, value) {
    var data = {
        parent: undefined, // If this is undefined, the attribute is considered to be the root.
        config: undefined, // The config node corresponding to this attribute. Derived from the parent and the name.
        value: 0
    };
    
    function set(name, 
}

function instantiate(parent, config, value) {
    return new Attribute(parent, config, value);
}

module.exports = instantiate;
