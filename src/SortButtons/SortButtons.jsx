export const SortType = {
  None: '',
  Alphabetically: 'alphabetically',
  ByLength: 'by length',
};

export const SortButtons = ({
  sortType,
  isReversed,
  onSort,
  onReverse,
  onReset,
}) => {
  const isChanged = sortType !== SortType.None || isReversed;

  return (
    <div className="buttons">
      <button
        type="button"
        className={`button is-info ${sortType !== SortType.Alphabetically ? 'is-light' : ''}`}
        onClick={() => onSort(SortType.Alphabetically)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={`button is-success ${sortType !== SortType.ByLength ? 'is-light' : ''}`}
        onClick={() => onSort(SortType.ByLength)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        onClick={onReverse}
      >
        Reverse
      </button>

      {isChanged && (
        <button type="button" className="button is-danger" onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
};
