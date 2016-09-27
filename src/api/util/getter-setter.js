function getterSetter(scope, props, options) {
    Object.keys(props).forEach(function (prop) {
        scope[prop] = (options.nosetter || []).indexOf(prop) > -1 || options.nosetters
        ? function (value) {
            if (value !== undefined) {
                props[prop] = value;
            }
            return props[prop];
        } || function () {
            return props[prop];
        }
    });

    return props;
}

module.exports = getterSetter;
