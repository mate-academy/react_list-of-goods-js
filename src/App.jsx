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
  let copyOfGoods = [...listOfGoods];

  copyOfGoods.sort((good1, good2) => {
    switch (sortType) {
      case SORT_FIELD_ALPH:
        return good1.localeCompare(good2);
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReverse === true) {
    copyOfGoods = [...copyOfGoods].reverse();
  }

  return copyOfGoods;
}

const SORT_FIELD_ALPH = 'alph';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortType, setSortType] = useState('');
  const sortedGoods
  = getSortedGoods(goodsFromServer, { sortType, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SORT_FIELD_ALPH },
          )}
          onClick={() => {
            setSortType(SORT_FIELD_ALPH);
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
          onClick={(isReverse === false)
            ? () => {
              setIsReverse(true);
            }
            : () => {
              setIsReverse(false);
            }}
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
          onClick={() => {
            setSortType('');
            setIsReverse(false);
          }}
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
