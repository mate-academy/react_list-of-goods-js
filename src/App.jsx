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

const SORT_BY_FIRST_LETTER = 'byLetter';
const SORT_BY_GOOD_LENGTH = 'byLength';

function getSortedGoods(goodsList, sortField, reversed) {
  let goodsListCopy = [...goodsList];

  if (sortField) {
    goodsListCopy.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_FIRST_LETTER:
          return good1.localeCompare(good2);
        case SORT_BY_GOOD_LENGTH:
          return good1.length - good2.length;
        default:
          return goodsListCopy;
      }
    });
  }

  if (reversed) {
    goodsListCopy = [...goodsListCopy].reverse();
  }

  return goodsListCopy;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const renderedGoods = getSortedGoods(goodsFromServer, sortField, isReversed);
  const isListModified = sortField || isReversed;
  const resetGoodsListToDefault = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_BY_FIRST_LETTER,
          })}
          onClick={() => setSortField(SORT_BY_FIRST_LETTER)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SORT_BY_GOOD_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_GOOD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {isListModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoodsListToDefault}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {renderedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
