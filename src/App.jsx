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

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortFiled, setSortFiled] = useState('');
  const [reverse, setReverse] = useState('');

  function sortAlphabetically() {
    if (reverse === 'R') {
      setVisibleGoods([...visibleGoods].sort().reverse());
    } else {
      setVisibleGoods([...visibleGoods].sort());
    }

    setSortFiled('A');
  }

  function sortByLength() {
    if (reverse === 'R') {
      setVisibleGoods([...visibleGoods].sort(
        (good1, good2) => good2.length - good1.length,
      ));
    } else {
      setVisibleGoods([...visibleGoods].sort(
        (good1, good2) => good1.length - good2.length,
      ));
    }

    setSortFiled('L');
  }

  function reverseSort() {
    setVisibleGoods([...visibleGoods].reverse());
    if (reverse === '') {
      setReverse('R');
    } else {
      setReverse('');
    }
  }

  function reset() {
    setVisibleGoods(goodsFromServer);
    setSortFiled('');
    setReverse('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortFiled !== 'A' },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortFiled !== 'L' },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={reverseSort}
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': reverse !== 'R' },
          )}
        >
          Reverse
        </button>

        {JSON.stringify(goodsFromServer) !== JSON.stringify(visibleGoods)
        && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
