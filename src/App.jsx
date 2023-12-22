import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useEffect } from 'react';
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortBy, setSortBy] = useState('');
  const [reversed, setReversed] = useState(false);

  useEffect(() => {
    sortGoods(sortBy, reversed);
  }, [reversed, sortBy]);

  function sortGoods(type, isReversed = false) {
    const sortedGoods = [...goodsFromServer];

    switch (type) {
      case SORT_BY_LENGTH: {
        sortedGoods.sort(
          (g1, g2) => g1.length - g2.length,
        );

        break;
      }

      case SORT_BY_ALPHABET:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      default:
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  }

  const reversedSort = () => {
    setReversed(!reversed);
  };

  const reset = () => {
    setReversed(false);
    setSortBy('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortBy !== SORT_BY_ALPHABET })}
          onClick={() => {
            setSortBy(SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortBy !== SORT_BY_LENGTH })}
          onClick={() => {
            setSortBy(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={reversedSort}
        >
          Reverse
        </button>

        {reversed || sortBy !== '' ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : <></>}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
