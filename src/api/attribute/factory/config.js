function AttributeConfig(parent) {
    var data = {
        children: []
    };
    
    function child(name, value) {
        if (value !== undefined) {
            
        }
        return data.children.filter(function () {
        });
    }
    
    function addChild(name, value) {
        // Check whether child exists.
        // Exception if it does.
        // Create if not.
        // Return the child.
    }
    
    this.parent = parent;
}

function instantiate(parent) {
    return new AttributeConfig(parent);
}

module.exports = instantiate;
