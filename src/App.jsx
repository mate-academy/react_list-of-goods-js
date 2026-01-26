import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cs from 'clsx';

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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  function sortList(list) {
    let newList;

    switch (sortBy) {
      case SORT_ALPHABET:
        newList = [...list].sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SORT_LENGTH:
        newList = [...list].sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        newList = [...list];
    }

    return isReversed ? newList.reverse() : newList;
  }

  const goodsList = sortList(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cs('button is-info', {
            'is-light': sortBy !== SORT_ALPHABET,
          })}
          onClick={() => setSortBy(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cs('button is-success', {
            'is-light': sortBy !== SORT_LENGTH,
          })}
          onClick={() => setSortBy(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cs('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy !== '' || isReversed) && (
          <button
            type="button"
            className={cs('button is-danger', {
              'is-light': sortBy === '' && !isReversed,
            })}
            onClick={() => {
              setIsReversed(false);
              setSortBy('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
