// Todo:
// For one thing, think about whether this will have a config/db split.
// This should go through 3 phases: proposing the change (propose()),
    // checking the validity (valid()), and attempting the change (run()).
// If the capacitor is setup to allow the change, or has sufficient current vs capacity to make the change, it runs.
// If not, it doesn't.
// Find whether this overflows the boundaries with overflow()
// Reset the proposal with reset()
// Allow the capacitor to contain the change with contain('none|both(default)|maximum|minimum')

function Capacitor() {
    var data = {
        maximum: 1,
        current: 0,
        allowed: {
            overflow: false,
            underflow: false
        },
        proposal: 0,
        attribute: require('../../attribute/factory')()
    };
    
    function propose(value) {
        data.proposal = value;
        return this;
    }
    function reset() {
        data.proposal = 0;
        return this;
    }
    function delta() {
        return data.current + data.proposal;
    }
    function underflow() {
        return delta() < 0;
    }
    function overflow() {
        return delta() > data.maximum;
    }
    // Todo: DRY up.
    function valid() {
        return (underflow() && data.allowed.underflow) || (overflow() && data.allowed.overflow);
    }
    function run() {
        data.current = delta();
        reset();
        if (underflow() && !data.allowed.underflow) {
            data.current = 0;
        }
        if (overflow() && !data.allowed.overflow) {
            data.current = data.maximum;
        }
        return this;
    }
    
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
