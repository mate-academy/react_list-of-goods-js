import { useState, useMemo } from 'react';
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

export const App = () => {
  const [sortType, setSortType] = useState(null); // 'alpha' | 'length' | null
  const [isReversed, setIsReversed] = useState(false);

  // Derived goods based on sort + reverse
  const goods = useMemo(() => {
    let result = [...goodsFromServer];

    if (sortType === 'alpha') {
      result.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'length') {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [sortType, isReversed]);

  const sortAlphabetically = () => {
    setSortType('alpha');
    setIsReversed(false); // Start in forward order
  };

  const sortByLength = () => {
    setSortType('length');
    setIsReversed(false);
  };

  const reverseOrder = () => {
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setSortType(null);
    setIsReversed(false);
  };

  const isOriginalOrder =
    sortType === null && isReversed === false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alpha' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
