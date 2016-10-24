function Attribute() {
    var data = {};

    function total() {
        var sum = 0;
        Object.keys(data).forEach(function (name) {
            sum += data[name]();
        });
        return sum;
    }
    function set(name, getter) {
        data[name] = getter;
    }
    function get(name) {
        return data[name]
    }
    function remove(name) {
        delete data[name];
    }
}

function instantiate() {
    return new Attribute();
}

module.exports = instantiate;
