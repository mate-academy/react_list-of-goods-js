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

const SORT_BY_ALPHABET = 'byAlphabet';
const SORT_BY_WORD_LENGTH = 'byWordLength';

function getPreparedGoods(
  goods,
  { sortByElement = '', reverseVisibleGoods = false },
) {
  const preparedGoods = [...goods];

  if (sortByElement) {
    preparedGoods.sort((good1, good2) => {
      switch (sortByElement) {
        case SORT_BY_WORD_LENGTH:
          return good1.length - good2.length;

        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reverseVisibleGoods) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortByElement, setSortByElement] = useState('');
  const [reverseVisibleGoods, setReverseVisibleGoods] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortByElement,
    reverseVisibleGoods,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortByElement !== SORT_BY_ALPHABET })}`}
          onClick={() => setSortByElement(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortByElement !== SORT_BY_WORD_LENGTH })}`}
          onClick={() => setSortByElement(SORT_BY_WORD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': !reverseVisibleGoods })}`}
          onClick={() => setReverseVisibleGoods(!reverseVisibleGoods)}
        >
          Reverse
        </button>

        {(sortByElement || reverseVisibleGoods) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortByElement('');
              setReverseVisibleGoods(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
