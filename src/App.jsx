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

const SORT_FIELD_ALPHABETIC = 'abc';
const SORT_FIELD_LENGTH = 'length';

function getFilteredGoods(goods, { sortField, isReverse }) {
  let filteredGoods = [...goods];

  if (filteredGoods) {
    filteredGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'abc':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
      }

      return 0;
    });
  }

  if (isReverse) {
    filteredGoods = filteredGoods.reverse();
  }

  return filteredGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const [reset, setReset] = useState(false);
  const hadResetButton = !isReverse || sortField;

  const goods = getFilteredGoods(goodsFromServer, { sortField, isReverse });

  const handleSortAlphabetically = () => {
    setSortField(SORT_FIELD_ALPHABETIC);
    setReset(true);
  };

  const handleSortByLength = () => {
    setSortField(SORT_FIELD_LENGTH);
    setReset(true);
  };

  const handleReset = () => {
    setSortField('');
    setIsReverse(false);
    setReset(false);
  };

  const handleReverse = () => {
    setReset(hadResetButton);
    setIsReverse(!isReverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortAlphabetically}
          type="button"
          className={classNames(
            `button is-info ${
              sortField === SORT_FIELD_ALPHABETIC ? '' : 'is-light'
            }`,
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={classNames(
            `button is-success ${
              sortField === SORT_FIELD_LENGTH ? '' : 'is-light'
            }`,
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            handleReverse();
          }}
          type="button"
          className={classNames(
            `button is-warning ${!isReverse ? 'is-light' : ''}`,
          )}
        >
          Reverse
        </button>

        {reset && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li
            data-cy="Good"
            key={good}
            className="good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
