import Button from "./Buttons";
import { toggleMenu } from "../functions/menu";

export default function MenuSidebar() {
    return (
        <div className='menu-wrapper'>
            <div className='buttons'>
                <Button
                    key='btn-options'
                    onClick={
                        () => {toggleMenu('options')}
                    }
                    label='Options'
                />
                <Button
                    key='btn-inventory'
                    onClick={
                        () => {toggleMenu('inventory-menu')}
                    }
                    label='Inventory'
                />
                <Button
                    key='btn-quests'
                    onClick={
                        () => {toggleMenu('quest-menu')}
                    }
                    label='Quests'
                />
            </div>
            <div className='menus'></div>
        </div>
    );
}