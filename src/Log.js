export default function Log({logs}) {
    return (
        <div className="horizontal-center">
            <ul>
                {
                    logs.map(log => (<li>{log}</li>))
                }
            </ul>
        </div>
    )
}