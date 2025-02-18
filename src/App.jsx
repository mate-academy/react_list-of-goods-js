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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getSortedGoods(initialGoods, sortField, isReversed) {
  let goods = [...initialGoods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABET: {
        goods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      }

      case SORT_FIELD_LENGTH: {
        goods.sort((good1, good2) => good1.length - good2.length);
        break;
      }

      default:
        break;
    }
  }

  if (isReversed) {
    goods = goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseFlag, setReverseFlag] = useState(false);

  const resetSortFilters = () => {
    setSortField('');
    setReverseFlag(false);
  };

  const filteredGoods = getSortedGoods(goodsFromServer, sortField, reverseFlag);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() =>
            reverseFlag ? setReverseFlag(false) : setReverseFlag(true)
          }
          className={classNames('button is-warning', {
            'is-light': reverseFlag === false,
          })}
        >
          Reverse
        </button>

        {sortField !== '' || reverseFlag ? (
          <button
            type="button"
            onClick={resetSortFilters}
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {filteredGoods.map(goodName => (
          <li key={goodName} data-cy="Good">
            {goodName}
          </li>
        ))}
      </ul>
    </div>
  );
};
