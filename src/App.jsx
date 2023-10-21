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

const SORT_BY_ALPHABET = 'by alphabet';
const SORT_BY_LENGTH = 'by length';

function getListOfGoods(goods, { sortOrder, reverseDirection }) {
  const goodsForListing = [...goods];

  if (sortOrder) {
    goodsForListing.sort((a, b) => {
      switch (sortOrder) {
        case SORT_BY_ALPHABET:
          return a.localeCompare(b);
        case SORT_BY_LENGTH:
          return a.length - b.length;
        default: return 0;
      }
    });
  }

  if (reverseDirection) {
    goodsForListing.reverse();
  }

  return goodsForListing;
}

export const App = () => {
  const [sortOrder, setSortOrder] = useState('');
  const [reverseDirection, setReverseDirection] = useState(false);
  const goodsListed
    = getListOfGoods(goodsFromServer, { sortOrder, reverseDirection });

  const reset = () => {
    setSortOrder('');
    setReverseDirection(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortOrder(SORT_BY_ALPHABET)}
          type="button"
          className={cn(
            'button', 'is-info',
            { 'is-light': sortOrder !== SORT_BY_ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortOrder(SORT_BY_LENGTH)}
          type="button"
          className={cn(
            'button', 'is-success',
            { 'is-light': sortOrder !== SORT_BY_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseDirection(!reverseDirection)}
          type="button"
          className={cn(
            'button', 'is-warning',
            { 'is-light': reverseDirection === false },
          )}
        >
          Reverse
        </button>

        {(sortOrder || reverseDirection)
      && (
      <button
        onClick={reset}
        type="button"
        className={cn(
          'button', 'is-danger',
          { 'is-light': !sortOrder && !reverseDirection },
        )}
      >
        Reset
      </button>
      )}
      </div>

      <ul>
        {goodsListed.map(item => <li data-cy="Good" key={item}>{item}</li>)}
      </ul>
    </div>
  );
};
