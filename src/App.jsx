import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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
const REVERSE_SORT = 'reverse';

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [reversed, setReversed] = useState(false);

  let [...visibleGoods] = goodsFromServer;

  visibleGoods = visibleGoods.sort((good1, good2) => {
    switch (sortBy) {
      case SORT_BY_ALPHABET:
        return good1.localeCompare(good2);

      case SORT_BY_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-active': sortBy === SORT_BY_ALPHABET,
            'is-light': sortBy !== SORT_BY_ALPHABET,
          })}
          onClick={() => {
            setSortBy(SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-active': sortBy === SORT_BY_LENGTH,
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortBy(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-active': sortBy === REVERSE_SORT,
            'is-light': reversed !== true,
          })}
          onClick={() => {
            setReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {(sortBy || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
