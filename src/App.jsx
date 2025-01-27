import 'bulma/css/bulma.css';
import './App.scss';
import { useMemo, useState } from 'react';

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
const SORT = {
  default: '',
  alphabetically: 'alphabetically',
  length: 'length',
  reverse: 'reverse',
  reset: 'reset',
};

export const App = () => {
  const [sort, setSort] = useState(SORT.default);
  const [isReversed, setIsReversed] = useState(false);

  const data = useMemo(() => {
    let sortedGoods = [...goodsFromServer];

    switch (sort) {
      case SORT.alphabetically:
        sortedGoods.sort();
        break;

      case SORT.length:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;

      case SORT.reset:
        sortedGoods = [...goodsFromServer];
        break;

      default:
        break;
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }, [sort, isReversed]);

  const handleSort = sortType => {
    if (sort === sortType) {
      setIsReversed(!isReversed);
    } else {
      setSort(sortType);
      setIsReversed(false);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sort === SORT.alphabetically && !isReversed ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sort === SORT.length && !isReversed ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {sort !== SORT.default && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSort(SORT.default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {data.map(g => (
          <li data-cy="Good" key={g}>
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
};
