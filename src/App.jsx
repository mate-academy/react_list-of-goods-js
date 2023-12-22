import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const SORT_REVERSED = 'reversed';

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortBy, setSortBy] = useState('');
  const [reversed, setReversed] = useState(false);

  function sortGoods(type) {
    switch (type) {
      case SORT_BY_LENGTH: {
        setSortBy(SORT_BY_LENGTH);
        const sortedGoods = [...goodsFromServer].sort(
          (g1, g2) => g1.length - g2.length,
        );

        if (reversed) {
          const reverseSortedGoods = sortedGoods.reverse();

          setGoods(reverseSortedGoods);
        } else {
          setSortBy(SORT_BY_LENGTH);
          setGoods(sortedGoods);
        }

        break;
      }

      case SORT_BY_ALPHABET:
        setSortBy(SORT_BY_ALPHABET);
        if (reversed) {
          setGoods([...goods].sort().reverse());
        } else {
          setGoods([...goods].sort());
        }

        break;
      case SORT_REVERSED:
        setGoods(
          [...goods].reverse(),
        );
        break;
      default:
        return 0;
    }

    return 0;
  }

  const reversedSort = () => {
    setReversed(!reversed);
    sortGoods(SORT_REVERSED);
  };

  const reset = () => {
    setReversed(false);
    setSortBy('');
    setGoods(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== SORT_BY_ALPHABET && 'is-light'}`}
          onClick={() => {
            sortGoods(SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== SORT_BY_LENGTH && 'is-light'}`}
          onClick={() => {
            sortGoods(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reversed && 'is-light'}`}
          onClick={reversedSort}
        >
          Reverse
        </button>

        {reversed || sortBy !== '' ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : <></>}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
