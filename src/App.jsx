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

const SORT_FIELD = {
  alphabeticaly: 'alphabetic',
  length: 'length',
};

export const App = () => {
  function sortGoods(input, sortField, reverse) {
    const preparedGoods = [...input];

    if (sortField) {
      preparedGoods.sort((good1, good2) => {
        switch (sortField) {
          case SORT_FIELD.alphabeticaly:
            return good1.localeCompare(good2);
          case SORT_FIELD.length:
            return good1.length - good2.length;
          default:
            return 0;
        }
      });
    }

    if (reverse === 'desc') {
      preparedGoods.reverse();
    }

    return preparedGoods;
  }

  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState('asc');
  const visibleGoods = sortGoods(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD.alphabeticaly,
          })}
          onClick={() => setSortField(SORT_FIELD.alphabeticaly)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD.length,
          })}
          onClick={() => setSortField(SORT_FIELD.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverse === 'asc',
          })}
          onClick={() => {
            setReverse(reverse === 'asc' ? 'desc' : 'asc');
          }}
        >
          Reverse
        </button>

        {(sortField || reverse === 'desc') && (
          <button
            onClick={() => {
              setSortField('');
              setReverse('asc');
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul className="goodList">
        {visibleGoods.map(good => {
          return <li data-cy="Good">{good}</li>;
        })}
      </ul>
    </div>
  );
};
