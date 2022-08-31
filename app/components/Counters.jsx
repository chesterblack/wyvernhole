export default function Counters() {
    let gold = 0;
    let drunkenness = 0;
    let attack = 0;
    let defence = 0;

    return (
        <div className="counters">
            <Counter
                id='money-counter'
                label='Money'
                className='gold'
                score={gold}
            />
            <HealthCounter />
            <Counter
                id='drunkenness-counter'
                label='Drunkenness'
                className='drunkenness'
                score={drunkenness}
            />
            <Counter
                id='attack-counter'
                label='Attack'
                className='attack'
                score={attack}
            />
            <Counter
                id='defence-counter'
                label='Defence'
                className='defence'
                score={defence}
            />
        </div>
    );
}

function Counter(props) {
    return (
        <div id={props.id}>
            {props.label}:
            <span className={props.className}>
                {props.score}
            </span>
        </div>
    )
}

function HealthCounter() {
    let health = 100;
    let maxHealth = 100;

    return (
        <div id='health-counter'>
            Health: <span className='health'>{health}</span>/<span className={maxHealth > 100 ? 'overhealth' : 'health'}>{maxHealth}</span>
        </div>
    )
}