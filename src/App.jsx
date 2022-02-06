import { useReducer } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";
import "./App.css";

// REDUCER ACTIONS
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
};

export default function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

  {/* ACTIONS */}
  const clear = { type: ACTIONS.CLEAR };
  const deleteDigit = { type: ACTIONS.DELETE_DIGIT };
  const evaluate = { type: ACTIONS.EVALUATE };

  return (
    <div className="calculator-grid">

      {/* ROW 1 */}
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>

      {/* ROW 2 */}
      <button className="span-two" onClick={() => dispatch(clear)}>AC</button>
      <button onClick={() => dispatch(deleteDigit)}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch}></OperationButton>

      {/* ROW 3 */}
      <DigitButton digit="1" dispatch={dispatch}></DigitButton>
      <DigitButton digit="2" dispatch={dispatch}></DigitButton>
      <DigitButton digit="3" dispatch={dispatch}></DigitButton>
      <OperationButton operation="*" dispatch={dispatch}></OperationButton>

      {/* ROW 4 */}
      <DigitButton digit="4" dispatch={dispatch}></DigitButton>
      <DigitButton digit="5" dispatch={dispatch}></DigitButton>
      <DigitButton digit="6" dispatch={dispatch}></DigitButton>
      <OperationButton operation="+" dispatch={dispatch}></OperationButton>

      {/* ROW 5 */}
      <DigitButton digit="7" dispatch={dispatch}></DigitButton>
      <DigitButton digit="8" dispatch={dispatch}></DigitButton>
      <DigitButton digit="9" dispatch={dispatch}></DigitButton>
      <OperationButton operation="-" dispatch={dispatch}></OperationButton>

      {/* ROW 6 */}
      <DigitButton digit="." dispatch={dispatch}></DigitButton>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>
      <button className="span-two" onClick={() => dispatch(evaluate)}>=</button>

    </div>
  )
};

// REDUCER
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return addDigitReducer(state, payload.digit);
    case ACTIONS.CHOOSE_OPERATION:
      return chooseOperationReducer(state, payload.operation);
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      return deleteDigitReducer(state);
    case ACTIONS.EVALUATE:
      return evaluateReducer(state);
    default:
      return state;
  }
};

// REDUCER - ACTION
function addDigitReducer(state, digit) {
  if (digit === "0" && state.currentOperand === "0") 
    return state;
  if (digit === "." && state.currentOperand.includes(".")) 
    return state;

  if (state.overwrite)
    return { ...state, currentOperand: digit, overwrite: false };

  const currentOperand = state.currentOperand ?? "";

  return { ...state, currentOperand: currentOperand + digit };
};

// REDUCER - ACTION
function chooseOperationReducer(state, operation) {
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
    previousOperand: evaluate(state),
    operation: operation,
    currentOperand: null
  };
};

// REDUCER - ACTION
function deleteDigitReducer(state) {
  if (state.overwrite)
    return { ...state, overwrite: false, currentOperand: null };

  if (state.currentOperand == null) 
    return state;

  if (state.currentOperand.length === 1)
    return { ...state,  currentOperand: null };

  return { ...state, currentOperand: state.currentOperand.slice(0, -1) }
};

// REDUCER - ACTION
function evaluateReducer(state) {
  if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
    return state;
  };

  return {
    ...state,
    overwrite: true,
    previousOperand: null,
    operation: null,
    currentOperand: evaluate(state)
  };
};

// EVALUATE 
function evaluate({ currentOperand, previousOperand, operation }) {
  const current = parseFloat(currentOperand);
  const previous = parseFloat(previousOperand);

  if (isNaN(previous) || isNaN(current))
    return "";

  switch (operation) {
    case "+":
      return (previous + current).toString();
    case "-":
      return (previous - current).toString();
    case "*":
      return (previous * current).toString();
    case "÷":
      return (previous / current).toString();
    default:
      return "";
  }
}

// NUMBER MASK
function formatOperand(operand) {
  if (operand == null) 
    return;
  
  const [integer, decimal] = operand.split(".");

  if (decimal == null) 
    return INTEGER_FORMATTER.format(integer);

  return INTEGER_FORMATTER.format(integer) + "." + decimal;
}
// NUMBER MASK - FORMATTER
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0
})