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

const SORT_BY_ALPHA = 'alpha';
const SORT_BY_LENGTH = 'length';

function getPrepearedGoods(goods, sortField, isReversed) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case SORT_BY_ALPHA:
          return goods1.localeCompare(goods2);

        case SORT_BY_LENGTH:
          return goods1.length - goods2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visiableGoods = getPrepearedGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_BY_ALPHA)}
          className={`button is-info ${sortField === SORT_BY_ALPHA ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_BY_LENGTH)}
          className={`button is-success ${sortField === SORT_BY_LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {sortField !== '' || isReversed === true ? (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visiableGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
