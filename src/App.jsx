import { useState } from 'react';
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

const SORT_FIELD_ABC = 'abc';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);

  const sortByABC = () => {
    if (isReversed) {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good2.localeCompare(good1)),
      );
    } else {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)),
      );
    }

    setSortField(SORT_FIELD_ABC);
  };

  const sortByLenght = () => {
    if (isReversed) {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good2.length - good1.length),
      );
    } else {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good1.length - good2.length),
      );
    }

    setSortField(SORT_FIELD_LENGTH);
  };

  const reverse = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByABC}
          type="button"
          className={sortField === SORT_FIELD_ABC
            ? 'button is-info'
            : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLenght}
          type="button"
          className={sortField === SORT_FIELD_LENGTH
            ? 'button is-success'
            : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
