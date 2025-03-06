import 'bulma/css/bulma.css';
import './App.scss';
import { React, useState } from 'react';
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

const SORT_BY_ALPHABET = 'alhabet';
const SORT_BY_LENGTH = 'length';

function prepareGoods(goods, sortType, doReverse) {
  const preparedGoods = [...goods];

  preparedGoods.sort((goodA, goodB) => {
    switch (sortType) {
      case SORT_BY_ALPHABET:
        return goodA.localeCompare(goodB);
      case SORT_BY_LENGTH:
        return goodA.length - goodB.length;
      default:
        return 0;
    }
  });

  if (doReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = prepareGoods(goodsFromServer, sortField, isReversed);

  const reset = () => {
    setIsReversed(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortField !== SORT_BY_ALPHABET })}`}
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortField !== SORT_BY_LENGTH })}`}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': isReversed === false })}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
