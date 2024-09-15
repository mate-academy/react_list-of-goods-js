import cn from 'classnames';

export const SortingButtons = ({ sortGoods, sortType, revSort, resetSort }) => (
  <div className="buttons">
    <button
      type="button"
      className={cn('button', 'is-info', {
        'is-light': sortType.type !== 'alphabet',
      })}
      onClick={() => sortGoods('alphabet')}
    >
      Sort alphabetically
    </button>

    <button
      type="button"
      className={cn('button', 'is-success', {
        'is-light': sortType.type !== 'length',
      })}
      onClick={() => sortGoods('length')}
    >
      Sort by length
    </button>

    <button
      type="button"
      className={cn('button', 'is-warning', {
        'is-light': sortType.direction === 'straight',
      })}
      onClick={revSort}
    >
      Reverse
    </button>
    {(sortType.type !== '' || sortType.direction !== 'straight') && (
      <button
        type="button"
        className="button is-danger is-light"
        onClick={resetSort}
      >
        Reset
      </button>
    )}
  </div>
);
