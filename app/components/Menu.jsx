import Button, { CloseButton, AutosaveToggle } from './Buttons';
import { useState } from 'react';

export default function MenuSidebar() {
    return (
        <div className='menu-wrapper'>
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
        </div>
    );
}

function OptionsMenu(props) {
    return (
        <>
            <div>
                Text Speed: <input type='number' id='text-speed' defaultValue='10' />
            </div>
            <div>
                Save game: <input id='save-game' type='text'></input>
                <Button label='Copy' onClick={() => {
                    console.log('save!');
                }} />
            </div>
            <div>
                Load game: <input id='load-game' type='text'></input>
                <Button label='Load' onClick={() => {
                    console.log('load!');
                }} />
            </div>
            <Button label='New Game' onClick={() => {
                console.log('new game!');
            }} />
            <AutosaveToggle />
        </>
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