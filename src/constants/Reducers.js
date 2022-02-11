const Reducers = {
    addDigit: (state, digit) => {
        const currentOperand = state.currentOperand ?? "";
        
        if (digit === "0" && currentOperand === "0")
            return state;
    
        if (digit === "." && currentOperand.includes(".")) 
            return state;
        
        if (state.overwrite)
            return { ...state, currentOperand: digit, overwrite: false };

        return { ...state, currentOperand: currentOperand + digit };
    },
    chooseOperation: (state, operation, evaluateFunction) => {
        if (state.currentOperand == null && state.previousOperand == null)
            return state;

        if (state.currentOperand == null)
            return { ...state, operation: operation }

        if (state.previousOperand == null) {
            return {
                ...state,
                operation: operation,
                previousOperand: state.currentOperand,
                currentOperand: null
            };
        };

        return {
            ...state,
            previousOperand: evaluateFunction(state),
            operation: operation,
            currentOperand: null
        };
    },
    deleteDigit: (state) => {
        if (state.overwrite)
            return { ...state, overwrite: false, currentOperand: null };

        if (state.currentOperand == null)
            return state;

        if (state.currentOperand.length === 1)
            return { ...state, currentOperand: null };

        return { ...state, currentOperand: state.currentOperand.slice(0, -1) }
    },
    evaluate: (state, evaluateFunction) => {
        if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
            return state;
        };

        return {
            ...state,
            overwrite: true,
            previousOperand: null,
            operation: null,
            currentOperand: evaluateFunction(state)
        };
    }
}

export default Reducers;
