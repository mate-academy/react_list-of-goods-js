import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

const SORT_ALPHABET = 'alphabet';
const SORT_SIZE = 'size';

export const App = () => {
  const [goodsOnScreen, setGoodsState] = useState(goodsFromServer);
  const [sortKind, setSortKind] = useState('');
  const [isReversed, setReversed] = useState(false);

  function sortAlphabeticaly() {
    const sortedByLetter = [...goodsOnScreen].sort((item1, item2) =>
      item1.localeCompare(item2),
    );

    if (isReversed) {
      sortedByLetter.reverse();
    }

    setGoodsState(sortedByLetter);
    setSortKind(SORT_ALPHABET);
  }

  function sortByLength() {
    let sortedByLength;

    if (isReversed) {
      sortedByLength = [...goodsOnScreen]
        .reverse()
        .sort((item1, item2) => item1.length - item2.length)
        .reverse();
    } else {
      sortedByLength = [...goodsOnScreen].sort(
        (item1, item2) => item1.length - item2.length,
      );
    }

    setGoodsState(sortedByLength);
    setSortKind(SORT_SIZE);
  }

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            onClick={sortAlphabeticaly}
            type="button"
            className={classNames('button', 'is-info', {
              'is-light': sortKind !== SORT_ALPHABET,
            })}
          >
            Sort alphabetically
          </button>

          <button
            onClick={sortByLength}
            type="button"
            className={classNames('button', 'is-success', {
              'is-light': sortKind !== SORT_SIZE,
            })}
          >
            Sort by length
          </button>

          <button
            onClick={() => {
              setGoodsState([...goodsOnScreen].reverse());
              setReversed(!isReversed);
            }}
            type="button"
            className={classNames('button', 'is-warning', {
              'is-light': !isReversed,
            })}
          >
            Reverse
          </button>

          {(!!sortKind || !!isReversed) && (
            <button
              onClick={() => {
                setGoodsState(goodsFromServer);
                setSortKind('');
                setReversed(false);
              }}
              type="button"
              className={classNames('button', 'is-danger', 'is-light')}
            >
              Reset
            </button>
          )}
        </div>

        <ul>
          {goodsOnScreen.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
