import classNames from 'classnames';
import { SORT_FIELD } from '../constants';

export const Buttons = (props) => {
  const {
    sortField,
    sortBy,
    isReversed,
    changeOrder,
  } = props;

  const resetGoodsHandler = () => {
    sortBy('');
    changeOrder(false);
  };

  return (
    <div className="buttons">
      <button
        type="button"
        onClick={() => sortBy(SORT_FIELD.ALPHABET)}
        className={classNames('button', 'is-info', {
          'is-light': sortField !== SORT_FIELD.ALPHABET,
        })}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        onClick={() => sortBy(SORT_FIELD.LENGTH)}
        className={classNames('button', 'is-success', {
          'is-light': sortField !== SORT_FIELD.LENGTH,
        })}
      >
        Sort by length
      </button>

      <button
        type="button"
        onClick={() => changeOrder(prev => !prev)}
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
