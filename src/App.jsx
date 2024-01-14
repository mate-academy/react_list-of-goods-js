import { useState } from 'react';
import classNames from 'classnames';
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

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortGoods, setSortGoods] = useState('');
  const [isReversed, setReversed] = useState(false);
  const reset = () => {
    if (isReversed) {
      setReversed(!isReversed);
    }

    setSortGoods('');
    setGoods(goodsFromServer);
  };

  const sortByAlphabetically = () => {
    setSortGoods(SORT_ALPHABETICALLY);
    const sortedGoods = [...goods];
    if (isReversed) {
      setGoods([...sortedGoods].sort((a, b) => b.localeCompare(a)));

      return;
    }

    setGoods([...sortedGoods].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLenght = () => {
    setSortGoods(SORT_BY_LENGTH);
    const sortedGoods = [...goods];
    if (isReversed) {
      setGoods([...sortedGoods].sort((a, b) => b.length - a.length));

      return;
    }

    setGoods([...sortedGoods].sort((a, b) => a.length - b.length));
  };

  const reverseGood = () => {
    setReversed(!isReversed);
    setGoods([...goods].reverse());
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortGoods !== SORT_ALPHABETICALLY },
          )}
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortGoods !== SORT_BY_LENGTH },
          )}
          onClick={sortByLenght}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverseGood}
        >
          Reverse
        </button>

        {(sortGoods.length > 0 || isReversed) && (
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
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
