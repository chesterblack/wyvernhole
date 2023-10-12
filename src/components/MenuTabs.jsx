import GlobalContext from "@/globalContext";
import { useContext } from "react";
import Tab from "./Tab";

export default function MenuTabs({}) {
  const { menus, openMenu, setOpenMenu } = useContext(GlobalContext);

  return (
    <div className="menu-tabs">
      {menus.map((menu) => {
        return (
          <Tab
            key={menu.id}
            classes={openMenu === menu.id ? 'active' : ''}
            onClick={() => {
              setOpenMenu(menu.id)
            }}
          >
            {menu.label}
          </Tab>
        )
      })}
    </div>
  );
}