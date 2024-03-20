import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { useState } from 'react';

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

export const App = () => {
  const [sortBy, setSortBy] = useState(null);
  const [isReverseSort, setIsReverseSort] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, sortBy);

  function getPreparedGoods(currentGoods, sortType, isReverse) {
    const visibleGoods = [...currentGoods];

    if (sortType) {
      visibleGoods.sort((good1, good2) => {
        switch (sortType) {
          case 'alphabetically':
            return good1.localeCompare(good2);
          case 'length':
            return good1.length - good2.length;
          default:
            return 0;
        }
      });
    }

    if (isReverse) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortBy('alphabetically');
            getPreparedGoods(goods, sortBy, isReverseSort);
          }}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== 'alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortBy('length');
            getPreparedGoods(goods, sortBy, isReverseSort);
          }}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReverseSort(!isReverseSort);
            getPreparedGoods(goods, sortBy, isReverseSort);
          }}
          type="button"
          className={classNames('button is-warning', {
            'is-light': isReverseSort !== true,
          })}
        >
          Reverse
        </button>

        {(sortBy || isReverseSort) && (
          <button
            onClick={() => {
              setSortBy(null);
              setIsReverseSort(false);
              getPreparedGoods(goods, sortBy, true);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
