import GlobalContext from "@/globalContext";
import { useContext } from "react";

export default function Menu({ children, menuID }) {
  const { openMenu } = useContext(GlobalContext);

  return (
    <>
      {openMenu === menuID && (
        <div className="popup">
          {children}
        </div>
      )}
    </>
  );
}