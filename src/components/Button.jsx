export default function Button({ children, onClick, classes }) {
  return (
    <button
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}