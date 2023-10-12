import { useContext } from "react";
import Button from "./Button";
import GlobalContext from "@/globalContext";

export default function MenuButton({ id, label }) {
  const { openMenu, setOpenMenu } = useContext(GlobalContext);

  return (
    <Button
      onClick={() => {
        toggleMenu( openMenu, setOpenMenu, id );
      }}
      classes={openMenu === id ? 'pressed' : ''}
    >
      {label}
    </Button>
  )
}

function toggleMenu( openMenu, setOpenMenu, menu ) {
  if (openMenu === menu) {
    setOpenMenu(null);
  } else {
    setOpenMenu(menu)
  }
}