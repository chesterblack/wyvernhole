export default function Menu({ children, open }) {
  return (
    <>
      {open && (
        children
      )}
    </>
  );
}