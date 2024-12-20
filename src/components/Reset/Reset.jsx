export const Reset = ({
  sortedField,
  reversed,
  setReversed,
  setSortedField,
}) => {
  function getReset(setRev, setSortField) {
    setRev(false);
    setSortField('');
  }

  if (reversed || sortedField) {
    return (
      <button
        onClick={() => getReset(setReversed, setSortedField)}
        type="button"
        className="button is-danger is-light"
      >
        Reset
      </button>
    );
  }

  return null;
};
