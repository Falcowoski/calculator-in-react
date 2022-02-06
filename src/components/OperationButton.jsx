export default function OperationButton({ chooseOperation, operation}) {
    return (
        <button onClick={() => chooseOperation(operation)}>{operation}</button>
    )
}