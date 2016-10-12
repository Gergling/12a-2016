// Sprites:
// At the centre is the spaceship
// Spaceship might spawn scanning drones
// Space may contain mysteries, which can be studied until they turn into something else.

// Capacitors:
// Interest: When you run out of interest, you can no longer scan.
// Processing power: Used on all tool-based abilities.

// This quest is spawned so that the observer can find something.
// This might be to track or to buff for navigation or other reason.
// Need to come up with cases why astronomy is happening.

module.exports = {
    sprites: [
        'observer', // The number of these available depends on ship hardware.
        // All observers have a shared interest capacitor.
        'mystery', // Must be configured to spawn something specific on death
    ]
};
