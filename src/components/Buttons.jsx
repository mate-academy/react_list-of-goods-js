import classNames from 'classnames';

export const Buttons = ({ sortOptions }) => {
  const {
    sortField,
    setSortField,
    isReversed,
    setIsReversed,
    SORT_FIELD_ALPHABET,
    SORT_FIELD_LENGTH,
  } = sortOptions;

  const resetGoodsHandler = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="buttons">
      <button
        type="button"
        onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        className={classNames('button', 'is-info', {
          'is-light': sortField !== SORT_FIELD_ALPHABET,
        })}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        onClick={() => setSortField(SORT_FIELD_LENGTH)}
        className={classNames('button', 'is-success', {
          'is-light': sortField !== SORT_FIELD_LENGTH,
        })}
      >
        Sort by length
      </button>

      <button
        type="button"
        onClick={() => setIsReversed(prev => !prev)}
        className={classNames('button', 'is-warning', {
          'is-light': !isReversed,
        })}
      >
        Reverse
      </button>

      {(sortField || isReversed) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={resetGoodsHandler}
        >
          Reset
        </button>
      )}
    </div>
  );
};
