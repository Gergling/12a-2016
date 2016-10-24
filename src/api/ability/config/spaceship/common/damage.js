module.exports = {
    start: function () {
        // Damage can have side-effects like reducing engine maximum or current.
        // Defense current will be reduced.
        // More side-effects will happen based on skill level.
        // If defenses are at 0, payload will be shared across fewer capacitors.
        // Order of priority for hitting the capacitors depends on the type of damage.
        // Laser damage will almost bypass the plasma shields, but not the prismatic armour.
    }
};
