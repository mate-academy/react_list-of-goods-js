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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [isActive, setIsActive] = useState('');
  const [reverse, setReverse] = useState(false);

  const resetSort = () => {
    setGoods([...goodsFromServer]);
    setIsActive('');
    setReverse(false);
  };

  const reverseGoods = foods => {
    setReverse(!reverse);
    setGoods([...goods].reverse());
  };

  const sortedGoods = type => {
    setGoods(
      [...goods].sort((good1, good2) => {
        switch (type) {
          case SORT_FIELD_ALPHABET:
            setIsActive(type);
            if (reverse) {
              return good2.localeCompare(good1);
            }

            return good1.localeCompare(good2);

          case SORT_FIELD_LENGTH:
            setIsActive(type);
            if (reverse) {
              return good2.length - good1.length;
            }

            return good1.length - good2.length;

          default:
            return '';
        }
      }),
    );
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            sortedGoods(SORT_FIELD_ALPHABET);
          }}
          type="button"
          className={`button is-info ${isActive !== SORT_FIELD_ALPHABET ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            sortedGoods(SORT_FIELD_LENGTH);
          }}
          type="button"
          className={`button is-success ${isActive !== SORT_FIELD_LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            reverseGoods(goods);
          }}
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
        >
          Reverse
        </button>
        {(isActive || reverse) && (
          <button
            onClick={() => {
              resetSort();
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
