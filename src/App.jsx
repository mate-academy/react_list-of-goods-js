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

function getSortedGoods(listOfGoods, { sortType, isReverse }) {
  const copyOfGoods = [...listOfGoods];

  copyOfGoods.sort((good1, good2) => {
    switch (sortType) {
      case SORT_FIELD_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReverse === true) {
    copyOfGoods.reverse();
  }

  return copyOfGoods;
}

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortType, setSortType] = useState('');
  const sortedGoods
  = getSortedGoods(goodsFromServer, { sortType, isReverse });
  const reset = () => {
    setSortType('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SORT_FIELD_ALPHABET },
          )}
          onClick={() => {
            setSortType(SORT_FIELD_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== SORT_FIELD_LENGTH },
          )}
          onClick={() => {
            setSortType(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': isReverse === false },
          )}
          onClick={() => setIsReverse(!isReverse)} // altered into a simpler expression
        >
          Reverse
        </button>

        {(sortType !== '' || isReverse === true) && (
        <button
          type="button"
          className={cn(
            'button',
            'is-danger',
            'is-light',
          )}
          onClick={reset} // made into separate function
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
