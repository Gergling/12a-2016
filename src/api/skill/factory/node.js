var getterSetter = require('../../util/getter-setter');

function SkillReference(strRef) {
    var chunks = strRef.split(".");
    var data = {
        name: chunks.shift(),
        descRef: chunks.join(".")
    };

    getterSetter(this, data, { nosetters: true });
}

// Todo: Should have a refactor.
// Get the unit test running for this, then do the refactor. That way we can see if it fails.
// Consider separating player-specific components.
// Maybe needs an object which has a property for the user and a property for the skill.
// That will be the object that's represented in the DB.
// It will have training points, level and name.
// The DB service will load up these objects. The SkillNodes will contain them.
// Saves/loads will handle them.
function SkillNode(name) {
    var scope = this,
        children = { },
        trainingHours = 0,
        level = 0,
        description = "",
        model;

    // var data = deepExtend({
    //     name: name,
    //     children: {},
    //     levelTrainingHours: 0,
    //     description: ''
    // });

    //getterSetter(this, data, { nosetter:})

    this.getName = function () {return name; };
    this.description = function (desc) {
        if (typeof desc === "string") {description = desc; }
        return description;
    };
    this.getChild = function (childName) {
        return children[childName];
    };
    this.children = function () {return children; };

    // Todo: rename to findOrCreate
    this.set = function (strRef, props) {
        var node = scope.traverse(strRef, false);
        if (props) {
            node.description(props.description || "");
        }
        return node;
    };
    this.find = function (strRef) {
        return scope.traverse(strRef, true);
    };

    this.traverse = function (strRef, getter) {
        var reference = new SkillReference(strRef),
            childName = reference.getName(),
            descRef = reference.getDescendentReference(),
            child = children[childName],
            node;

        if (!child) {
            if (getter) {
                throw new Error("Node named '"
                    + name
                    + "' has no child named '"
                    + childName + "'");
            }
            child = new SkillNode(childName);
            children[childName] = child;
        }
        if (!descRef) {
            node = child;
        } else {
            node = child.traverse(descRef, getter);
        }
        return node;
    };
    this.getTree = function () {
        var tree = {
            name: name,
            description: scope.description(),
            trainingHours: trainingHours,
            level: level,
            label: "",
            children: {}
        };
        if (name) {
            tree.label = name.charAt(0).toUpperCase() + name.slice(1);
        }
        Object.keys(children).forEach(function (childName) {
            tree.children[childName] = children[childName].getTree();
        });
        return tree;
    };

    this.getTrainingHours = function () {return trainingHours; };
    this.getTotalTrainingHours = function () {
        return (Math.pow(level, 2) / 2)
            + (level / 2)
            + trainingHours;
    };
    this.getTotalDescendentTrainingHours = function () {
        var hours = scope.getTotalTrainingHours();
        Object.keys(children).forEach(function (childName) {
            hours += scope.getChild(childName)
                .getTotalDescendentTrainingHours();
        });
        return hours;
    };
    this.getLevel = function () {return level; };
    this.train = function () {
        trainingHours += 1;
        if (trainingHours >= level + 1) {
            level += 1;
            trainingHours -= level;
        }
    };

    this.load = function (newModel) {
        model = newModel;
        trainingHours = model.trainingHours || 0;
        level = model.level || 0;
        model.children.forEach(function (childModel) {
            var childName = childModel.name,
                child = scope.getChild(childName),
                hours = 0;

            if (child) {
                child.load(childModel);
            } else {
                // Not an official child. 
                // Maybe skills have restructured.
                // Add the total descendent training 
                // hours to the player total.
                hours = scope.getTotalDescendentTrainingHours();
                // Load player model.
                // Add training hours.
                // Save player model.
                // Remove the child skill model.
            }
        });
    };
    this.save = function () {
        
    };
}

module.exports = function (name) {
    return new SkillNode(name);
}
