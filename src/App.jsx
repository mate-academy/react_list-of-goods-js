import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  const [list, setList] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [sortedState, setSortedState] = useState(0);

  function reset() {
    setList(goodsFromServer);
    setIsReversed(false);
    setSortedState(0);
  }

  function sortedGoodsbyAlphabet(goods) {
    setSortedState(1);

    const result = [...goods].sort((a, b) => a.localeCompare(b));

    if (isReversed) {
      return result.reverse();
    }

    return result;
  }

  function sortedGoodsbyLength(goods) {
    setSortedState(2);
    if (isReversed) {
      return [...goods].sort((a, b) => b.length - a.length);
    }

    return [...goods].sort((a, b) => a.length - b.length);
  }

  function reversedGoods(goods) {
    setIsReversed(!isReversed);

    return [...goods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedState === 1 ? '' : 'is-light'}`}
          onClick={() => setList(sortedGoodsbyAlphabet(list))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedState === 2 ? '' : 'is-light'}`}
          onClick={() => setList(sortedGoodsbyLength(list))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setList(reversedGoods(list))}
        >
          Reverse
        </button>

        {(sortedState !== 0 || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {list.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
