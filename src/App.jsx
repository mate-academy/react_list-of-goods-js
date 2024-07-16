import { useState } from 'react';
import cn from 'classnames';

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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getSortGoods(goods, { sortField, reversed }) {
  let prepGoods = [...goods];

  if (sortField) {
    prepGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    prepGoods = prepGoods.reverse();
  }

  return prepGoods;
}

export const App = () => {
  const [resetIsVisibe, setResetIsVisibe] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [sortField, setSortField] = useState('');
  const visibleGoods = getSortGoods(goodsFromServer, { sortField, reversed });

  const reverse = () => {
    setReversed(!reversed);

    if (!reversed) {
      setResetIsVisibe(true);
    } else if (reversed && sortField !== '') {
      setResetIsVisibe(true);
    } else if (reversed) {
      setResetIsVisibe(false);
    }
  };

  return (
    <div className="section content">
      {visibleGoods && (
        <div className="buttons">
          <button
            type="button"
            className={cn({
              'button is-info is-light':
                sortField === '' || sortField === SORT_FIELD_LENGTH,
              'button is-info': sortField === SORT_FIELD_ALPHABET,
            })}
            onClick={() => {
              setSortField(SORT_FIELD_ALPHABET);
              setResetIsVisibe(true);
            }}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn({
              'button is-success is-light':
                sortField === '' || sortField === SORT_FIELD_ALPHABET,
              'button is-success': sortField === SORT_FIELD_LENGTH,
            })}
            onClick={() => {
              setSortField(SORT_FIELD_LENGTH);
              setResetIsVisibe(true);
            }}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn({
              'button is-warning is-light': !reversed,
              'button is-warning': reversed,
            })}
            onClick={reverse}
          >
            Reverse
          </button>

          {resetIsVisibe && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setResetIsVisibe(false);
                setReversed(false);
                setSortField('');
              }}
            >
              Reset
            </button>
          )}
        </div>
      )}

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
