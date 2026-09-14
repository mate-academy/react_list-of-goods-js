import { useState } from 'react';
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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getReorderedGoods(goods, { sortField, isReversed }) {
  const reorderedGoods = [...goods];

  if (sortField === SORT_FIELD_ALPHABET) {
    reorderedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortField === SORT_FIELD_LENGTH) {
    reorderedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    reorderedGoods.reverse();
  }

  return reorderedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const goods = getReorderedGoods(goodsFromServer, { sortField, isReversed });
  const isOriginalOrder = sortField === '' && !isReversed;

  function sortByAlphabet() {
    setSortField(SORT_FIELD_ALPHABET);
  }

  function sortByLength() {
    setSortField(SORT_FIELD_LENGTH);
  }

  function toggleReverse() {
    setIsReversed(currentIsReversed => !currentIsReversed);
  }

  function reset() {
    setSortField('');
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
        sortField !== SORT_FIELD_ALPHABET ? 'is-light' : ''
      }`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
        sortField !== SORT_FIELD_LENGTH ? 'is-light' : ''
      }`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
        isReversed ? '' : 'is-light'
      }`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
