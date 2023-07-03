import 'bulma/css/bulma.css';
import cn from 'classnames';

export const SortPanel = ({ sortPanelData: {
  SORT_FIELD,
  sortField,
  isReverse,
  setSortField,
  setIsReverse,
} }) => {
  const isShowResetButton = sortField || isReverse;

  const reset = () => {
    setSortField(SORT_FIELD.DEFAULT);
    setIsReverse(false);
  };

  const toggleReverse = () => {
    setIsReverse(prev => !prev);
  };

  const handleAlphabetSort = () => {
    setSortField(SORT_FIELD.ALPHABET);
  };

  const handleLengthSort = () => {
    setSortField(SORT_FIELD.LENGTH);
  };

  return (
    <div className="buttons">
      <button
        onClick={handleAlphabetSort}
        type="button"
        className={cn('button', 'is-info', {
          'is-light': sortField !== SORT_FIELD.ALPHABET,
        })}
      >
        Sort alphabetically
      </button>

      <button
        onClick={handleLengthSort}
        type="button"
        className={cn('button', 'is-success', {
          'is-light': sortField !== SORT_FIELD.LENGTH,
        })}
      >
        Sort by length
      </button>

      <button
        onClick={toggleReverse}
        type="button"
        className={cn('button', 'is-warning', {
          'is-light': !isReverse,
        })}
      >
        Reverse
      </button>

      {isShowResetButton && (
        <button
          onClick={reset}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      )}
    </div>
  );
};
