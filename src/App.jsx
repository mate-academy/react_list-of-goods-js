import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
  const [goods, setGoods] = useState(goodsFromServer);
  const [currentSort, setSort] = useState(null);
  const [revers, setReverse] = useState(null);

  const SORT_ABC = 'abc';
  const SORT_LENGTH = 'length';
  const SORT_RESET = 'reset';

  const sortBy = (sortType) => {
    setSort(sortType);

    switch (sortType) {
      case SORT_ABC:
        if (revers) {
          setGoods([...goods].sort().reverse());
        } else {
          setGoods([...goods].sort());
        }

        break;
      case SORT_LENGTH:
        if (revers) {
          setGoods([...goods].sort((a, b) => b.length - a.length));
        } else {
          setGoods([...goods].sort((a, b) => a.length - b.length));
        }

        break;
      case SORT_RESET:
        setGoods(goodsFromServer);
        setSort(null);
        setReverse(null);
        break;
      default: return 'unknown sort type';
    }

    return true;
  };

  function reverseArr() {
    if (revers) {
      if (currentSort) {
        setGoods([...goods].reverse());
      } else {
        setGoods(goodsFromServer);
      }

      setReverse(null);
    } else {
      setGoods([...goods].reverse());
      setReverse(true);
    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => sortBy(SORT_ABC)}
          type="button"
          className={cn(
            'button', 'is-info', { 'is-light': currentSort !== SORT_ABC },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => sortBy(SORT_LENGTH)}
          type="button"
          className={cn(
            'button', 'is-success', { 'is-light': currentSort !== SORT_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => reverseArr()}
          type="button"
          className={cn(
            'button', 'is-warning',
            { 'is-light': !revers },
          )}
        >
          Reverse
        </button>

        {goods !== goodsFromServer ? (
          <button
            onClick={() => (sortBy(SORT_RESET))}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null
        }
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))
        }
      </ul>
    </div>
  );
};
