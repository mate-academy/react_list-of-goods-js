export function Button({ title, onClick, sx = '' }) {
  return (
    <button type="button" className={`button ${sx}`} onClick={onClick}>
      {title}
    </button>
  );
}
