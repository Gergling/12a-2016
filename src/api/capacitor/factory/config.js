function Capacitor() {
    var data = {
        maximum: 1,
        current: 0,
        can: {
            overflow: false,
            underflow: false
        },
        attribute: require('../../attribute/factory')()
    };

    function current(value, setMode) {
        if (value) {
            if (setMode) {
                // Current value is being set rather than changed.
                data.current = value;
            } else {
                data.current += value;
            }
            // Run on-change events
            // If below 0, run on-underflow event.
            // If above maximum, run on-overflow event.
            if (data.current < 0) {
                if (data.can.underflow === false) {
                    data.current = 0;
                }
                // Run on-underflow
            }
            if (data.current > maximum()) {
                if (data.can.overflow === false) {
                    data.current = maximum();
                }
                // Run on-overflow
            }
        }
        return data.current;
    }

    function attribute() {
        return data.attribute;
    }
    
    function maximum() {
        return data.maximum + attribute().total();
    }

    // Expose functions as we need them
}
