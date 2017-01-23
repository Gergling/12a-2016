function Attribute(
    config, // The config node corresponding to this attribute. Derived from the parent and the name.
    value, // If undefined, should default to 0.
    parent, // If this is undefined, the attribute is considered to be the root.
) {
    var data = {
        children: []
    };

    function addChild(attribute) {
        data.children.push(attribute);
    }

    if (parent !== undefined) {
        parent.addChild(this);
    }

    this.addChild = addChild;
}

function instantiate(parent, config, value) {
    return new Attribute(parent, config, value);
}

module.exports = instantiate;
