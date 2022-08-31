import Button, { CloseButton, AutosaveToggle } from './Buttons';
import { useState } from 'react';
import { SaveWrapper, useSaveContext } from '../contexts/save-context';
import { useStatsContext } from '../contexts/stats-context';
import { pingUpdateMessage } from '../functions/main';

export default function MenuSidebar() {
    return (
        <div className='menu-wrapper'>
            <SaveWrapper>
                <MenuItem
                    key='inventory-menu-item'
                    id='inventory'
                    label='Inventory'
                />
                <MenuItem
                    key='quests-menu-item'
                    id='quests'
                    label='Quests'
                />
                <MenuItem
                    key='options-menu-item'
                    id='options'
                    label='Options'
                    inner={<OptionsMenu />}
                />
            </SaveWrapper>
        </div>
    );
}

function OptionsMenu(props) {
    return (
        <>
            <TextSpeed />
            <SaveGame />
            <LoadGame />
            {/* <Button label='New Game' onClick={() => {
                console.log('new game!');
            }} /> */}
            <AutosaveToggle />
        </>
    )
}

function TextSpeed() {
    const { textSpeed, setTextSpeed } = useSaveContext();

    return (
        <div>
            Text Speed:
            <input
                type='number'
                id='text-speed'
                defaultValue={textSpeed}
                onChange={(e) => {
                    setTextSpeed(e.target.value);
                }}
            />
        </div>
    );
}

function SaveGame() {
    const { saveCode } = useSaveContext();

    return (
        <div>
            Save game:
            <input id='save-game' type='text' readOnly={true} value={saveCode} />
            <Button label='Copy' onClick={(e) => {
                navigator.clipboard.writeText(saveCode);
                pingUpdateMessage(
                    e.target,
                    'Copied to clipboard'
                );
            }} />
        </div>
    )
}

function LoadGame() {
    const { statsChangeHandler } = useStatsContext();
    const { saveGame } = useSaveContext();

    function loadGame(code) {
        let decodedOptions = JSON.parse(atob(code));
        const { h, mh, g, d } = decodedOptions;
        const stats = {
            health: h,
            maxHealth: mh,
            gold: g,
            drunkenness: d,
        };
        
        for (const key in stats) {
            const value = stats[key];
            statsChangeHandler(key, value);
        }

        saveGame();
    }

    return (
        <div>
            Load game:
            <input id='load-game' type='text' />
            <Button label='Load' onClick={() => {
                let loadCode = document.querySelector('#load-game').value;
                loadGame(loadCode);
            }} />
        </div>
    )
}

function MenuItem(props) {
    let [open, setOpen] = useState(false);

    return (
        <div>
            <Button
                key={`btn-${props.id}`}
                onClick={() => {
                    setOpen(!open);
                }}
                label={props.label}
            />
            <Menu
                key={`menu-${props.id}`}
                label={props.label}
                id={props.id}
                open={open}
                setOpen={setOpen}
                inner={props.inner}
            />
        </div>
    )
}

function Menu(props) {
    let className = props.open ? 'menu' : 'menu closed';

    return (
        <div id={`${props.id}-menu`} className={className}>
            <div className='menu-top'>
                <h3>{props.label}</h3>
                <CloseButton onClick={() => {
                    props.setOpen(!props.open);
                }} />
            </div>
            {props.inner}
        </div>
    )
}