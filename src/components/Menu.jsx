export default function Menu({ children, open, menuID }) {
  return (
    <>
      {open && (
        <div className="popup">
          {children}
        </div>
      )}
    </>
  );
}