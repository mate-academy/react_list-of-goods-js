import cn from 'classnames';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const SORT_BY_ALPHABET = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

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

function getPrepearedGoods(goods, { sortField, isReverse }) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods = prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2[0]);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const sortedGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    isReverse: reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          // className="button is-info is-light"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reversed === false,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn('button', 'is-danger', {
            'is-light': !sortField,
          })}
          onClick={() => {
            setSortField('');
            setReversed(false);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
