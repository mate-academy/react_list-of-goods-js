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
  const [reverseList, setReverseList] = useState(false);
  const [sortedState, setSortedState] = useState(0);

  function reset() {
    setList(goodsFromServer);
    setReverseList(false);
    setSortedState(0);
  }

  function sortedGoods(goods) {
    setSortedState(1);

    const result = [...goods].sort((a, b) => a.localeCompare(b));

    if (reverseList) {
      return result.reverse();
    }

    return result;
  }

  function sortedGoodsLength(goods) {
    setSortedState(2);
    if (reverseList) {
      return [...goods].sort((a, b) => b.length - a.length);
    }

    return [...goods].sort((a, b) => a.length - b.length);
  }

  function reversedGoods(goods) {
    setReverseList(!reverseList);

    return [...goods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedState === 1 ? '' : 'is-light'}`}
          onClick={() => setList(sortedGoods(list))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedState === 2 ? '' : 'is-light'}`}
          onClick={() => setList(sortedGoodsLength(list))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseList ? '' : 'is-light'}`}
          onClick={() => setList(reversedGoods(list))}
        >
          Reverse
        </button>

        {(sortedState !== 0 || reverseList) && (
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

export default App;
