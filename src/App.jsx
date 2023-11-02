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

const ALPHABET = 'Alphabet';
const LENGTH = 'Length';
const REVERSE = 'Reverse';

function getPreparedGoods(goods, sortFiled, reverse) {
  let preparedGoods = [...goods];

  if (sortFiled) {
    switch(sortFiled) {
      case reverse === REVERSE && sortFiled === ALPHABET:
        return preparedGoods.sort().reverse();
    }
    if (reverse === REVERSE && sortFiled === ALPHABET) {
      preparedGoods.sort().reverse();
    } else {
      setVisibleGoods([...visibleGoods].sort());
    }

    if (reverse === REVERSE && sortFiled === LENGTH) {

    }
  }

  return preparedGoods;
}

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortFiled, setSortFiled] = useState('');
  const [reverse, setReverse] = useState('');

  const visibleGoods = getPreparedGoods(goodsFromServer, sortFiled, reverse)

  function sortAlphabetically() {
    if (reverse === REVERSE) {
      setVisibleGoods([...visibleGoods].sort().reverse());
    } else {
      setVisibleGoods([...visibleGoods].sort());
    }

    setSortFiled(ALPHABET);
  }

  function sortByLength() {
    if (reverse === REVERSE) {
      setVisibleGoods([...visibleGoods].sort(
        (good1, good2) => good2.length - good1.length,
      ));
    } else {
      setVisibleGoods([...visibleGoods].sort(
        (good1, good2) => good1.length - good2.length,
      ));
    }

    setSortFiled(LENGTH);
  }

  function reverseSort() {
    setVisibleGoods([...visibleGoods].reverse());
    if (reverse === '') {
      setReverse(REVERSE);
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
            { 'is-light': sortFiled !== ALPHABET },
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
            { 'is-light': sortFiled !== LENGTH },
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
            { 'is-light': reverse !== REVERSE },
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
