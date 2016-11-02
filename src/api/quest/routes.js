module.exports = function (api) {
    api.get('/quests/', function (req, res) {
        res.send([
            {
                label: ''
            }
        ]);
    });
};
