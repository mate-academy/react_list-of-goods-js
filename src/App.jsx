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

function handleGoods(goods, sortField, reverse) {
  const prepareGoods = [...goods];

  if (sortField === SORT_BY_ALPHABET) {
    prepareGoods.sort((good1, good2) => {
      return good1.localeCompare(good2);
    });
  }

  if (sortField === SORT_BY_LENGTH) {
    prepareGoods.sort((good1, good2) => {
      return good1.length - good2.length;
    });
  }

  if (reverse) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, SetReverse] = useState(false);
  const preparedGoods = handleGoods(goodsFromServer, sortField, reverse);
  const REVERSE = !reverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_ALPHABET)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => SetReverse(REVERSE)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': reverse !== true,
          })}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            onClick={() => {
              setSortField('');
              SetReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
