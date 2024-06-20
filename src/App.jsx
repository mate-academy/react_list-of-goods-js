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

const sortByAlphabet = 'alphabetically';
const sortByLength = 'length';

function getPreparedGoods(goods, { sortField, reverseGood }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case sortByAlphabet:
          return good1.localeCompare(good2);
        case sortByLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseGood) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseGood, setReverse] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverseGood,
  });

  const reset = () => {
    setSortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== sortByAlphabet,
          })}
          onClick={() => {
            setSortField(sortByAlphabet);
          }}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== sortByLength,
          })}
          onClick={() => {
            setSortField(sortByLength);
          }}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverseGood,
          })}
          onClick={() => {
            setReverse(!reverseGood);
          }}
        >
          Reverse
        </button>

        {(sortField || reverseGood) && (
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
