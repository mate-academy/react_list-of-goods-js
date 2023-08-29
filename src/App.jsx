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

const SORT_BY_ALPHABET = 'alpha';
const SORT_BY_LENGTH = 'length';

const buttonsStatus = {
  alphaSort: true,
  lengthSort: true,
  reset: false,
};

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);
  const [activeReverse, setReverseActive] = useState(true);
  const [activeButtons, setActiveButtons] = useState(buttonsStatus);

  function resetGoods() {
    setVisibleGoods([...goodsFromServer]);
    setReverseActive(true);
    setActiveButtons({
      alphaSort: true,
      lengthSort: true,
      reset: false,
    });
  }

  function getReverseResult() {
    setVisibleGoods(visibleGoods.reverse());
    setReverseActive(!activeReverse);
    setActiveButtons({
      alphaSort: activeButtons.alphaSort,
      lengthSort: activeButtons.lengthSort,
      reset: true,
    });

    if (!activeReverse
      && activeButtons.alphaSort
      && activeButtons.lengthSort
    ) {
      setActiveButtons({
        alphaSort: activeButtons.alphaSort,
        lengthSort: activeButtons.lengthSort,
        reset: false,
      });
    }
  }

  function sortBy(sortMethod) {
    if (sortMethod === SORT_BY_ALPHABET) {
      setActiveButtons({
        alphaSort: false,
        lengthSort: true,
        reset: true,
      });

      return setVisibleGoods(visibleGoods
        .sort(activeReverse
          ? (a, b) => a.localeCompare(b)
          : (a, b) => b.localeCompare(a)));
    }

    if (sortMethod === SORT_BY_LENGTH) {
      setActiveButtons({
        alphaSort: true,
        lengthSort: false,
        reset: true,
      });

      return setVisibleGoods(visibleGoods
        .sort(activeReverse
          ? (a, b) => a.length - b.length
          : (a, b) => b.length - a.length));
    }

    return new Error('invalid method sort')
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => sortBy(SORT_BY_ALPHABET)}
          type="button"
          className={
          cn('button',
            'is-info',
            { 'is-light': activeButtons.alphaSort })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => sortBy(SORT_BY_LENGTH)}
          type="button"
          className={
          cn('button',
            'is-success',
            { 'is-light': activeButtons.lengthSort })}
        >
          Sort by length
        </button>

        <button
          onClick={() => getReverseResult()}
          type="button"
          className={
          cn(
            'button',
            'is-warning',
            { 'is-light': activeReverse },
          )}
        >
          Reverse
        </button>

        {activeButtons.reset && (
          <button
            onClick={() => resetGoods()}
            type="button"
            className={
            cn(
              'button',
              'is-danger',
              { 'is-light': activeButtons.reset },
            )}
          >
            Reset
          </button>
        )}
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
