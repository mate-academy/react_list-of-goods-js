import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

const SORT_BY_ALPHABET = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [selectedSort, setSelectedSort] = useState(null);
  const [isReverse, setIsReverse] = useState(false);

  function sorting(sortingType) {
    let sortedGoods = [...goodsFromServer];

    switch (sortingType) {
      case SORT_BY_ALPHABET:
        sortedGoods = [...goods].sort((good1, good2) =>
          good1.localeCompare(good2),
        );
        break;
      case SORT_BY_LENGTH:
        sortedGoods.sort((good1, good2) => {
          if (good1.length === good2.length) {
            return good1.localeCompare(good2);
          }

          return good1.length - good2.length;
        });
        break;
      default:
        return;
    }

    if (isReverse) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSelectedSort(sortingType);
  }

  function reversing() {
    setIsReverse(previousReverse => !previousReverse);
    setGoods(previousGoods => [...previousGoods].reverse());
  }

  function reset() {
    setGoods(goodsFromServer);
    setSelectedSort(null);
    setIsReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => sorting(SORT_BY_ALPHABET)}
          className={classNames('button', 'is-info', {
            'is-light': selectedSort !== SORT_BY_ALPHABET,
          })}
        >
          {SORT_BY_ALPHABET}
        </button>

        <button
          type="button"
          onClick={() => sorting(SORT_BY_LENGTH)}
          className={classNames('button', 'is-success', {
            'is-light': selectedSort !== SORT_BY_LENGTH,
          })}
        >
          {SORT_BY_LENGTH}
        </button>

        <button
          type="button"
          onClick={reversing}
          className={classNames('button', 'is-warning', {
            'is-light': isReverse === false,
          })}
        >
          Reverse
        </button>

        {(selectedSort || isReverse) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
