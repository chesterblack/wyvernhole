import { useContext } from "react";
import Button from "./Button";
import Tab from "./Tab";
import GlobalContext from "@/globalContext";

export default function CloseButton({ children, variant = null, position = 'right' }) {
  const { setOpenMenu } = useContext(GlobalContext);

  switch (variant) {
    case 'tab':
      return (
        <Tab
          onClick={() => {
            setOpenMenu(null);
          }}
          classes={position}
        >
          {children || 'X'}
        </Tab>
      );
      break;

    case 'button':
    default:
      return (
        <Button onClick={() => {
          setOpenMenu(null);
        }}>
          {children || "Close"}
        </Button>
      );
      break;
  }
}