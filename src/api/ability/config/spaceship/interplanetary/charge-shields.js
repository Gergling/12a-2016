module.exports = {
    label: 'Charge Shields',
    cost: {
        // This needs to calculate in all related skills and equipment.
        // Energy reduction calculations in terms of skills are a problem.
        // Maybe energy cost should be static and shield recharge should be determined by skill level.
        energy: {
            skill: {
                'science.technology.engineering.defenses.shields': '-'
            },
            // Will have to name various bits of equipment.
            equipment: 'defense.shield'
        }
    },
    effect: function (tile, targets) {
        // Effect is simply to charge the shield based on the skills of the operator.
        var skills = [
            'science.technology.engineering.defenses.shields',
        ].map(function (name) {
            return tile.sprite().skill(name);
        });

        // Increase to shields requires a skill, buff and equipment bonus.
        tile.sprite().capacitor('shield').delta(skill([
            ''
        ]));
    }
};
