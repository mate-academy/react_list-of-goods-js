import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

function getPreparedGoods(goods, sortField, isReversed) {
  const goodsCopy = [...goods];

  goodsCopy.sort((a, b) => {
    switch (sortField) {
      case SORT_ALPHABETICALLY:
        return a.localeCompare(b);

      case SORT_BY_LENGTH:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

export const App = () => {
  const [sortGoods, setSortGoods] = useState('');
  const [isReversed, setReversed] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, sortGoods, isReversed);

  const reset = () => {
    if (isReversed) {
      setReversed(!isReversed);
    }

    setSortGoods('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortGoods !== SORT_ALPHABETICALLY },
          )}
          onClick={() => {
            setSortGoods(SORT_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortGoods !== SORT_BY_LENGTH },
          )}
          onClick={() => {
            setSortGoods(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => {
            setReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortGoods.length > 0 || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
