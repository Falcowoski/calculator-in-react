import { ACTIONS } from "../App";

export default function OperationButton({ dispatch, operation}) {
    const action = { type: ACTIONS.CHOOSE_OPERATION, payload: { operation }};
    
    return (
        <button onClick={() => dispatch(action)}>{operation}</button>
    )
}