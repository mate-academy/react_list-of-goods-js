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

const SORT_ALPHABET = 'Alphabet';
const SORT_LENGTH = 'Length';

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setReversed] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);

  const modifyGoods = (list, type, reversed) => {
    let sorted;

    switch (type) {
      case SORT_ALPHABET:
        sorted = [...list].sort((a, b) => a.localeCompare(b));
        break;
      case SORT_LENGTH:
        sorted = [...list].sort((a, b) => {
          if (a.length === b.length) {
            return a.localeCompare(b);
          }

          return a.length - b.length;
        });
        break;
      default:
        sorted = [...list];
    }

    if (reversed) {
      sorted = sorted.toReversed();
    }

    return sorted;
  };

  const sortAlphabet = () => {
    const sorted = modifyGoods(goodsFromServer, SORT_ALPHABET, isReversed);

    setVisibleGoods(sorted);
    setSortType(SORT_ALPHABET);
  };

  const sortLength = () => {
    const sorted = modifyGoods(goodsFromServer, SORT_LENGTH, isReversed);

    setVisibleGoods(sorted);
    setSortType(SORT_LENGTH);
  };

  const reverse = () => {
    setReversed(!isReversed);

    const sorted = modifyGoods(goodsFromServer, sortType, isReversed);

    setVisibleGoods([...sorted].toReversed());
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortType('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SORT_ALPHABET ? '' : 'is-light'}`}
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SORT_LENGTH ? '' : 'is-light'}`}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed === true ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>
        {visibleGoods.join('') !== goodsFromServer.join('') && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
