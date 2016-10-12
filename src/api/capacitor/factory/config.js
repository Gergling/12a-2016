function Capacitor() {
    var data = {
        maximum: 1,
        current: 0,
        can: {
            overflow: false,
            underflow: false
        }
    };

    function current(value, setMode) {
        if (value) {
            if (setMode) {
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
            if (data.current > data.maximum) {
                if (data.can.overflow === false) {
                    data.current = data.maximum;
                }
                // Run on-overflow
            }
        }
        return data.current;
    }
    // Expose functions as we need them
}
