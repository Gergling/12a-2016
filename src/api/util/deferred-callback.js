function generate(deferred, modelName) {
    return function callback(err, model) {
        if (err) {
            deferred.reject(modelName + ': ' + err);
        } else {
            deferred.resolve(model);
        }
    };
}

module.exports = generate;
