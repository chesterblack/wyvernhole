export default function Tab({ children, onClick, classes }) {
  return (
    <button
      className={`tab ${classes}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}