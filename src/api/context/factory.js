function Context() {
    var data = {
        scale: '',
        map: '',
        name: ''
    }

    Object.keys(data).forEach(function (prop) {
        this[prop] = function (value) {
            if (value !== undefined) {
                data[prop] = value;
            }
            return data[prop];
        }
    }.bind(this));
}

function instantiate(obj) {
    var context = new Context();
    Object.keys(obj || {}).forEach(function (prop) {
        context[prop](obj[prop]);
    });
    return context;
}

module.exports = instantiate;
