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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const objModifier = (goods, { sortBy, reversed }) => {
    const modified = [...goods];

    if (sortBy === 'name') {
      modified.sort((g1, g2) => {
        return g1.localeCompare(g2);
      });
    }

    if (sortBy === 'length') {
      modified.sort((g1, g2) => {
        return g1.length - g2.length;
      });
    }

    if (reversed) {
      modified.reverse();
    }

    return modified;
  };

  const [sortBy, setSortBy] = useState('');
  const [reversed, setReversed] = useState(false);
  const prepareForRend = objModifier(goodsFromServer, { sortBy, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SORT_BY_NAME,
          })}
          onClick={() =>
            setSortBy(sortBy === SORT_BY_NAME ? null : SORT_BY_NAME)
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
          onClick={() =>
            setSortBy(sortBy === SORT_BY_LENGTH ? null : SORT_BY_LENGTH)
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => {
            setReversed(() => !reversed);
          }}
        >
          Reverse
        </button>

        {(sortBy !== '' || reversed) && (
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
        {prepareForRend.map(good => {
          return <li data-cy="Good">{good}</li>;
        })}
      </ul>
    </div>
  );
};
