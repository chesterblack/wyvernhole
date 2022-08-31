import { useState } from 'react';
import { SaveWrapper } from '../contexts/save-context';

import Button, { CloseButton } from './Buttons';
import OptionsMenu from './Options';

export default function MenuSidebar() {
  return (
    <div className="menu-wrapper">
      <SaveWrapper>
        <MenuItem key="inventory-menu-item" id="inventory" label="Inventory" />
        <MenuItem key="quests-menu-item" id="quests" label="Quests" />
        <MenuItem
          key="options-menu-item"
          id="options"
          label="Options"
          inner={<OptionsMenu />}
        />
      </SaveWrapper>
    </div>
  );
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
  );
}

function Menu(props) {
  let className = props.open ? 'menu' : 'menu closed';

  return (
    <div id={`${props.id}-menu`} className={className}>
      <div className="menu-top">
        <h3>{props.label}</h3>
        <CloseButton
          onClick={() => {
            props.setOpen(!props.open);
          }}
        />
      </div>
      {props.inner}
    </div>
  );
}
