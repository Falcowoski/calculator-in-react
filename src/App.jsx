import { useReducer } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";
import "./App.css";

import A from "./constants/ActionsType.js";
import I from "./constants/IntegerFormatter.js";
import R from "./constants/Reducers.js";

export default function App() {
  const initialState = {
    previousOperand: null,
    operation: null,
    currentOperand: null,
    overwrite: false
  };

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, initialState);
  const actions = mapDispatch(dispatch);

  return (
    <div className="calculator-grid">

      {/* ROW 1 */}
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>

      {/* ROW 2 */}
      <button className="span-two" onClick={actions.clear}>AC</button>
      <button onClick={actions.deleteDigit}>DEL</button>
      <OperationButton operation="÷" chooseOperation={actions.chooseOperation}></OperationButton>

      {/* ROW 3 */}
      <DigitButton digit="1" addDigit={actions.addDigit}></DigitButton>
      <DigitButton digit="2" addDigit={actions.addDigit}></DigitButton>
      <DigitButton digit="3" addDigit={actions.addDigit}></DigitButton>
      <OperationButton operation="*" chooseOperation={actions.chooseOperation}></OperationButton>

      {/* ROW 4 */}
      <DigitButton digit="4" addDigit={actions.addDigit}></DigitButton>
      <DigitButton digit="5" addDigit={actions.addDigit}></DigitButton>
      <DigitButton digit="6" addDigit={actions.addDigit}></DigitButton>
      <OperationButton operation="+" chooseOperation={actions.chooseOperation}></OperationButton>

      {/* ROW 5 */}
      <DigitButton digit="7" addDigit={actions.addDigit}></DigitButton>
      <DigitButton digit="8" addDigit={actions.addDigit}></DigitButton>
      <DigitButton digit="9" addDigit={actions.addDigit}></DigitButton>
      <OperationButton operation="-" chooseOperation={actions.chooseOperation}></OperationButton>

      {/* ROW 6 */}
      <DigitButton digit="." addDigit={actions.addDigit}></DigitButton>
      <DigitButton digit="0" addDigit={actions.addDigit}></DigitButton>
      <button className="span-two" onClick={actions.evaluate}>=</button>
      
    </div>
  )
};

const mapDispatch = (dispatch) => ({
  addDigit: (digit) => dispatch({ type: A.ADD_DIGIT, payload: { digit }}),
  chooseOperation: (operation) => dispatch({ type: A.CHOOSE_OPERATION, payload: { operation }}),
  clear: () => dispatch({ type: A.CLEAR }),
  deleteDigit: () => dispatch({ type: A.DELETE_DIGIT }),
  evaluate: () => dispatch({ type: A.EVALUATE })
});

function reducer(state, { type, payload }) {
  switch (type) {
    case A.ADD_DIGIT:
      return R.addDigit(state, payload.digit);
    case A.CHOOSE_OPERATION:
      return R.chooseOperation(state, payload.operation, evaluateFunction);
    case A.CLEAR:
      return {};
    case A.DELETE_DIGIT:
      return R.deleteDigit(state);
    case A.EVALUATE:
      return R.evaluate(state, evaluateFunction);
    default:
      return state;
  }
};

function evaluateFunction({ currentOperand, previousOperand, operation }) {
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
};

function formatOperand(operand) {
  if (operand == null) 
    return;
  
  const [integer, decimal] = operand.split(".");

  if (decimal == null) 
    return I.format(integer);

  return I.format(integer) + "." + decimal;
};