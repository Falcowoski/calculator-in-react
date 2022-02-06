export default function DigitButton({ addDigit, digit}) {
    return (
        <button onClick={() => addDigit(digit)}>{digit}</button>
    )
}