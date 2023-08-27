import 'bulma/css/bulma.css';
import cn from 'classnames';
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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';
const REVERSE_FIELD = 'reversed';

export const App = () => {
  const goods = [...goodsFromServer];
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');

  if (sortField === SORT_FIELD_ALPHABET) {
    goods.sort();
  }

  if (sortField === SORT_FIELD_LENGTH) {
    goods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reverseField === REVERSE_FIELD) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          className={cn('button', 'is-info',
            {
              'is-light': sortField !== SORT_FIELD_ALPHABET,
            })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn('button', 'is-info',
            {
              'is-light': sortField !== SORT_FIELD_LENGTH,
            })}
        >
          Sort by length
        </button>

        {reverseField !== REVERSE_FIELD
          ? (
            <button
              type="button"
              onClick={() => setReverseField(REVERSE_FIELD)}
              className="button is-info is-light"
            >
              Reverse
            </button>
          )
          : (
            <button
              type="button"
              onClick={() => setReverseField('')}
              className={cn('button', 'is-info',
                {
                  'is-light': reverseField !== REVERSE_FIELD,
                })}
            >
              Reverse
            </button>
          )
        }

        {(sortField || reverseField) && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setReverseField('');
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={goods} />
    </div>
  );
};

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);
