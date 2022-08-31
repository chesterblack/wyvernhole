export default function Button(props) {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.label}
        </button>
    )
}

export function CloseButton(props) {
    return (
        <button onClick={props.onClick}>
            {props.inner ?? 'Close'}
        </button>
    )
}