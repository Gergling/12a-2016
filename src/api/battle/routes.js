module.exports = function (api) {
    api.get('/battle', function (req, res) {
        res.send({
            map: {},
            sprites: []
        });
    });
};
