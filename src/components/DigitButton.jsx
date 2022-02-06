import { ACTIONS } from "../App";

export default function DigitButton({ dispatch, digit}) {
    const action = { type: ACTIONS.ADD_DIGIT, payload: { digit }};
    
    return (
        <button onClick={() => dispatch(action)}>{digit}</button>
    )
}