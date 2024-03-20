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
  const [goods, setGoods] = useState([...goodsFromServer]);

  function doSort(sortType, goodsSort, isReverse) {
    if (isReverse) {
      setIsReverseSort(!isReverseSort);
      setGoods(goods.reverse());
    } else {
      setSortBy(sortType);
      setGoods(goodsSort);

      if (isReverseSort) {
        setGoods(goods.reverse());
      }
    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            doSort(
              'alphabetically',
              [...goodsFromServer].sort((a, b) => a.localeCompare(b)),
            );
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
            doSort(
              'length',
              [...goodsFromServer].sort((a, b) => a.length - b.length),
            );
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
            doSort(null, null, true);
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
              setGoods([...goodsFromServer]);
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
